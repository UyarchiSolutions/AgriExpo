var http = require('http'),
    fs = require('fs'),
    ccav = require('./utils/ccavutil'),
    qs = require('querystring');

exports.postReq = function (request, response) {
    var body = '',
        workingKey = 'B0050D8C882D10898AE305B141D27C8C',	//Put in the 32-Bit key shared by CCAvenues.
        accessCode = 'AVOI05KI17AK41IOKA',			//Put in the Access Code shared by CCAvenues.
        encRequest = '',
        formbody = '<h1>hello<h1>';
    // console.log(workingKey)
    // console.log(accessCode)
    // console.log(request)

    request.on('data', function (data) {
        body += data;
        encRequest = ccav.encrypt(body, workingKey);
        POST = qs.parse(body);
        console.log(POST)
        formbody = '<html><head><title>Sub-merchant checkout page</title><meta http-equiv="X-Frame-Options" content="DENY"></head><body><center><!-- width required mininmum 482px --><iframe  width="482" height="500" scrolling="No" frameborder="0"  id="paymentFrame" src="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=' + POST.merchant_id + '&encRequest=' + encRequest + '&access_code=' + accessCode + '"></iframe></center><script type="text/javascript">document.addEventListener("DOMContentLoaded", function () { var paymentFrame = document.querySelector("iframe#paymentFrame");paymentFrame.addEventListener("load", function () {window.addEventListener("message", function (e) {if (e.data.newHeight) { paymentFrame.style.height = e.data.newHeight + "px";}}, false);});});</script></body></html>';
    });
    
      
      
      
      
      
      
    request.on('end', function () {
        response.writeHeader(200, { "Content-Type": "text/html" });
        response.write(formbody);
        response.end();
    });
    return;
};
