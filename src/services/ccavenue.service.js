
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const moment = require('moment');
const uuid = require('uuid');
var crypto = require('crypto');
var ccavenue = require('ccavenue');
const ccav = require('../utils/ccavutil');
const axios = require('axios');

const { ccavenue_paymnet } = require("../models/ccavenue.model")


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
    // req.query.amount
    var body = '',
        workingKey = 'B0050D8C882D10898AE305B141D27C8C',	//Put in the 32-Bit key shared by CCAvenues.
        accessCode = 'AVOI05KI17AK41IOKA',				//Put in the Access Code shared by CCAvenues.
        encRequest = '';
    const orderId = uuid.v4();
    // console.log(req.body)
    // formbody = '<h1>hello<h1>';
    const merchantId = '2742878';

    const data = {
        merchant_id: merchantId,
        order_id: orderId,
        currency: "INR",
        amount: 100,
        redirect_url: "https://agriexpo.click/success",
        cancel_url: "https://agriexpo.click/success",
        language: "EN",
        my_redirect_url: "https://agriexpo.click/",
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
        // customer_identifier: ""
    };
    const queryString = objectToQueryString(data);
    const bufferData = Buffer.from(queryString, 'utf-8');
    encRequest = ccav.encrypt(bufferData, workingKey);
    console.log(encRequest)
    formbody = '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><button>pay</button><script language="javascript">document.redirect.submit();</script></form>';
    // formbody = '<html><head><title>Sub-merchant checkout page</title><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script></head><body><center><!-- width required mininmum 482px --><iframe  width="482" height="500" scrolling="No" frameborder="0"  id="paymentFrame" src="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id='+merchantId+'&encRequest='+encRequest+'&access_code='+accessCode+'"></iframe></center><script type="text/javascript">$(document).ready(function(){$("iframe#paymentFrame").load(function() {window.addEventListener("message", function(e) {$("#paymentFrame").css("height",e.data["newHeight"]+"px"); }, false);}); });</script></body></html>';
    // let url = "https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=2742878&encRequest=" + encRequest + "&access_code=AVVK05KI18AW29KVWA"
    return formbody;
}


function objectToQueryString(obj) {
    return Object.keys(obj)
        .map(key => `${key}=${encodeURIComponent(obj[key])}`)
        .join("&");
}




const { google } = require("googleapis");

const places = google.places({
    version: "v1",
    apiKey: "AIzaSyARM6-Qr_hsR53GExv9Gmu9EtFTV5ZuDX4",
});

const nearby_value = async (req) => {
    const location = {
        lat: 12.9716,
        lng: 77.5946,
    };

    const request = {
        location: location,
        radius: 10000,
        type: "locality",
    };

    const response = await places.nearbySearch(request);

    console.log(response.results);
}



const pay_nowredirect_url = async (amount, redirct) => {
    // req.query.amount
    var body = '',
        workingKey = 'B0050D8C882D10898AE305B141D27C8C',	//Put in the 32-Bit key shared by CCAvenues.
        accessCode = 'AVOI05KI17AK41IOKA',				//Put in the Access Code shared by CCAvenues.
        encRequest = '';
    const orderId = uuid.v4();
    // console.log(req.body)
    // formbody = '<h1>hello<h1>';
    const merchantId = '2742878';

    const data = {
        merchant_id: merchantId,
        order_id: orderId,
        currency: "INR",
        amount: 100,
        redirect_url: "https://agriexpo.click/success",
        cancel_url: "https://agriexpo.click/success",
        language: "EN",
        my_redirect_url: "https://agriexpo.click/",
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
        redirct: redirct
        // customer_identifier: ""
    };
    const queryString = objectToQueryString(data);
    const bufferData = Buffer.from(queryString, 'utf-8');
    encRequest = ccav.encrypt(bufferData, workingKey);
    console.log(encRequest)
    let payment = await ccavenue_paymnet.create(data);
    data.merchant_param1 = payment._id;
    formbody = '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><button>pay</button><script language="javascript">document.redirect.submit();</script></form>';
    // formbody = '<html><head><title>Sub-merchant checkout page</title><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script></head><body><center><!-- width required mininmum 482px --><iframe  width="482" height="500" scrolling="No" frameborder="0"  id="paymentFrame" src="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id='+merchantId+'&encRequest='+encRequest+'&access_code='+accessCode+'"></iframe></center><script type="text/javascript">$(document).ready(function(){$("iframe#paymentFrame").load(function() {window.addEventListener("message", function(e) {$("#paymentFrame").css("height",e.data["newHeight"]+"px"); }, false);}); });</script></body></html>';
    // let url = "https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=2742878&encRequest=" + encRequest + "&access_code=AVVK05KI18AW29KVWA"
    return { payment, formbody };
}
const redirect_payment_gateway = async (html, res) => {
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write(html)
    res.end()
}
module.exports = {
    get_paymnent_url,
    pay_now_encript_value,
    nearby_value,
    pay_nowredirect_url,
    redirect_payment_gateway
}

