const httpStatus = require('http-status');
const { SlotBooking } = require('../models/SlotBooking.model');
const ApiError = require('../utils/ApiError');
const { purchasePlan } = require('../models/purchasePlan.model');
const moment = require('moment');

const createSlotBooking = async (body, userId) => {
  const { slotDate, fromTime, endTime } = body;
  let slotDateISO = moment.utc(slotDate).toDate();
  const startTimeISO = `${slotDate}T${fromTime}:00.000Z`;
  const endTimeISO = `${slotDate}T${endTime}:00.000Z`;
  let data = {
    slotDate: slotDateISO,
    fromTime: startTimeISO,
    endTime: endTimeISO,
    Durations: body.Durations,
    slotType: body.slotType,
    PlanId: body.PlanId,
    userId: userId,
    SlotDuration: body.SlotDuration,
  };
  let findSlot = await purchasePlan.findOne({
    _id: body.PlanId,
    slotInfo: {
      $elemMatch: {
        No_Of_Slot: { $gt: 0 },
        Duration: body.SlotDuration,
        slotType: body.slotType,
      },
    },
  });
  if (!findSlot) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Slot not Available');
  }

  findSlot = await purchasePlan.updateOne(
    {
      _id: body.PlanId,
      slotInfo: {
        $elemMatch: {
          No_Of_Slot: { $gt: 0 },
          Duration: body.SlotDuration,
          slotType: body.slotType,
        },
      },
    },
    {
      $inc: {
        'slotInfo.$.No_Of_Slot': -1,
      },
    },
    { new: true }
  );
  let creation = await SlotBooking.create(data);
  return creation;
};

module.exports = {
  createSlotBooking,
};
