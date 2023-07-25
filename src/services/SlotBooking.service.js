const httpStatus = require('http-status');
const { SlotBooking } = require('../models/SlotBooking.model');
const ApiError = require('../utils/ApiError');
const { purchasePlan } = require('../models/purchasePlan.model');
const { Slotseperation } = require('../models/slot.model');
const moment = require('moment');

const createSlotBooking = async (body, userId) => {
  const { arr } = body;
  let err;
  for (let i = 0; i < arr.length; i++) {
    let slot = arr[i];
    let findAvailableSlot = await Slotseperation.findOne({
      PlanId: slot.planId,
      userId: userId,
      SlotType: slot.Type,
      Duration: slot.duration,
    });
    if (findAvailableSlot.Slots <= 0 || !findAvailableSlot) {
      err = true;
      break;
    }
    let usedSlots = findAvailableSlot.usedSlots + 1;
    let availableSlot = findAvailableSlot.Slots - 1;
    findAvailableSlot = await Slotseperation.findByIdAndUpdate(
      { _id: findAvailableSlot._id },
      { Slots: availableSlot, usedSlots: usedSlots },
      { new: true }
    );
    let data = {
      slotId: slot.slotId,
      Durations: slot.duration,
      slotType: slot.Type,
      PlanId: slot.planId,
      userId: userId,
    };
    await SlotBooking.create(data);
  }
  if (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Max Slot Finished');
  }
  // console.log(body);
  // Date, planId, slotId, Type, duration
  // arr.forEach(async (e) => {
  //   let findAvailableSlot = await Slotseperation.findOne({
  //     PlanId: e.planId,
  //     userId: userId,
  //     SlotType: e.Type,
  //     Duration: e.duration,
  //   });
  // if (findAvailableSlot.Slots == 0 || !findAvailableSlot) {
  //   // throw new ApiError(httpStatus.BAD_REQUEST, 'Max Slot Finished');
  //   return false;
  // }
  // let usedSlots = findAvailableSlot.usedSlots + 1;
  // let availableSlot = findAvailableSlot.Slots - 1;
  // await Slotseperation.findByIdAndUpdate(
  //   { _id: findAvailableSlot._id },
  //   { Slots: availableSlot, usedSlots: usedSlots },
  //   { new: true }
  // );
  //   let val = findAvailableSlot.Slots - 1;
  //   console.log(val);
  // });

  // let usedSlots = findAvailableSlot.usedSlots + 1;
  // let availableSlot = findAvailableSlot.Slots - 1;
  // findAvailableSlot = await Slotseperation.findByIdAndUpdate(
  //   { _id: findAvailableSlot._id },
  //   { Slots: availableSlot, usedSlots: usedSlots },
  //   { new: true }
  // );
  // let data = {
  //   slotId: slotId,
  //   Durations: duration,
  //   slotType: Type,
  //   PlanId: planId,
  //   userId: userId,
  //   slotDate: Date,
  // };
  // let creation = await SlotBooking.create(data);
  return body;
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
