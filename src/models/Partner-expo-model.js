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

const partnerPlanSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    active: {
      type: Boolean,
      default: true,
    },
    archive: {
      type: Boolean,
      default: false,
    },
    created: {
      type: Date,
    },
    DateIso: {
      type: Number,
    },
    planName: {
      type: String,
    },
    Duration: {
      type: Number,
    },
    DurationType: {
      type: String,
    },
    numberOfParticipants: {
      type: Number,
    },
    numberofStream: {
      type: Number,
    },
    validityofplan: {
      type: Number,
    },
    additionalDuration: {
      type: String,
    },
    additionalParticipants: {
      type: String,
    },
    DurationIncrementCost: {
      type: Number,
    },
    noOfParticipantsCost: {
      type: Number,
    },
    chatNeed: {
      type: String,
    },
    commision: {
      type: String,
    },
    commition_value: {
      type: Number,
    },
    regularPrice: {
      type: Number,
    },
    salesPrice: {
      type: Number,
    },
    max_post_per_stream: {
      type: Number,
    },
    planType: {
      type: String,
    },
    description: {
      type: String,
    },
    planmode: {
      type: String,
    },
    streamvalidity: {
      type: Number,
      default: 30,
    },
    no_of_host: {
      type: Number,
    },
    slotInfo: {
      type: Array,
    },
    date: {
      type: String,
    },
    Teaser: {
      type: String,
    },
    Pdf: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    PostCount: {
      type: Number,
    },
    chat_Option: {
      type: String,
    },
    RaiseHands: {
      type: String,
    },
    No_of_host: {
      type: Number,
    },
    salesCommission: {
      type: String,
    },
    Special_Notification: {
      type: String,
    },
    StreamVideos: {
      type: String,
    },
    completedStream: {
      type: String,
    },
    Advertisement_Display: {
      type: String,
    },
    Price: {
      type: Number,
    },
    Transtraction: {
      type: String,
    },
    BankName: {
      type: String,
    },
    PaymentMethod: {
      type: String,
    },
    AccNo: {
      type: String,
    },
    TransactionId: {
      type: String,
    },
    ChequeDDNo: {
      type: String,
    },
    ChequeDDdate: {
      type: String,
    },
    transaction: {
      type: String,
    },
    offer_price: {
      type: Number,
    },
    stream_validity: {
      type: Number,
    },
    Interest_View_Count: {
      type: String,
    },
    No_of_Limitations: {
      type: Number,
    },
    Service_Charges: {
      type: Number,
    },
    TimeType: {
      type: String,
    },
    raisehandcontrol: {
      type: String,
    },
    no_of_stream: {
      type: String,
    },
    duration_per_Stream: {
      type: String,
    },
    timeType_minutes: {
      type: String,
    },
    partner_price: {
      type: String,
    },
  },
  { timestamps: true }
);

const PartnerPlan = mongoose.model('expopartnerplan', partnerPlanSchema);

module.exports = {
  Partner,
  PartnerPlan,
};
