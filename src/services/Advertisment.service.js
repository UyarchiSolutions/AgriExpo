const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Advertisment } = require('../models/Advertisment.model');

const create_Advertisment = async (body, userId) => {
  const creations = await Advertisment.create({ ...body, ...{ userId: userId } });
  return creations;
};

module.exports = { create_Advertisment };
