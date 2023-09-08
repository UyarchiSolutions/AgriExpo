var http = require('http'),
    fs = require('fs'),
    ccav = require('./utils/ccavutil'),
    qs = require('querystring');

exports.postReq = function (request, response) {
    var body = '',
        workingKey = 'B0050D8C882D10898AE305B141D27C8C',	//Put in the 32-Bit key shared by CCAvenues.
        accessCode = 'AVOI05KI17AK41IOKA',			//Put in the Access Code shared by CCAvenues.
        encRequest = '',
        formbody = '';
    // console.log(workingKey)
    // console.log(accessCode)

    request.on('data', function (data) {
        body += data;
        // console.log(data)
        encRequest ='456a0f76557602015246ece585a5ef1300082f234d62781dc5a04d03a578de9c10c4eb64ad16deead741b9984d5fb16d667d79e21c864e747a683dd2b4759a20f6aa5c912baec4c00eea5e3e63ea6ef8eca0b542cc8be9b06928f86221b5be7a6d4911ddeb264b861a95f1882dcce34f9874386be5eb046ea75d507abaf04424fbb030ed1b3e2d425e3e04f1530a88cc74a5177ccc3820459bb1648cf4ea9197ef6db99e27f3837021c69f7c544fe468'
        formbody = '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><script language="javascript">document.redirect.submit();</script></form>';
    });

    request.on('end', function () {
        response.writeHeader(200, { "Content-Type": "text/html" });
        response.write(formbody);
        response.end();
    });
    return;
};
