
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const moment = require('moment');
const uuid = require('uuid');
var crypto = require('crypto');

const axios = require('axios');
const get_paymnent_url = async () => {
    // const merchantId = '2742878';
    // const accessCode = 'AVRI05KH14CC73IRCC';
    // const amount = 100;
    // const orderId = uuid.v4();
    // const workingID = "6EB13DAEA5810ACB66C7C95BDD4D2684";
    // const paymentData = {
    //     amount: 100, // Set the payment amount
    //     orderId: orderId, // Set a unique order ID
    //     currency: 'INR',
    //     redirectUrl: 'https://exhibitor.agriexpo.live/', // URL to redirect after payment
    //     cancelUrl: 'https://exhibitor.agriexpo.live/', // URL to redirect if payment is cancelled
    // };

    // // Create a secure hash
    // const secureHash = crypto.createHash('sha256')
    //     .update(`${merchantId}|${paymentData.orderId}|${paymentData.amount}|${paymentData.redirectUrl}|${workingID}`)
    //     .digest('hex');

    // // API request payload
    // const requestData = {
    //     merchant_id: merchantId,
    //     order_id: paymentData.orderId,
    //     amount: paymentData.amount,
    //     currency: paymentData.currency,
    //     redirect_url: paymentData.redirectUrl,
    //     cancel_url: paymentData.cancelUrl,
    //     secure_hash: secureHash,
    // };
    // try {

    //     console.log(requestData)
    //     const response = await axios.post('https://secure.ccavenue.com/transaction/initiate.do', requestData);
    //     const paymentPageUrl = response.data;
    //     console.log(paymentPageUrl)
    //     console.log(response.data)
    //     return response.data;

    // } catch (error) {
    //     console.log(error)
    //     return error;
    // }
    // Gather order information
    const orderAmount = 1000; // Example order amount in paise
    const merchantId = '2742878';
    const accessCode = 'AVRI05KH14CC73IRCC';
    const workingKey = '6EB13DAEA5810ACB66C7C95BDD4D2684';
    const orderId = uuid.v4();
    const baseUrl = 'https://secure.ccavenue.com/transaction/transaction.do';

    const paymentData = {
        merchant_id: merchantId,
        order_id: orderId,
        amount: '100.00',
        currency: 'INR',
        redirect_url: 'https://exhibitor.agriexpo.live/',
        cancel_url: 'https://exhibitor.agriexpo.live/',
        language: 'EN',
        billing_name: 'John Doe',
        billing_address: '123 Main St',
        billing_city: 'chennai',
        billing_state: 'tamilnadu',
        billing_zip: '600017',
        billing_country: 'India',
        billing_tel: '9965740303',
        billing_email: 'bharathiraja996574@gmail.com',
    };

    // Calculate checksum
    const crypto = require('crypto');
    const keys = Object.keys(paymentData).sort();
    const values = keys.map(key => paymentData[key]);
    const concatenatedString = values.join('|');
    const checksum = crypto
        .createHmac('sha256', workingKey)
        .update(concatenatedString)
        .digest('hex')
        .toUpperCase();

    paymentData.checksum = checksum;

    // Send payment request
    axios.post(baseUrl, paymentData)
        .then(response => {
            console.log('Payment URL:', response.data);
        })
        .catch(error => {
            console.error('Payment Error:', error);
        });
};




module.exports = {
    get_paymnent_url
}

