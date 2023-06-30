const mongoose = require('mongoose');
const { v4 } = require('uuid');
const { toJSON, paginate } = require('./plugins');

const SlotSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    Type: String,
    Duration: Number,
    chooseTime: {
      type: Date,
    },
    start: Number,
    end: Number,
    active: {
      type: Boolean,
      default: true,
    },
    startFormat: String,
    endFormat: String,
    Status: {
      type: String,
      default: 'Pending',
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

const Slot = mongoose.model('slot', SlotSchema);

module.exports = { Slot };
