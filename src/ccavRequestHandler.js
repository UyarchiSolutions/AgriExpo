var http = require('http'),
    fs = require('fs'),
    ccav = require('./utils/ccavutil'),
    qs = require('querystring');

exports.postReq = function (request, response) {
    var body = '',
        workingKey = 'C90164B612A8C5A954E8F87E8E6F020E',	//Put in the 32-Bit key shared by CCAvenues.
        accessCode = 'AVTO97KH72AS17OTSA',			//Put in the Access Code shared by CCAvenues.
        encRequest = '',
        formbody = '';
    console.log(workingKey)
    console.log(accessCode)

    request.on('data', function (data) {
        body += data;
        console.log(data)
        encRequest = ccav.encrypt(body, workingKey);
        formbody = '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><script language="javascript">document.redirect.submit();</script></form>';
    });

    request.on('end', function () {
        response.writeHeader(200, { "Content-Type": "text/html" });
        response.write(formbody);
        response.end();
    });
    return;
};
