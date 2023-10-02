const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const { Partner } = require('../models/Partner-expo-model');

const createPartner = async (req) => {
  let body = req.body;
  let value = await Partner.findOne({ $or: [{ email: body.email }, { mobileNumber: body.mobileNumber }] });
  if (value) {
    if (value.email == body.email) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Email Already Exist');
    }
    if (value.mobileNumber == body.mobileNumber) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Phone Number Exist');
    }
  } else {
    //   value = await Seller.create({ ...body, ...{ mainSeller: 'admin', sellerType: 'MainSeller', sellerRole: 'admin' } });
    //   value.roleNum = [1];
    value = await Partner.create(body);
    value.save();
    //   const otp = await sentOTP(value.mobileNumber, value, 'reg');
  }
  return value;
};

module.exports = {
  createPartner,
};
