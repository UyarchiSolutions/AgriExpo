const httpStatus = require('http-status');
const { Slot, Slotseperation } = require('../models/slot.model');
const ApiError = require('../utils/ApiError');
const moment = require('moment');
const { purchasePlan } = require('../models/purchasePlan.model');
const { Streamrequest } = require('../models/ecomplan.model');
const Seller = require('../models/seller.models');

const createSlot = async (body) => {
  const { chooseTime, Duration, date, Type } = body;
  const isoDateTime = moment(`${date}T${chooseTime}`).toDate();
  const Start = moment(`${date}T${chooseTime}`);
  const end = moment(Start).add(Duration, 'minutes');
  const startFormat = moment(`${date}T${chooseTime}`).format('HH:mm');
  const endFormat = moment(Start).add(Duration, 'minutes').format('HH:mm');
  const existSlot = await Slot.findOne({ date: date, startFormat: chooseTime, endFormat: endFormat, Type: Type });
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

const getSlotsWitdSort = async (data, userId) => {
  const { PlanId } = data;
  let value = await purchasePlan.findById(PlanId);
  if (!value) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Plan Not Availbale');
  }

  let values = await purchasePlan.aggregate([
    {
      $match: {
        _id: PlanId,
      },
    },
    {
      $lookup: {
        from: 'slotseperations',
        localField: '_id',
        foreignField: 'PlanId',
        pipeline: [{ $match: { userId: userId, Slots: { $gt: 0 } } }],
        as: 'available',
      },
    },
    {
      $project: {
        _id: 1,
        planType: 1,
        status: 1,
        planName: 1,
        slotInfo: '$available',
      },
    },
  ]);
  let datas;
  if (values.length > 0) {
    datas = values[0];
  }

  let matchdata = [];
  datas.slotInfo.forEach((e) => {
    let val = { Type: e.SlotType, Duration: e.Duration };
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
  // return values
};

const getSlots_by_SlotInfo = async (query) => {
  let duratrionMatch = { active: true };
  const { duration, type } = query;
  if (duration != '') {
    duratrionMatch = { Duration: parseInt(duration) };
  }

  console.log(query);

  let values = await Slot.aggregate([
    {
      $match: {
        $and: [duratrionMatch, { Type: type }],
      },
    },
    {
      $lookup: {
        from: 'slotbookings',
        localField: '_id',
        foreignField: 'slotId',
        as: 'slot',
      },
    },
    {
      $lookup: {
        from: 'streamrequests',
        localField: '_id',
        foreignField: 'slotId',
        as: 'streams',
      },
    },
  ]);
  return values;
};

const getSlots_Duraions = async () => {
  let values = await Slot.aggregate([
    {
      $group: {
        _id: {
          Duration: '$Duration',
        },
      },
    },
    {
      $project: {
        _id: 0,
        Durations: '$_id.Duration',
      },
    },
  ]);
  return values;
};

// Streamrequest

const getStreamBySlots = async (id) => {
  const currentUnixTimestamp = moment().valueOf();

  let values = await Streamrequest.aggregate([
    {
      $match: {
        slotId: id,
      },
    },
    {
      $lookup: {
        from: 'sellers',
        localField: 'suppierId',
        foreignField: '_id',
        as: 'Suppliers',
      },
    },
    {
      $unwind: {
        preserveNullAndEmptyArrays: true,
        path: '$Suppliers',
      },
    },
    {
      $addFields: {
        isBetweenTime: {
          $and: [{ $gte: ['$startTime', currentUnixTimestamp] }, { $gte: ['$streamEnd_Time', currentUnixTimestamp] }],
        },
      },
    },
    {
      $addFields: {
        PendingStatus: { $and: [{ $gte: ['$startTime', currentUnixTimestamp] }] },
      },
    },
    {
      $addFields: {
        StreamStatus: {
          $cond: {
            if: { $eq: ['$isBetweenTime', true] },
            then: 'Onlive',
            else: 'Completed',
          },
        },
      },
    },
    {
      $addFields: {
        PendingStatus: {
          $cond: {
            if: { $eq: ['$PendingStatus', true] },
            then: 'Pending',
            else: '$StreamStatus',
          },
        },
      },
    },
  ]);

  let slot = await Slot.findById(id);

  return { values, slot };
};

module.exports = {
  createSlot,
  Fetch_Slot,
  UpdateSlotById,
  DeleteSlotById,
  getSlots_Minutse_Wise,
  getDetailsForSlotChoosing,
  getSlotsWitdSort,
  getSlots_by_SlotInfo,
  getSlots_Duraions,
  getStreamBySlots,
};
