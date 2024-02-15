const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Influencer } = require('../models/influencer.expenses.model');
const moment = require('moment');

const create_influencer = async (req) => {
    const { mobileNumber, emailId } = req.body;


    let influence = await Influencer.findOne({ mobileNumber: mobileNumber });

    if (influence) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Mobile Number Already Registered');
    }
    influence = await Influencer.findOne({ emailId: emailId });
    if (influence) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Email Already Registered');
    }

    influence = await Influencer.create(req.body);
    return influence;
};

const get_influencer = async (req) => {

    let page = req.query.page == null || req.query.page == '' || req.query.page == 'null' ? 0 : req.query.page;

    let influence = await Influencer.aggregate([
        { $skip: 10 * page },
        { $limit: 10 },
    ])
    const next = await Influencer.aggregate([
        { $skip: 10 * (page + 1) },
        { $limit: 10 },
    ])

    return { value: influence, next: next.length != 0 };

}





module.exports = {
    create_influencer,
    get_influencer
};
