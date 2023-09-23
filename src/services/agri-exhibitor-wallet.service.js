const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Wallet, Enquiry } = require('../models/agri-exhibitor-wallet.model');
const moment = require('moment');

const createWallet = async (body, userId) => {
  let data = { ...body, ...{ userId: userId } };
  let values = await Wallet.create(data);
  return values;
};
const createEnquiry = async (body, userId) => {
  const date = moment().format('DD-MM-YYYY');
  let findOrders = await Enquiry.find().count();
  let center = '';
  if (findOrders < 9) {
    center = '0000';
  }
  if (findOrders < 99 && findOrders >= 9) {
    center = '000';
  }
  if (findOrders < 999 && findOrders >= 99) {
    center = '00';
  }
  if (findOrders < 9999 && findOrders >= 999) {
    center = '0';
  }
  let count = findOrders + 1;
  let orderId = `ENQ${center}${count}`;
  let values = { ...body, ...{ date: date, EnquiryId: orderId, userId: userId } };
  const creation = await Enquiry.create(values);
  return creation;
};
module.exports = {
  createWallet,
  createEnquiry,
};
