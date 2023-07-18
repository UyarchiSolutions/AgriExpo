const httpStatus = require('http-status');
const { Feedback, TechIssue } = require('../models/DemoIssues.model');
const ApiError = require('../utils/ApiError');

/**
 *feedback
 **/

const createFeedback = async (body) => {
  const feedback = await Feedback.create(body);
  return feedback;
};

const getFeedback = async (id) => {
  const feedback = await Feedback.findById(id);
  return feedback;
};

const updateFeedback = async (id, body) => {
  const feedback = await Feedback.findByIdAndUpdate({ _id: id }, body, { new: true });
  return feedback;
};

const getFeedbackWithPagination = async (page) => {
  let feedback = await Feedback.aggregate([
    {
      $skip: page * 10,
    },
    {
      $limit: 10,
    },
  ]);

  return feedback;
};

/**
 *feedback
 **/

const createTecIssues = async (body) => {
  let center = '';
  let id = 'ISS';
  const issue = await TechIssue.find({ active: true }).count();
  if (issue < 9) {
    center = '0000';
  }
  if (issue < 99 && issue >= 9) {
    center = '000';
  }
  if (issue < 999 && issue >= 99) {
    center = '00';
  }
  if (issue < 9999 && issue >= 999) {
    center = '0';
  }
  let total = issue + 1;
  let issueId = id + center + total;

  const techIssue = await TechIssue.create({ ...body, ...{ issueId: issueId } });
  return techIssue;
};

const get_TechIssue = async (id) => {
  const techIssue = await TechIssue.findById(id);
  return techIssue;
};

const update_TechIssue = async (id, body) => {
  const techIssue = await TechIssue.findByIdAndUpdate({ _id: id }, body, { new: true });
  return techIssue;
};

const get_TechIssue_Pagination = async (page) => {
  let techIssue = await TechIssue.aggregate([
    {
      $skip: page * 10,
    },
    {
      $limit: 10,
    },
  ]);

  return techIssue;
};

module.exports = {
  createFeedback,
  getFeedback,
  updateFeedback,
  getFeedbackWithPagination,
  createTecIssues,
  get_TechIssue,
  update_TechIssue,
  get_TechIssue_Pagination,
};
