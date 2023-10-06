const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const PartnerService = require('../services/Partner.expo.service');
const TokenService = require('../services/token.service');
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

const gePartnersPlanesAll = catchAsync(async (req, res) => {
  const data = await PartnerService.gePartnersPlanesAll(req);
  res.send(data);
});

const updatePartnerPlanesById = catchAsync(async (req, res) => {
  const data = await PartnerService.updatePartnerPlanesById(req);
  res.send(data);
});

const getPartnersAll = catchAsync(async (req, res) => {
  const data = await PartnerService.getPartnersAll();
  res.send(data);
});

const getPartnersPlanesAll = catchAsync(async (req, res) => {
  const data = await PartnerService.getPartnersPlanesAll();
  res.send(data);
});

const PlanAllocatioin = catchAsync(async (req, res) => {
  const data = await PartnerService.PlanAllocatioin(req);
  res.send(data);
});

const getAllAllocated_Planes = catchAsync(async (req, res) => {
  const data = await PartnerService.getAllAllocated_Planes(req);
  res.send(data);
});

const updateAllocationById = catchAsync(async (req, res) => {
  const data = await PartnerService.updateAllocationById(req);
  res.send(data);
});

const plan_payementsDetails = catchAsync(async (req, res) => {
  const data = await PartnerService.plan_payementsDetails(req);
  res.send(data);
});

const planPayment = catchAsync(async (req, res) => {
  const data = await PartnerService.planPayment(req.body);
  res.send(data);
});

const planPaymentDetails = catchAsync(async (req, res) => {
  const data = await PartnerService.getPaymentDetails(req.params.id);
  res.send(data);
});

const VerifyAccount = catchAsync(async (req, res) => {
  const data = await PartnerService.VerifyAccount(req.body);
  res.send(data);
});

const VerifyOTP = catchAsync(async (req, res) => {
  const data = await PartnerService.VerifyOTP(req.body);
  res.send(data);
});

const setPassword = catchAsync(async (req, res) => {
  const data = await PartnerService.setPassword(req.body);
  res.send(data);
});

const loginPartner = catchAsync(async (req, res) => {
  const data = await PartnerService.loginPartner(req.body);
  const token = await TokenService.generateAuthTokens_PartnerApp(data);
  res.send({ data, token });
});

module.exports = {
  createPartner,
  gePartnersAll,
  updatePartnersById,
  updatePartnersById,
  createPlanes,
  gePartnersPlanesAll,
  updatePartnerPlanesById,
  getPartnersAll,
  getPartnersPlanesAll,
  PlanAllocatioin,
  getAllAllocated_Planes,
  updateAllocationById,
  plan_payementsDetails,
  planPayment,
  planPaymentDetails,
  VerifyAccount,
  VerifyOTP,
  setPassword,
  loginPartner,
};
