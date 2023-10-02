const mongoose = require('mongoose');
const { v4 } = require('uuid');

const PartnerSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    status: {
      type: String,
      default: 'Pending',
    },
    active: {
      type: Boolean,
      default: true,
    },
    archive: {
      type: Boolean,
      default: false,
    },
    tradeName: {
      type: String,
    },
    businessType: {
      type: String,
    },
    contactName: {
      type: String,
    },
    mobileNumber: {
      type: Number,
    },
    email: {
      type: String,
    },
    category: {
      type: Array,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    mainPartner: {
      type: String,
    },
    PartnerType: {
      type: String,
    },
    PartnerRole: {
      type: Array,
    },
    registered: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    roleNum: {
      type: Array,
    },
    Pincode: {
      type: Number,
    },
    how_did_you_know_us: {
      type: String,
    },
    webSite: {
      type: String,
    },
    Designation: {
      type: String,
    },
    companyName: {
      type: String,
    },
    notifyCount: {
      type: Number,
      default: 0,
    },
    GST_Number: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  }
);
/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
PartnerSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

PartnerSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const Partner = mongoose.model('expoPartner', PartnerSchema);

module.exports = {
  Partner,
};
