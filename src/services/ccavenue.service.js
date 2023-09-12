
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
    // const paymentData = {
    //     merchant_id: merchantId,
    //     order_id: orderId,
    //     amount: 100,
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
    const data = {
        merchant_id: merchantId,
        order_id: orderId,
        currency: "INR",
        amount: "1.00",
        redirect_url: "https://agriexpo.click/success",
        cancel_url: "https://agriexpo.click/success",
        language: "EN",
        billing_name: "Peter",
        billing_address: "Santacruz",
        billing_city: "Mumbai",
        billing_state: "MH",
        billing_zip: "400054",
        billing_country: "India",
        billing_tel: "9876543210",
        billing_email: "testing@domain.com",
        delivery_name: "Sam",
        delivery_address: "Vile Parle",
        delivery_city: "Mumbai",
        delivery_state: "Maharashtra",
        delivery_zip: "400038",
        delivery_country: "India",
        delivery_tel: "0123456789",
        merchant_param1: "additional Info.",
        merchant_param2: "additional Info.",
        merchant_param3: "additional Info.",
        merchant_param4: "additional Info.",
        merchant_param5: "additional Info.",
        promo_code: "",
        customer_identifier: ""
    };
    const queryString = objectToQueryString(data);
    // console.log(queryString)
    const bufferData = Buffer.from(queryString, 'utf-8');
    encRequest = ccav.encrypt(bufferData, workingKey);
    formbody = '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><button>pay</button><script language="javascript">document.redirect.submit();</script></form>';
    return formbody;
}


function objectToQueryString(obj) {
    return Object.keys(obj)
        .map(key => `${key}=${encodeURIComponent(obj[key])}`)
        .join("&");
}



module.exports = {
    get_paymnent_url,
    pay_now_encript_value
}

