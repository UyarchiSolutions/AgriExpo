
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const moment = require('moment');
const uuid = require('uuid');
var crypto = require('crypto');

const ccavReqHandler = require('./../utils/ccavutil')
const ccav = require('ccavenue');

const axios = require('axios');
const get_paymnent_url = async (aa, dd, res) => {
    const ccavConfig = {
        merchant_id: '2742878',
        working_key: 'AVRI05KH14CC73IRCC',
        redirect_url: 'https://agriexpo.click/about',
        cancel_url: 'https://agriexpo.click/about',
    };
    const ccavInstance = ccav(ccavConfig);
    const paymentData = {
        order_id: 'ORDER12345', // Generate a unique order ID
        amount: 100, // Set the payment amount
        currency: 'INR', // Set the currency
        redirect: 'true', // Redirect to CCAvenue page
    };

    const paymentUrl = ccavInstance.getRedirectUrl(paymentData);
    console.log(paymentUrl)

};




module.exports = {
    get_paymnent_url
}

