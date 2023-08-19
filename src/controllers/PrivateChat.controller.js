const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const PrivateChat = require('../services/PrivateChat.service');

const intraction_exhibitor = catchAsync(async (req, res) => {
    await PrivateChat.intraction_exhibitor(req);
    res.status(httpStatus.NO_CONTENT).send();
});



module.exports = {
    intraction_exhibitor
}