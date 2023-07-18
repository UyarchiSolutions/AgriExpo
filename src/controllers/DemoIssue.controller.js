const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const DemoIssueService = require('../services/DemoIssues.service');
const { AppSync } = require('aws-sdk');

const createFeedBack = catchAsync(async (req, res) => {
  const demoIssue = await DemoIssueService.createFeedback(req.body);
  res.status(httpStatus.CREATED).send(demoIssue);
});

const getFeedbackById = catchAsync(async (req, res) => {
  const demoIssue = await DemoIssueService.getFeedback(req.params.id);
  res.status(httpStatus.OK).send(demoIssue);
});

const getFeedbackWithPagination = catchAsync(async (req, res) => {
  const feedback = await DemoIssueService.getFeedbackWithPagination(req.params.page);
  res.status(httpStatus.OK).send(feedback);
});

const updateFeedback = catchAsync(async (req, res) => {
  const feedback = await DemoIssueService.updateFeedback(req.params.id, req.body);
  res.status(httpStatus.OK).send(feedback);
});

const createTecIssues = catchAsync(async (req, res) => {
  const TechIssue = await DemoIssueService.createTecIssues(req.body);
  res.status(httpStatus.CREATED).send(TechIssue);
});

const get_TechIssue = catchAsync(async (req, res) => {
  const TechIssue = await DemoIssueService.get_TechIssue_Pagination(req.params.page);
  res.status(httpStatus.OK).send(TechIssue);
});

const update_TechIssue = catchAsync(async (req, res) => {
  const TechIssue = await DemoIssueService.update_TechIssue(req, params.id, req.body);
  res.status(httpStatus.OK).send(TechIssue);
});

module.exports = {
  createFeedBack,
  getFeedbackById,
  updateFeedback,
  getFeedbackWithPagination,
  createTecIssues,
  get_TechIssue,
  update_TechIssue,
};
