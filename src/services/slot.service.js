const httpStatus = require('http-status');
const { Slot, Slotseperation } = require('../models/slot.model');
const ApiError = require('../utils/ApiError');
const moment = require('moment');
const { purchasePlan } = require('../models/purchasePlan.model');

const createSlot = async (body) => {
  const { chooseTime, Duration, date, Type } = body;
  const isoDateTime = moment(`${date}T${chooseTime}`).toDate();
  const Start = moment(`${date}T${chooseTime}`);
  const end = moment(Start).add(Duration, 'minutes');
  const startFormat = moment(`${date}T${chooseTime}`).format('HH:mm');
  const endFormat = moment(Start).add(Duration, 'minutes').format('HH:mm');
  const existSlot = await Slot.findOne({ date: date, startFormat: chooseTime });
  if (existSlot) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This Slot Already Booked');
  }
  const data = {
    chooseTime: isoDateTime,
    start: Start,
    end: end,
    Type: Type,
    startFormat: startFormat,
    endFormat: endFormat,
    Duration: Duration,
    date: date,
  };

  const creation = await Slot.create(data);
  return creation;
};

const Fetch_Slot = async (query) => {
  let { Type, Duration, start, end, date } = query;
  let TypeMatch = { active: true };
  let DuarationMatch = { active: true };
  let startMatch = { active: true };
  let endMatch = { active: true };
  let dateMatch = { active: true };

  if (Type) {
    TypeMatch = { Type: Type };
  }

  if (Duration) {
    DuarationMatch = { Duration: parseInt(Duration) };
  }

  if (start) {
    startMatch = { startFormat: start };
  }

  if (end) {
    endMatch = { endFormat: end };
  }
  if (date) {
    dateMatch = { date: date };
  }

  const values = await Slot.aggregate([{ $match: { $and: [TypeMatch, DuarationMatch, startMatch, endMatch, dateMatch] } }]);
  return values;
};

const UpdateSlotById = async (id, body) => {
  let values = await Slot.findById(id);
  if (!values) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Slot Not Availbale');
  }
  values = await Slot.findByIdAndUpdate({ _id: id }, body, { new: true });
  return values;
};

const DeleteSlotById = async (id) => {
  let values = await Slot.findById(id);
  if (!values) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Slot Not Availbale');
  }
  await values.remove();
  return values;
};

const getSlots_Minutse_Wise = async () => {
  let value = await Slot.aggregate([
    {
      $group: {
        _id: {
          Type: '$Type',
          Duration: '$Duration',
          startFormat: '$startFormat',
          endFormat: '$endFormat',
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        Type: '$_id.Type',
        Duration: '$_id.Duration',
        count: '$count',
        startFormat: '$_id.StartFormat',
        endFormat: '$_id.EndFormat',
      },
    },
  ]);

  return value;
};

const getDetailsForSlotChoosing = async () => {
  let val = await Slot.aggregate([
    {
      $group: {
        _id: {
          date: '$date',
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id.date',
      },
    },
  ]);
  let datas = await Slot.aggregate([
    {
      $group: {
        _id: '$Type',
        documents: { $push: '$$ROOT' },
      },
    },
  ]);
  return { dates: val, datas: datas };
};

const getSlotsWitdSort = async (data) => {
  const { PlanId } = data;
  let value = await purchasePlan.findById(PlanId);
  if (!value) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Plan Not Availbale');
  }
  let matchdata = [];
  value.slotInfo.forEach((e) => {
    let val = { Type: e.slotType, Duration: e.Duration };
    matchdata.push(val);
  });

  let val = await Slot.aggregate([
    {
      $match: {
        $or: matchdata,
      },
    },
    {
      $group: {
        _id: '$Type',
        documents: { $push: '$$ROOT' },
      },
    },
  ]);
  let val2 = await Slot.aggregate([
    {
      $group: {
        _id: {
          date: '$date',
        },
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id.date',
      },
    },
  ]);
  return { val: val, dates: val2 };
};

module.exports = {
  createSlot,
  Fetch_Slot,
  UpdateSlotById,
  DeleteSlotById,
  getSlots_Minutse_Wise,
  getDetailsForSlotChoosing,
  getSlotsWitdSort,
};
