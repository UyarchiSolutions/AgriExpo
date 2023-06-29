const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const SlotService = require('../services/slot.service');

const SlotCreation = catchAsync(async (req, res) => {
  const data = await SlotService.createSlot(req.body);
  res.send(data);
});

const Fetch_Slot = catchAsync(async (req, res) => {
  const data = await SlotService.Fetch_Slot(req.query);
  res.send(data);
});

module.exports = {
  SlotCreation,
  Fetch_Slot,
};
