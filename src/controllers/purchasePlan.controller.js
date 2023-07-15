const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const purchasePlan = require('../services/purchasePlan.service');

const create_purchase_plan = catchAsync(async (req, res) => {
  const value = await purchasePlan.create_purchase_plan(req);
  if (!value) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order Not Created');
  }
  res.status(httpStatus.CREATED).send(value);
});

const create_purchase_plan_private = catchAsync(async (req, res) => {
  const value = await purchasePlan.create_purchase_plan_private(req);
  if (!value) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order Not Created');
  }
  res.status(httpStatus.CREATED).send(value);
});

const create_purchase_plan_addon = catchAsync(async (req, res) => {
  const value = await purchasePlan.create_purchase_plan_addon(req);
  if (!value) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order Not Created');
  }
  res.status(httpStatus.CREATED).send(value);
});

const get_order_details = catchAsync(async (req, res) => {
  const value = await purchasePlan.get_order_details(req);
  if (!value) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order Not Created');
  }
  res.status(httpStatus.CREATED).send(value);
});

const get_all_my_orders = catchAsync(async (req, res) => {
  const value = await purchasePlan.get_all_my_orders(req);
  if (!value) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order Not Created');
  }
  res.status(httpStatus.CREATED).send(value);
});

const get_all_my_orders_normal = catchAsync(async (req, res) => {
  const value = await purchasePlan.get_all_my_orders_normal(req);
  if (!value) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order Not Created');
  }
  res.status(httpStatus.CREATED).send(value);
});

const get_all_purchasePlans = catchAsync(async (req, res) => {
  const value = await purchasePlan.get_all_purchasePlans(req);
  if (!value) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order Not Created');
  }
  res.status(httpStatus.CREATED).send(value);
});

const create_PurchasePlan_EXpo = catchAsync(async (req, res) => {
  let userId = req.userId;
  const value = await purchasePlan.create_PurchasePlan_EXpo(req.body, userId);
  res.send(value);
});

const getPurchasedPlan = catchAsync(async (req, res) => {
  let userId = req.userId;
  const value = await purchasePlan.getPurchasedPlan(userId);
  res.send(value);
});

const updatePurchasedPlan = catchAsync(async (req, res) => {
  let userId = req.userId;

  const value = await purchasePlan.updatePurchasedPlan(req.params.id, req.body, userId);
  res.send(value);
});

const updatePurchasedPlanById = catchAsync(async (req, res) => {
  const values = await purchasePlan.updatePurchasedPlanById(req.params.id, req.body);
  res.send(values);
});

const get_All_Planes = catchAsync(async (req, res) => {
  const value = await purchasePlan.get_All_Planes(req.params.page);
  res.send(value);
});

const ChangePurchasedPlan = catchAsync(async (req, res) => {
  const values = await purchasePlan.ChangePurchasedPlan(req.params.id, req.body);
  res.send(values);
});

const UploadProof = catchAsync(async (req, res) => {
  const data = await purchasePlan.UploadProof(req.params.id, req.body);
  if (req.file) {
    console.log(req.file);
    data.image = 'images/plane/' + req.file.filename;
  }
  data.save();
  res.send(data);
});

module.exports = {
  create_purchase_plan,
  get_order_details,
  get_all_my_orders,
  create_purchase_plan_addon,
  get_all_my_orders_normal,
  get_all_purchasePlans,
  create_purchase_plan_private,
  create_PurchasePlan_EXpo,
  getPurchasedPlan,
  updatePurchasedPlan,
  updatePurchasedPlanById,
  get_All_Planes,
  ChangePurchasedPlan,
  UploadProof,
};
