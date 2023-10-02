const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const PartnerService = require('../services/Partner.expo.service');

const createPartner = catchAsync(async (req, res) => {
  const data = await PartnerService.createPartner(req.body);
  res.send(data);
});

module.exports = {
  createPartner,
};
