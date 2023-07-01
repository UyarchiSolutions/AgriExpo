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
  let tenNormal = Slot.find({ Type: 'Normal', Duration: 10 }).count();
  let fifteenNormal = Slot.find({ Type: 'Normal', Duration: 15 }).count();
  let thirtyNormal = Slot.find({ Type: 'Normal', Duration: 30 }).count();
  let fourtyFiveNormal = Slot.find({ Type: 'Normal', Duration: 45 }).count();
  let SixtyNormal = Slot.find({ Type: 'Normal', Duration: 60 }).count();

  // Exclusive
  let tenExclusive = Slot.find({ Type: 'Exclusive', Duration: 10 }).count();
  let fifteenExclusive = Slot.find({ Type: 'Exclusive', Duration: 15 }).count();
  let thirtyExclusive = Slot.find({ Type: 'Exclusive', Duration: 30 }).count();
  let fourtyExclusive = Slot.find({ Type: 'Exclusive', Duration: 45 }).count();
  let SixtyExclusive = Slot.find({ Type: 'Exclusive', Duration: 60 }).count();

  // Peak
  let tenPeak = Slot.find({ Type: 'Peak', Duration: 10 }).count();
  let fifteenPeak = Slot.find({ Type: 'Peak', Duration: 15 }).count();
  let thirtyPeak = Slot.find({ Type: 'Peak', Duration: 30 }).count();
  let fourtyPeak = Slot.find({ Type: 'Peak', Duration: 45 }).count();
  let SixtyPeak = Slot.find({ Type: 'Peak', Duration: 60 }).count();

  return {
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
};

module.exports = {
  createSlot,
  Fetch_Slot,
  UpdateSlotById,
  DeleteSlotById,
  getSlots_Minutse_Wise,
};
