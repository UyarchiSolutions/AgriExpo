const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('../plugins');
const { roles } = require('../../config/roles');
const { StringDecoder } = require('string_decoder');
const { v4 } = require('uuid');


const agoraAppIdschema = mongoose.Schema({
    _id: {
        type: String,
        default: v4,
    },
    dateISO: {
        type: Number,
    },
    date: {
        type: Number,
    },
    expired: {
        type: Boolean,
        default: false,
    },
    appID: {
        type: String,
    },
    Authorization: {
        type: String,
    },
    cloud_KEY: {
        type: String,
    },
    cloud_secret: {
        type: String,
    },
    appCertificate: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    userId: {
        type: String,
    },
    agorapassword: {
        type: String,
    },
    userMinutes: {
        type: Number,
        default: 0
    },
    testToken: {
        type: String,
    },
    testUD: {
        type: Number,
    },
    cloud_testToken: {
        type: String,
    },
    cloud_testUD: {
        type: Number,
    },
    endTime: {
        type: Number,
    },
    completed: {
        type: String,
    },
    resourceId: {
        type: String,
    },
    sid: {
        type: String,
    },
    type: {
        type: String,
        default: "demo"
    }
});

const AgoraAppId = mongoose.model('AgoraAppId', agoraAppIdschema);


const UsageAppIDschema = mongoose.Schema({
    _id: {
        type: String,
        default: v4,
    },
    dateISO: {
        type: Number,
    },
    date: {
        type: String,
    },
    expired: {
        type: Boolean,
        default: false,
    },
    appID: {
        type: String,
    },
    streamID: {
        type: String,
    },
    minutes: {
        type: Number,
    },
    streamType: {
        type: String,
    }
});

const UsageAppID = mongoose.model('appidusage', UsageAppIDschema);
module.exports = { AgoraAppId, UsageAppID };
