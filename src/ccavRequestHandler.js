var http = require('http'),
    fs = require('fs'),
    ccav = require('./utils/ccavutil'),
    qs = require('querystring');

const { ccavenue_paymnet } = require("./models/ccavenue.model")
const ApiError = require('./utils/ApiError');

exports.postReq = function (request, response) {
    var body = '',
        workingKey = 'B0050D8C882D10898AE305B141D27C8C',	//Put in the 32-Bit key shared by CCAvenues.
        accessCode = 'AVOI05KI17AK41IOKA',			//Put in the Access Code shared by CCAvenues.
        encRequest = '',
        formbody = '';
    request.on('data', function (data) {
        body += data;
        encRequest = ccav.encrypt(body, workingKey);
        POST = qs.parse(body);
        console.log(POST)
        formbody = '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><script language="javascript">document.redirect.submit();</script></form>';
    });
    request.on('end', function () {
        response.writeHeader(200, { "Content-Type": "text/html" });
        response.write(formbody);
        response.end();
    });
    return;
};
// workingKey = '1AC82EC283C6AE1561C420D21169F52F',	//Put in the 32-Bit key shared by CCAvenues.
// accessCode = 'AVUK05KI18AW28KUWA',	
exports.success_recive = function (request, response) {
    var ccavEncResponse = '',
        ccavResponse = '',
        workingKey = '1AC82EC283C6AE1561C420D21169F52F',	//Put in the 32-Bit Key provided by CCAvenue.
        ccavPOST = '';
    var result = {};
    request.on('data', async function (data) {
        ccavEncResponse += data;
        ccavPOST = qs.parse(ccavEncResponse);
        console.log(ccavPOST)
        var encryption = ccavPOST.encResp;
        ccavResponse = ccav.decrypt(encryption, workingKey);
        console.log(ccavResponse)
        console.log(ccavPOST.my_redirect_url)
        var keyValuePairs = ccavResponse.split('&');
        // Create an empty object to store the result
        // Iterate through the key-value pairs and assign them to the object
        for (var i = 0; i < keyValuePairs.length; i++) {
            var pair = keyValuePairs[i].split('=');
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(pair[1] || ''); // Use an empty string if the value is missing
            result[key] = value;
        }
        console.log(result)
        let dd = await ccavenue_paymnet.findById('23852f86-cba3-4ce1-ab54-3bfcf47b319e');
        console.log(dd, 232, result.order_id)
        const find = await ccavenue_paymnet.findById(result.order_id);
        console.log(find)
        if (!find) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'pursace not found');
        }
        find.response_enq = encryption;
        find.response = result;
        find.save();
    });
    request.on('end', function () {
        // var pData = '';
        // pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>'
        // pData = pData + ccavResponse.replace(/=/gi, '</td><td>')
        // pData = pData.replace(/&/gi, '</td></tr><tr><td>')
        // pData = pData + '</td></tr></table>'
        // htmlcode = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>' + pData + '</center><br></body></html>';
        // // response.writeHeader(200, { "Content-Type": "text/html" });
        // // response.write(htmlcode);
        // // response.end();
        // response.render("payment-success.html", { data: ccavResponse });
        const redirectUrl = 'https://exhibitor.agriexpo.live/dashboard/payment-success/' + result.order_id;
        response.redirect(301, redirectUrl);

        // response.redirect(result.merchant_param1 + "/" + result.order_id)
    });
};
