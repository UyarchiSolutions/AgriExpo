
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const moment = require('moment');
const uuid = require('uuid');
var crypto = require('crypto');
var ccavenue = require('ccavenue');
const ccavReqHandler = require('./../utils/ccavutil')

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
    // const crypto = require('crypto');
    // const keys = Object.keys(paymentData).sort();
    // const values = keys.map(key => paymentData[key]);
    // const concatenatedString = values.join('|');
    // const checksum = crypto
    //     .createHmac('sha256', workingKey)
    //     .update(concatenatedString)
    //     .digest('hex')
    //     .toUpperCase();
    // paymentData.checksum = checksum;
    // let data = await axios.post(baseUrl, paymentData)
    //     .then(response => {
    //         console.log('Payment URL:', response.data);
    //         return response.data;
    //     })
    //     .catch(error => {
    //         // console.error('Payment Error:', error);
    //         return error;
    //     });

    // return data;


    // // axios.post('https://secure.ccavenue.com/transaction/transaction.do', paymentData)
    // //     .then(response => {
    // //         // Handle the response from CCAvenue
    // //         console.log(response.data);
    // //     })
    // //     .catch(error => {
    // //         // Handle errors
    // //         console.error(error);
    // //     });
    var body = '',
        workingKey = '6EB13DAEA5810ACB66C7C95BDD4D2684',	//Put in the 32-Bit key shared by CCAvenues.
        accessCode = 'AVRI05KH14CC73IRCC',			//Put in the Access Code shared by CCAvenues.
        encRequest = '',
        formbody = '';
    // res.on('data',  (data) =>{
    //     body += data;
    //     console.log("asda")
    //     // console.log(body)
    encRequest = ccavReqHandler.encrypt(body, workingKey);
    formbody = '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><script language="javascript">document.redirect.submit();</script></form>';
    // });

    // res.on('end', function () {
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write(formbody);
    res.end();
    // });
    return;

};




module.exports = {
    get_paymnent_url
}

