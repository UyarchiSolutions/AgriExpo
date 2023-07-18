const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const SlotBookingService = require('../services/SlotBooking.service');

const createSlotBooking = catchAsync(async (req, res) => {
  let userId = req.userId;
  const slotBooking = await SlotBookingService.createSlotBooking(req.body, userId);
  res.status(httpStatus.CREATED).send(slotBooking);
});

module.exports = {
  createSlotBooking,
};
