const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const influencer = require('../services/influencer.service');

const create_influencer = catchAsync(async (req, res) => {
    const value = await influencer.create_influencer(req);
    res.status(httpStatus.NO_CONTENT).send(value);

});

const get_influencer = catchAsync(async (req, res) => {
    const value = await influencer.get_influencer(req);
    res.send(value);
});

module.exports = {
    create_influencer,
    get_influencer
};
