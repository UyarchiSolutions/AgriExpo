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
    if (!findAvailableSlot || findAvailableSlot.Slots <= 0) {
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
  return body;
};

const getBooked_Slot = async (userId, id) => {
  let val = await SlotBooking.aggregate([
    { $match: { userId: userId, PlanId: id } },
    {
      $lookup: {
        from: 'slots',
        localField: 'slotId',
        foreignField: '_id',
        as: 'slots',
      },
    },
    {
      $unwind: {
        preserveNullAndEmptyArrays: true,
        path: '$slots',
      },
    },
  ]);
  return val;
};

module.exports = {
  createSlotBooking,
  getBooked_Slot,
};
