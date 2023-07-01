const httpStatus = require('http-status');
const { Slot } = require('../models/slot.model');
const ApiError = require('../utils/ApiError');
const moment = require('moment');

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
  // normal
  let tenNormal = await Slot.countDocuments({ Type: 'Normal', Duration: 10 });
  let fifteenNormal = await Slot.countDocuments({ Type: 'Normal', Duration: 15 });
  let thirtyNormal = await Slot.countDocuments({ Type: 'Normal', Duration: 30 });
  let fourtyFiveNormal = await Slot.countDocuments({ Type: 'Normal', Duration: 45 });
  let SixtyNormal = await Slot.countDocuments({ Type: 'Normal', Duration: 60 });

  // Exclusive
  let tenExclusive = await Slot.find({ Type: 'Exclusive', Duration: 10 }).count();
  let fifteenExclusive = await Slot.find({ Type: 'Exclusive', Duration: 15 }).count();
  let thirtyExclusive = await Slot.find({ Type: 'Exclusive', Duration: 30 }).count();
  let fourtyExclusive = await Slot.find({ Type: 'Exclusive', Duration: 45 }).count();
  let SixtyExclusive = await Slot.find({ Type: 'Exclusive', Duration: 60 }).count();

  // Peak
  let tenPeak = await Slot.find({ Type: 'Peak', Duration: 10 }).count();
  let fifteenPeak = await Slot.find({ Type: 'Peak', Duration: 15 }).count();
  let thirtyPeak = await Slot.find({ Type: 'Peak', Duration: 30 }).count();
  let fourtyPeak = await Slot.find({ Type: 'Peak', Duration: 45 }).count();
  let SixtyPeak = await Slot.find({ Type: 'Peak', Duration: 60 }).count();

  let data = {
    tenNormal: tenNormal,
    fifteenNormal: fifteenNormal,
    thirtyNormal: thirtyNormal,
    fourtyFiveNormal: fourtyFiveNormal,
    SixtyNormal: SixtyNormal,
    tenExclusive: tenExclusive,
    fifteenExclusive: fifteenExclusive,
    thirtyExclusive: thirtyExclusive,
    fourtyExclusive: fourtyExclusive,
    SixtyExclusive: SixtyExclusive,
    tenPeak: tenPeak,
    fifteenPeak: fifteenPeak,
    thirtyPeak: thirtyPeak,
    fourtyPeak: fourtyPeak,
    SixtyPeak: SixtyPeak,
  };
  return data;
};

module.exports = {
  createSlot,
  Fetch_Slot,
  UpdateSlotById,
  DeleteSlotById,
  getSlots_Minutse_Wise,
};
