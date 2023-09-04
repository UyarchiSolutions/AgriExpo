
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const moment = require('moment');
const uuid = require('uuid');
var crypto = require('crypto');
var ccavenue = require('ccavenue');

const axios = require('axios');
const get_paymnent_url = async (aa, dd, res) => {
    // const orderAmount = 1000; // Example order amount in paise
    const merchantId = '2742878';
    const accessCode = 'AVRI05KH14CC73IRCC';
    const workingKey = '6EB13DAEA5810ACB66C7C95BDD4D2684';
    const orderId = uuid.v4();
    const baseUrl = 'https://test.ccavenue.com/transaction/transaction.do';

    // const paymentData = {
    //     merchant_id: merchantId,
    //     order_id: orderId,
    //     amount: '100.00',
    //     currency: 'INR',
    //     redirect_url: 'https://exhibitor.agriexpo.live/',
    //     cancel_url: 'https://exhibitor.agriexpo.live/',
    //     language: 'EN',
    //     billing_name: 'John Doe',
    //     billing_address: '123 Main St',
    //     billing_city: 'chennai',
    //     billing_state: 'tamilnadu',
    //     billing_zip: '600017',
    //     billing_country: 'India',
    //     billing_tel: '9965740303',
    //     billing_email: 'bharathiraja996574@gmail.com',
    // };
    const paymentData = {
        merchant_id: merchantId,
        order_id: orderId,
        amount: '100.00',
        currency: 'INR',
        redirect_url: 'https://exhibitor.agriexpo.live/',
        cancel_url: 'https://exhibitor.agriexpo.live/',
        // Add more payment data as needed
    };

    // Create a secure hash to send with the request
    const secureHash = createSecureHash(paymentData, workingKey);
    paymentData.secure_hash = secureHash;
    let data = await axios.post('https://test.ccavenue.com/transaction/transaction.do', paymentData)
        .then((response) => {
            // Handle the CCAvenue response
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            // Handle errors
            console.error(error);
            return error
        });
    return data;
};



function createSecureHash(data, workingKey) {
    // Concatenate the data fields as per CCAvenue's requirements
    const concatenatedData = `${data.merchant_id}|${data.order_id}|${data.amount}|${data.redirect_url}|${workingKey}`;

    // Create an MD5 hash of the concatenated data
    const hash = crypto.createHash('md5').update(concatenatedData).digest('hex');

    return hash;
}

module.exports = {
    get_paymnent_url
}

