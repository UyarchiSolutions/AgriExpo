const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Advertisment } = require('../models/Advertisment.model');

const create_Advertisment = async (body) => {
  const creations = await Advertisment.create(body);
  return creations;
};

module.exports = { create_Advertisment };
