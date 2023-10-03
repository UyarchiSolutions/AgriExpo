const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const PartnerService = require('../services/Partner.expo.service');

const createPartner = catchAsync(async (req, res) => {
  const data = await PartnerService.createPartner(req);
  res.send(data);
});

const gePartnersAll = catchAsync(async (req, res) => {
  const data = await PartnerService.gePartnersAll(req);
  res.send(data);
});

const updatePartnersById = catchAsync(async (req, res) => {
  const data = await PartnerService.updatePartnersById(req);
  res.send(data);
});

const createPlanes = catchAsync(async (req, res) => {
  const data = await PartnerService.createPlanes(req);
  res.send(data);
});

module.exports = {
  createPartner,
  gePartnersAll,
  updatePartnersById,
  updatePartnersById,
  createPlanes,
};
