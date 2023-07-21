const httpStatus = require('http-status');
const { SlotBooking } = require('../models/SlotBooking.model');
const ApiError = require('../utils/ApiError');
const { purchasePlan } = require('../models/purchasePlan.model');
const { Slotseperation } = require('../models/slot.model');
const moment = require('moment');

const createSlotBooking = async (body, userId) => {
  const { Date, planId, slotId, Type, duration } = body;
  console.log(body);

  let findAvailableSlot = await Slotseperation.findOne({
    PlanId: planId,
    userId: userId,
    SlotType: Type,
    Duration: duration,
  });
  if (findAvailableSlot.Slots == 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Max Slot Finished');
  }
  let usedSlots = findAvailableSlot.usedSlots + 1;
  let availableSlot = findAvailableSlot.Slots - 1;
  findAvailableSlot = await Slotseperation.findByIdAndUpdate(
    { _id: findAvailableSlot._id },
    { Slots: availableSlot, usedSlots: usedSlots },
    { new: true }
  );
  let data = {
    slotId: slotId,
    Durations: duration,
    slotType: Type,
    PlanId: planId,
    userId: userId,
    slotDate: Date,
  };
  let creation = await SlotBooking.create(data);
  return creation;
};

const getBooked_Slot = async (userId, page) => {
  let val = await SlotBooking.aggregate([{ $elemMatch: { userId: userId } }, { $kip: page * 10 }, { $limit: 10 }]);
  let total = SlotBooking.aggregate([{ $elemMatch: { userId: userId } }, { $kip: 10 * (page + 1) }, { $limit: 10 }]);
  return { val, next: total.length != 0 };
};

module.exports = {
  createSlotBooking,
  getBooked_Slot,
};
