const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Usermessage, Interaction } = require('../models/PrivateChat.model');
const { Seller } = require('../models/seller.models');
const moment = require('moment');
const { Shop, AttendanceClone, AttendanceClonenew } = require('../models/b2b.ShopClone.model');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


const intraction_exhibitor = async (req) => {
    const { channel } = req.body;
    let shopId = req.shopId;
    let intraction = await Interaction.findOne({ exhibitorId: channel, visitorId: shopId });
    if (!intraction) {
        intraction = await Interaction.create({ exhibitorId: channel, visitorId: shopId });
    }
    // console.log(intraction)
    return intraction;
};


const recived_message = async (data, io, header) => {
    const intr = await Interaction.findById(data.chat)
    const payload = jwt.verify(header.token, config.jwt.secret);
    const userss = await Shop.findOne({ _id: payload._id, active: true });
    if (intr) {
        if (userss) {
            let shopId = payload._id;
            let msg = await Usermessage.create({
                exhibitorId: intr.exhibitorId,
                visitorId: shopId,
                sender: shopId,
                channel: data.chat,
                msg: data.msg,
                sendBy: "visitor",
            })
            intr.last_modify = moment();
            intr.save();
            io.sockets.emit(data.chat, msg);
        }
    }
};



const get_old_chat = async (req) => {
    let channel = req.query.chat;
    let page = req.query.page == '' || req.query.page == null || req.query.page == null ? 0 : parseInt(req.query.page);
    let message = await Usermessage.aggregate([
        { $match: { $and: [{ channel: { $eq: channel } }, { visitorShow: { $eq: true } }] } },
        { $sort: { createdAt: -1 } },
        { $skip: 50 * page },
        { $limit: 50 },
        { $sort: { createdAt: 1 } },
    ])
    let next = await Usermessage.aggregate([
        { $match: { $and: [{ channel: { $eq: channel } }, { visitorShow: { $eq: true } }] } },
        { $sort: { createdAt: -1 } },
        { $skip: 50 * (page + 1) },
        { $limit: 50 },
    ])
    return { message, next: next.length != 0 }
}


module.exports = {
    intraction_exhibitor,
    recived_message,
    get_old_chat
}