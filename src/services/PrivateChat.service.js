const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Usermessage, Interaction } = require('../models/PrivateChat.model');
const { Seller } = require('../models/seller.models');



const intraction_exhibitor = async (req) => {
    const { channel } = req.body;
    let shopId = req.shopId;
    let intraction = await Interaction.findOne({ exhibitorId: channel, visitorId: shopId });
    if (!intraction) {
        intraction = await Interaction.create({ exhibitorId: channel, visitorId: shopId, notify: true });
    }
    return intraction;
};



module.exports = {
    intraction_exhibitor
}