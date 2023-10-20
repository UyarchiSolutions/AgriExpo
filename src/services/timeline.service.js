const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Usertimeline } = require('../models/timeline.model');

const moment = require("moment");

const createTimeline = async (supplierBuyerBody) => {
    return SupplierBuyer.create(supplierBuyerBody);
};


const login_timeline = async (details) => {
    let timeline = await Usertimeline.create(details);
    return timeline;
}


const logout_timeline = async (id) => {
    let timeline = await Usertimeline.findByIdAndUpdate({ _id: id }, { outTime: moment() }, { new: true });
    return timeline;
}



module.exports = {
    createTimeline,
    login_timeline,
    logout_timeline
};
