const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('../plugins');
const { roles } = require('../../config/roles');
const { StringDecoder } = require('string_decoder');
const { v4 } = require('uuid');



const demosellerschema = mongoose.Schema({
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
    phoneNumber: {
        type: Number,
    },
    name: {
        type: String,
    },



});

const Demoseller = mongoose.model('demoseller', demosellerschema);


const demostreamchema = mongoose.Schema({
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
    userID: {
        type: String,
    },
    streamName: {
        type: String,
    },
    name: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    streamValitity:{
        type: String,
    }
});

const Demostream = mongoose.model('demostream', demostreamchema);


const Demopostschema = mongoose.Schema({
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
    productTitle: {
        type: String,
    },
    streamID: {
        type: String,
    },
    productID: {
        type: String,
    },
    image: {
        type: String,
    },
    userID: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    orderedQTY: {
        type: Number,
        default: 0,
    },
    pendingQTY: {
        type: Number,
        default: 0,
    },
    marketPlace: {
        type: Number,
    },
    offerPrice: {
        type: Number,
    },
    minLots: {
        type: Number,
    },
    incrementalLots: {
        type: Number,
    },

});

const Demopost = mongoose.model('demopost', Demopostschema);

const Demobuyerschema = mongoose.Schema({
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
});

const Demobuyer = mongoose.model('demobuyer', Demobuyerschema);


const Demoorderschema = mongoose.Schema({
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
});

const Demoorder = mongoose.model('demoorder', Demobuyerschema);



const Demoorderproductschema = mongoose.Schema({
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
});

const Demoorderproduct = mongoose.model('demoorderproduct', Demoorderproductschema);

module.exports = { Demoseller, Demostream, Demopost, Demobuyer, Demoorder, Demoorderproduct };
