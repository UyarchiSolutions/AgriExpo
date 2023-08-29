
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const moment = require('moment');
const uuid = require('uuid');
var crypto = require('crypto');

const axios = require('axios');
const get_paymnent_url = async () => {
    const merchantId = '2742878';
    const accessCode = 'AVRI05KH14CC73IRCC';
    const amount = 100;
    const orderId = uuid.v4();
    const workingID = "6EB13DAEA5810ACB66C7C95BDD4D2684";
    const paymentData = {
        amount: 100, // Set the payment amount
        orderId: orderId, // Set a unique order ID
        currency: 'INR',
        redirectUrl: 'https://exhibitor.agriexpo.live/', // URL to redirect after payment
        cancelUrl: 'https://exhibitor.agriexpo.live/', // URL to redirect if payment is cancelled
    };

    // Create a secure hash
    const secureHash = crypto.createHash('sha256')
        .update(`${merchantId}|${paymentData.orderId}|${paymentData.amount}|${paymentData.redirectUrl}|${workingID}`)
        .digest('hex');

    // API request payload
    const requestData = {
        merchant_id: merchantId,
        order_id: paymentData.orderId,
        amount: paymentData.amount,
        currency: paymentData.currency,
        redirect_url: paymentData.redirectUrl,
        cancel_url: paymentData.cancelUrl,
        secure_hash: secureHash,
    };
    try {

        console.log(requestData)
        const response = await axios.post('https://secure.ccavenue.com/transaction/initiate.do', requestData);

        // Extract the payment page URL from the response
        const paymentPageUrl = response.data.url;
        console.log(paymentPageUrl)
        console.log(response.data)
        return response.data;

    } catch (error) {
        console.log(error)
        return error;
    }
};




module.exports = {
    get_paymnent_url
}

