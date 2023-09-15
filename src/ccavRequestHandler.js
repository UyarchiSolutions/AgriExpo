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
    // console.log(request)
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
    request.on('data', function (data) {
        ccavEncResponse += data;
        ccavPOST = qs.parse(ccavEncResponse);
        console.log(ccavPOST)
        var encryption = ccavPOST.encResp;
        ccavResponse = ccav.decrypt(encryption, workingKey);
        console.log(ccavResponse)
        console.log(ccavPOST.my_redirect_url)


    });

    request.on('end', function () {
        var pData = '';
        pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>'
        pData = pData + ccavResponse.replace(/=/gi, '</td><td>')
        pData = pData.replace(/&/gi, '</td></tr><tr><td>')
        pData = pData + '</td></tr></table>'
        htmlcode = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>' + pData + '</center><br></body></html>';
        response.writeHeader(200, { "Content-Type": "text/html" });
        response.write(htmlcode);
        response.end();
    });
};
