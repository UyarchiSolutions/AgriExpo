
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const moment = require('moment');
const uuid = require('uuid');
var crypto = require('crypto');
var ccavenue = require('ccavenue');
const ccav = require('../utils/ccavutil');
const axios = require('axios');


const get_paymnent_url = async (aa, dd, res) => {
    // // const orderAmount = 1000; // Example order amount in paise
    // const merchantId = '2742878';
    // const accessCode = 'AVRI05KH14CC73IRCC';
    // const workingKey = '6EB13DAEA5810ACB66C7C95BDD4D2684';
    // const orderId = uuid.v4();
    // const baseUrl = 'https://test.ccavenue.com/transaction/transaction.do';
    // const paymentData = {
    //     merchant_id: merchantId,
    //     order_id: orderId,
    //     amount: '100.00',
    //     currency: 'INR',
    //     redirect_url: 'https://agriexpo.click/',
    //     cancel_url: 'https://agriexpo.live/',
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
    // const orderParams = {
    //     order_id: 8765432,
    //     currency: 'INR',
    //     amount: '100',
    //     redirect_url: encodeURIComponent(`http://localhost:3000/api/redirect_url/`),
    //     billing_name: 'Name of the customer',
    //     // etc etc
    // };

    // const encryptedOrderData = ccav.getEncryptedOrder(orderParams);
    // console.log(encryptedOrderData)
    // // const encryptedData = ccav.encrypt(paymentData);
    // // console.log(encryptedData); // Proceed further
    // return encryptedOrderData;
};




const pay_now_encript_value = async (req) => {
    var body = '',
        workingKey = 'B0050D8C882D10898AE305B141D27C8C',	//Put in the 32-Bit key shared by CCAvenues.
        accessCode = 'AVOI05KI17AK41IOKA',			//Put in the Access Code shared by CCAvenues.
        encRequest = '';
    const orderId = uuid.v4();
    // console.log(req.body)
    // formbody = '<h1>hello<h1>';
    const merchantId = '2742878';
    const paymentData = {
        merchant_id: merchantId,
        order_id: orderId,
        amount: 100,
        currency: 'INR',
        redirect_url: 'https://agriexpo.click/',
        cancel_url: 'https://agriexpo.live/',
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

    encRequest = ccav.encrypt(JSON.stringify(paymentData), workingKey);
    formbody = '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><button>pay</button><script language="javascript">document.redirect.submit();</script></form>';

    return formbody;

}

module.exports = {
    get_paymnent_url,
    pay_now_encript_value
}

