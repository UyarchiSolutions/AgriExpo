const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const ccavenue = require("../services/ccavenue.service");



const get_paymnent_url = catchAsync(async (req, res) => {
    const category = await ccavenue.get_paymnent_url(req.shopId, req.body,res);
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write(category);
    res.end();
});



module.exports = {
    get_paymnent_url,
}