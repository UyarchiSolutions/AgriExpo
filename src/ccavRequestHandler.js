var http = require('http'),
    fs = require('fs'),
    ccav = require('./utils/ccavutil'),
    qs = require('querystring');

const { ccavenue_paymnet } = require("./models/ccavenue.model")
const { purchasePlan, PlanPayment } = require("./models/purchasePlan.model")
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status');
const { Slotseperation } = require('./models/slot.model');

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
    let orders = { _id: null };
    let encryption;
    request.on('data', function (data) {
        ccavEncResponse += data;
        ccavPOST = qs.parse(ccavEncResponse);
        console.log(ccavPOST)
        encryption = ccavPOST.encResp;
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
        // let dd = await ccavenue_paymnet.findById('23852f86-cba3-4ce1-ab54-3bfcf47b319e');
        // console.log(dd, 232, result.order_id)
    });
    request.on('end', async function () {
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
        orders = await update_ccavenue_payment(result, encryption)
        const redirectUrl = 'https://exhibitor.agriexpo.live/dashboard/payment-success/' + orders._id;
        response.redirect(301, redirectUrl);

        // response.redirect(result.merchant_param1 + "/" + result.order_id)
    });
};

exports.payment_success = function (request, response) {
    var ccavEncResponse = '',
        ccavResponse = '',
        workingKey = '1AC82EC283C6AE1561C420D21169F52F',	//Put in the 32-Bit Key provided by CCAvenue.
        ccavPOST = '';
    var result = {};
    let orders = { _id: null };
    let encryption;
    request.on('data', function (data) {
        ccavEncResponse += data;
        ccavPOST = qs.parse(ccavEncResponse);
        console.log(ccavPOST)
        encryption = ccavPOST.encResp;
        ccavResponse = ccav.decrypt(encryption, workingKey);
        console.log(ccavResponse)
        console.log(ccavPOST.my_redirect_url)
        var keyValuePairs = ccavResponse.split('&');
        for (var i = 0; i < keyValuePairs.length; i++) {
            var pair = keyValuePairs[i].split('=');
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(pair[1] || ''); // Use an empty string if the value is missing
            result[key] = value;
        }
        console.log(result)
    });
    request.on('end', async function () {
        orders = await update_ccavenue_payment_link(result, encryption)
        const redirectUrl = 'https://exhibitor.agriexpo.live/paymentsuccess/' + orders._id;
        response.redirect(301, redirectUrl);

    });
};


const update_ccavenue_payment = async (result, encryption) => {
    const find = await ccavenue_paymnet.findOne({ order_id: result.order_id });
    if (!find) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'pursace not found');
    }
    else {
        find.response_enq = encryption;
        find.response = result;
        find.save();
    }

    let plan = await purchasePlan.findOne({ ccavenue: find._id })
    if (!plan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'pursace Plan  not found');
    }
    else {
        await create_PlanPayment(plan._id, result, find._id)
        plan.status = 'Activated';
        plan.save();

        plan.slotInfo.forEach(async (e) => {
            // suppierId
            await Slotseperation.create({
                SlotType: e.slotType,
                Duration: e.Duration,
                userId: plan.suppierId,
                Slots: e.No_Of_Slot,
                PlanId: plan._id,
                streamPlanId: plan.planId,
            });
        });
    }
    return find;
}

const update_ccavenue_payment_link = async (result, encryption) => {
    const find = await ccavenue_paymnet.findOne({ order_id: result.order_id });
    if (!find) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'pursace not found');
    }
    else {
        find.response_enq = encryption;
        find.response = result;
        find.save();
    }
    console.log(find)
    let plan = await purchasePlan.findOne({ ccavenue: find._id })
    if (!plan) {
        throw new ApiError(httpStatus.NOT_FOUND, 'pursace Plan  not found');
    }
    else {
        await create_PlanPayment(plan._id, result, find._id)
        plan.status = 'Activated';
        plan.save();
    }
    return find;
}



const create_PlanPayment = async (PlanId, body, ccavenue) => {
    let Plan = await purchasePlan.findById(PlanId);
    if (!Plan) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Plan not found');
    }
    let discound = Plan.Discount ? Plan.Discount : 0;
    let PlanPrice = parseInt(Plan.Price) - discound;
    let PaidAmount = Plan.PaidAmount ? Plan.PaidAmount : 0;
    let ToBePaid = PaidAmount + body.amount;
    console.log(ToBePaid, body)
    ToBePaid = ToBePaid == null ? 0 : ToBePaid
    console.log(PaidAmount, ToBePaid)
    let finding = await PlanPayment.find().count();
    let center = '';
    if (finding < 9) {
        center = '0000';
    }
    if (finding < 99 && finding >= 9) {
        center = '000';
    }
    if (finding < 999 && finding >= 99) {
        center = '00';
    }
    if (finding < 9999 && finding >= 999) {
        center = '0';
    }
    let billId = 'BID' + center + finding + 1;
    let data = { billId: billId, paymentType: "ccavenue", Amount: body.amount, ccavenue: body, PaymentMode: body.payment_mode, platform: body.payment_mode, ccavenueID: ccavenue, PlanId: PlanId };
    let paid = await purchasePlan.findByIdAndUpdate({ _id: PlanId }, { PaidAmount: ToBePaid }, { new: true });
    if (PlanPrice > 0) {
        if (PlanPrice == paid.PaidAmount ? paid.PaidAmount : 0) {
            paid.PayementStatus = 'FullyPaid';
        } else {
            paid.PayementStatus = 'PartiallyPaid';
        }
        await paid.save();
    }
    const datas = await PlanPayment.create(data);
    return datas;
};


