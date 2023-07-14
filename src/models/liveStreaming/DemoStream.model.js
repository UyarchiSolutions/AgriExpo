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
    // default: v4,
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
  streamValitity: {
    type: String,
  },
  endTime: {
    type: Number,
  },
  livestart: {
    type: Boolean,
    default: false,
  },
  agoraID: {
    type: String,
  },
  joined: {
    type: Boolean,
  },
  current_watching_stream: {
    type: Number,
  },
  userList: {
    type: Array,
    default: []
  },
  end_Status: {
    type: String,
  },
  streamEnd_Time: {
    type: Number,
  },
  status: {
    type: String,
    default: "Pending"
  },
  createdBy: {
    type: String,
  },
  transaction: {
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
  phoneNumber: {
    type: Number,
  },
  name: {
    type: String,
  }

});

const Demobuyer = mongoose.model('demobuyer', Demobuyerschema);

const Demoorderschema = mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  DateIso: {
    type: Number,
  },
  date: {
    type: String,
  },
  created: {
    type: Date,
  },
  time: {
    type: Number,
  },
  streamId: {
    type: String,
  },
  cart: {
    type: Array,
  },
  shopId: {
    type: String,
  },
  status: {
    type: String,
    default: 'ordered',
  },
  orderStatus: {
    type: String,
    default: 'Pending',
  },
  approvalStatus: {
    type: String,
    default: 'Pending',
  },
  orderId: {
    type: String,
  },
  name: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: String,
  },
  address: {
    type: String,
  },
  Amount: {
    type: Number,
  },
  bookingtype: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  userId: {
    type: String,
  }
});

const Demoorder = mongoose.model('demoorder', Demoorderschema);

const Demoorderproductschema = mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  DateIso: {
    type: Number,
  },
  date: {
    type: String,
  },
  created: {
    type: Date,
  },
  time: {
    type: Number,
  },
  orderId: {
    type: String,
  },
  postId: {
    type: String,
  },
  productId: {
    type: String,
  },
  purchase_price: {
    type: Number,
  },
  purchase_quantity: {
    type: Number,
  },
  shopId: {
    type: String,
  },
  streamId: {
    type: String,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  streamPostId: {
    type: String,
  }
});

const Demoorderproduct = mongoose.model('demoorderproduct', Demoorderproductschema);

const Demostreamchema = mongoose.Schema({
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
  expirationTimestamp: {
    type: Number,
  },
  streamID: {
    type: String,
  },
  type: {
    type: String,
  },
  uid: {
    type: Number,
  },
  token: {
    type: String,
  },
  channel: {
    type: String,
  },
  userID: {
    type: String,
  },
  status: {
    type: String,
  },
  golive: {
    type: Boolean,
    default: false,
  }
});

const DemostreamToken = mongoose.model('demostreamtoken', Demostreamchema);


const Democartchame = mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  DateIso: {
    type: Number,
  },
  date: {
    type: String,
  },
  created: {
    type: Date,
  },
  time: {
    type: Number,
  },
  streamId: {
    type: String,
  },
  cart: {
    type: Array,
  },
  shopId: {
    type: String,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  proceed_To_Pay: {
    type: String,
  },
  startTime: {
    type: Number,
  },
  endTime: {
    type: Number,
  },
  userId: {
    type: String,
  }
});




const Democart = mongoose.model('democart', Democartchame);


const Democartproductschema = mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  DateIso: {
    type: Number,
  },
  categoryId: {
    type: String,
  },
  created: {
    type: String,
  },
  image: {
    type: String,
  },
  incrementalLots: {
    type: Number,
  },
  marketPlace: {
    type: Number,
  },
  offerPrice: {
    type: Number,
  },
  postLiveStreamingPirce: {
    type: Number,
  },
  productTitle: {
    type: String,
  },
  minLots: {
    type: Number,
  },
  suppierId: {
    type: String,
  },
  cartQTY: {
    type: Number,
  },
  productId: {
    type: String,
  },
  bookingAmount: {
    type: String,
  },
  streamPostId: {
    type: String,
  },
  streamrequestpostId: {
    type: String,
  },
  streamingCart: {
    type: String,
  },
  cardStatus: {
    type: Boolean,
    default: true
  },
  add_to_cart: {
    type: Boolean,
  },
  quantity: {
    type: Number,
  },
  proceed_To_Pay: {
    type: String,
  },
  startTime: {
    type: Number,
  },
  endTime: {
    type: Number,
  },
  userId: {
    type: String,
  }
});

const Democartproduct = mongoose.model('democartproduct', Democartproductschema);

const streamingPaymant = mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  DateIso: {
    type: Number,
  },
  date: {
    type: String,
  },
  created: {
    type: Date,
  },
  time: {
    type: Number,
  },
  paidAmt: {
    type: Number,
  },
  type: {
    type: String,
  },
  orderId: {
    type: String,
  },
  uid: {
    type: String,
  },
  payment: {
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
  pay_type: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  paymentstutes: {
    type: String,
  },
  RE_order_Id: {
    type: String,
  },
  reorder_status: {
    type: Boolean,
  },
  creditBillStatus: {
    type: String,
  },
  reasonScheduleOrDate: {
    type: String,
  },
  creditID: {
    type: String,
  },
  Schedulereason: {
    type: String,
  },
  creditApprovalStatus: {
    type: String,
    default: 'Pending',
  },
  onlinepaymentId: {
    type: String,
  },
  onlineorderId: {
    type: String,
  },
  paymentTypes: {
    type: String,
    default: 'offline',
  },
  paymentGatway: {
    type: String,
  },
  shopId: {
    type: String,
  },
  streamId: {
    type: String,
  },
  bookingtype: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
});
const Demopaymnt = mongoose.model('demopayment', streamingPaymant);




const demointrestedschema = mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  DateIso: {
    type: Number,
  },
  date: {
    type: String,
  },
  created: {
    type: Date,
  },
  time: {
    type: Number,
  },
  productID: {
    type: String,
  },
  streamID: {
    type: String,
  },
  userID: {
    type: String,
  },
  joinedUSER: {
    type: String,
  },
  intrested: {
    type: Boolean,
  }
});
const DemoInstested = mongoose.model('demointrested', demointrestedschema);



const demosavedproductschema = mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  DateIso: {
    type: Number,
  },
  date: {
    type: String,
  },
  created: {
    type: Date,
  },
  time: {
    type: Number,
  },
  productID: {
    type: String,
  },
  streamID: {
    type: String,
  },
  userID: {
    type: String,
  },
  joinedUSER: {
    type: String,
  },
  saved: {
    type: Boolean,
  }
});
const Demosavedproduct = mongoose.model('demosavedproduct', demosavedproductschema);




const demootp = mongoose.Schema({
  _id: {
    type: String,
    default: v4,
  },
  DateIso: {
    type: Number,
  },
  date: {
    type: String,
  },
  created: {
    type: Date,
  },
  mobile: {
    type: Number,
  },
  streamID: {
    type: String,
  },
  userID: {
    type: String,
  },
  OTP: {
    type: Number,
  },
  virify: {
    type: Boolean,
    default: true
  }
});
const Demootpverify = mongoose.model('demootp', demootp);


module.exports = { Demoseller, Demostream, Demopost, Demobuyer, Demoorder, Demoorderproduct, DemostreamToken, Democart, Democartproduct, Demopaymnt, DemoInstested, Demosavedproduct, Demootpverify };
