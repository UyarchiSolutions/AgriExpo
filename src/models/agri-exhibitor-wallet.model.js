const mongoose = require('mongoose');
const { v4 } = require('uuid');

const WalletSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    userId: {
      type: String,
    },
    Amount: {
      type: Number,
    },
    PaymentType: {
      type: String,
    },
    status: {
      type: String,
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const Wallet = mongoose.model('agriWallet', WalletSchema);

const EnquirySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    Question: {
      type: String,
    },
    Answer: {
      type: String,
    },
    userId: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const Enquiry = mongoose.model('agrienquiry', EnquirySchema);

module.exports = {
  Wallet,
  Enquiry,
};
