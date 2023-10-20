const mongoose = require('mongoose');
const { v4 } = require('uuid');
const { toJSON, paginate } = require('./plugins');

const Timelineschema = new mongoose.Schema({
    _id: {
        type: String,
        default: v4,
    },
    type: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
    },
    archive: {
        type: Boolean,
        default: false,
    },
    InTime: {
        type: Number,
    },
    outTime: {
        type: Number,
    },
    Device: {
        type: Object,
    },
    latestActive: {
        type: Number,
    },
    userId: {
        type: String,
    },
    userRole: {
        type: String,
    },
    Token: {
        type: String,
    },
});
const Usertimeline = mongoose.model('usertimeline', Timelineschema);

module.exports = {
    Usertimeline
};
