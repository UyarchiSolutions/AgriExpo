const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const moment = require('moment');
const { AgoraAppId } = require('../../models/liveStreaming/AgoraAppId.model');
const Dates = require('../Date.serive');
const paymentgatway = require('../paymentgatway.service');

const {
  Product,
  Stock,
  ConfirmStock,
  LoadingExecute,
  BillRaise,
  ManageBill,
  ShopList,
} = require('../../models/product.model');
const {
  Demoseller,
  Demostream,
  Demopost,
  Demobuyer,
  Demoorder,
  Demoorderproduct,
  DemostreamToken,
  Democart,
  Democartproduct,
  Demopaymnt
} = require('../../models/liveStreaming/DemoStream.model');
const jwt = require('jsonwebtoken');
const agoraToken = require('./AgoraAppId.service');

const secret = 'demoStream';
const Agora = require('agora-access-token');

const geenerate_rtc_token = async (chennel, uid, role, expirationTimestamp, agoraID) => {
  let agoraToken = await AgoraAppId.findById(agoraID);
  return Agora.RtcTokenBuilder.buildTokenWithUid(
    agoraToken.appID.replace(/\s/g, ''),
    agoraToken.appCertificate.replace(/\s/g, ''),
    chennel,
    uid,
    role,
    expirationTimestamp
  );
};
const generateUid = async () => {
  const length = 5;
  const randomNo = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
  return randomNo;
};

const send_livestream_link = async (req) => {
  const { phoneNumber, name } = req.body;

  let user = await Demoseller.findOne({ phoneNumber: phoneNumber });

  if (!user) {
    user = await Demoseller.create({ phoneNumber: phoneNumber, dateISO: moment(), name: name });
  }
  const uid = await generateUid();
  let streamCount = await Demostream.find().count();
  console.log(moment().add(15, 'minutes').format('hh:mm a'));
  let demostream = await Demostream.create({
    userID: user._id,
    dateISO: moment(),
    phoneNumber: phoneNumber,
    name: name,
    streamName: 'Demo Stream - ' + (parseInt(streamCount) + 1),
    endTime: moment().add(15, 'minutes'),
  });
  let agoraID = await agoraToken.token_assign(105, demostream._id, 'demo');
  if (agoraID) {
    demostream.agoraID = agoraID.element._id;
  }
  const role = Agora.RtcRole.PUBLISHER;
  let expirationTimestamp = moment().add(15, 'minutes') / 1000;
  const token = await geenerate_rtc_token(demostream._id, uid, role, expirationTimestamp, demostream.agoraID);

  let demotoken = await DemostreamToken.create({
    expirationTimestamp: expirationTimestamp*1000,
    streamID: demostream._id,
    type: 'HOST',
    uid: uid,
    agoraID: demostream.agoraID,
    token: token,
    channel: demostream._id,
    dateISO: moment(),
    userID: user._id,
  });
  const payload = {
    _id: user._id,
    streamID: demostream._id,
    type: 'demostream',
  };
  let valitity = jwt.sign(payload, secret, {
    expiresIn: '3000m', // Set token expiration to 30 minutes
  });
  demostream.streamValitity = valitity;
  demostream.save();
  let product = await Product.find().limit(10);
  let demopoat = [];
  return new Promise(async (resolve) => {
    let element = product;
    let streampost0 = await Demopost.create({
      productTitle: element[0].productTitle,
      streamID: demostream._id,
      productID: element[0]._id,
      image: element[0].image,
      userID: user._id,
      dateISO: moment(),
      quantity: 1200,
      pendingQTY: 1200,
      marketPlace: 50,
      offerPrice: 30,
      minLots: 5,
      incrementalLots: 5,
    });
    let streampost1 = await Demopost.create({
      productTitle: element[1].productTitle,
      streamID: demostream._id,
      productID: element[1]._id,
      image: element[1].image,
      userID: user._id,
      dateISO: moment(),
      quantity: 1500,
      pendingQTY: 1500,
      marketPlace: 100,
      offerPrice: 80,
      minLots: 5,
      incrementalLots: 5,
    });
    let streampost2 = await Demopost.create({
      productTitle: element[2].productTitle,
      streamID: demostream._id,
      productID: element[2]._id,
      image: element[2].image,
      userID: user._id,
      dateISO: moment(),
      quantity: 2000,
      pendingQTY: 2000,
      marketPlace: 50,
      offerPrice: 30,
      minLots: 5,
      incrementalLots: 5,
    });
    let streampost3 = await Demopost.create({
      productTitle: element[3].productTitle,
      streamID: demostream._id,
      productID: element[3]._id,
      image: element[3].image,
      userID: user._id,
      dateISO: moment(),
      quantity: 1000,
      pendingQTY: 1000,
      marketPlace: 60,
      offerPrice: 50,
      minLots: 5,
      incrementalLots: 5,
    });
    let streampost4 = await Demopost.create({
      productTitle: element[4].productTitle,
      streamID: demostream._id,
      productID: element[4]._id,
      image: element[4].image,
      userID: user._id,
      dateISO: moment(),
      quantity: 1200,
      pendingQTY: 1200,
      marketPlace: 50,
      offerPrice: 30,
      minLots: 5,
      incrementalLots: 5,
    });
    let streampost5 = await Demopost.create({
      productTitle: element[5].productTitle,
      streamID: demostream._id,
      productID: element[5]._id,
      image: element[5].image,
      userID: user._id,
      dateISO: moment(),
      quantity: 500,
      pendingQTY: 500,
      marketPlace: 90,
      offerPrice: 75,
      minLots: 5,
      incrementalLots: 5,
    });
    let streampost6 = await Demopost.create({
      productTitle: element[6].productTitle,
      streamID: demostream._id,
      productID: element[6]._id,
      image: element[6].image,
      userID: user._id,
      dateISO: moment(),
      quantity: 2500,
      pendingQTY: 2500,
      marketPlace: 60,
      offerPrice: 40,
      minLots: 5,
      incrementalLots: 5,
    });

    let streampost7 = await Demopost.create({
      productTitle: element[7].productTitle,
      streamID: demostream._id,
      productID: element[7]._id,
      image: element[7].image,
      userID: user._id,
      dateISO: moment(),
      quantity: 2800,
      pendingQTY: 2800,
      marketPlace: 50,
      offerPrice: 30,
      minLots: 5,
      incrementalLots: 5,
    });
    let streampost8 = await Demopost.create({
      productTitle: element[8].productTitle,
      streamID: demostream._id,
      productID: element[8]._id,
      image: element[8].image,
      userID: user._id,
      dateISO: moment(),
      quantity: 600,
      pendingQTY: 600,
      marketPlace: 40,
      offerPrice: 25,
      minLots: 5,
      incrementalLots: 5,
    });
    let streampost9 = await Demopost.create({
      productTitle: element[9].productTitle,
      streamID: demostream._id,
      productID: element[9]._id,
      image: element[9].image,
      userID: user._id,
      dateISO: moment(),
      quantity: 700,
      pendingQTY: 700,
      marketPlace: 30,
      offerPrice: 19,
      minLots: 5,
      incrementalLots: 5,
    });
    demopoat.push(streampost0);
    demopoat.push(streampost1);
    demopoat.push(streampost2);
    demopoat.push(streampost3);
    demopoat.push(streampost4);
    demopoat.push(streampost5);
    demopoat.push(streampost6);
    demopoat.push(streampost7);
    demopoat.push(streampost8);
    demopoat.push(streampost9);
    if (demopoat.length == 10) {
      resolve({ demopoat, demostream });
    }
  });
};

const verifyToken = async (req) => {
  console.log(req.query.id);
  const token = await Demostream.findById(req.query.id);
  if (!token) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid Link');
  }
  try {
    const payload = jwt.verify(token.streamValitity, 'demoStream');
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Link Expired');
  }

  return token;
};

const get_stream_verify_buyer = async (req) => {
  console.log(req.query.id);
  const token = await Demostream.findById(req.query.id);
  if (!token) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid Link');
  }
  try {
    const payload = jwt.verify(token.streamValitity, 'demoStream');
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Link Expired');
  }
  const joined = await DemostreamToken.findById(req.query.join);
  if (joined) {
    token.joined = joined.streamID == token._id ? true : false;
  }
  return token;
};

const get_stream_details_check = async (req) => {
  const token = await Demostream.findById(req.query.id);
  if (!token) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid Link');
  }
  try {
    const payload = jwt.verify(token.streamValitity, 'demoStream');
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Link Expired');
  }
  const streampost = await Demopost.aggregate([
    { $match: { $and: [{ streamID: req.query.id }] } },
    {
      $lookup: {
        from: 'democartproducts',
        localField: '_id',
        foreignField: 'streamrequestpostId',
        pipeline: [
          {
            $lookup: {
              from: 'democarts',
              localField: 'streamingCart',
              foreignField: '_id',
              pipeline: [
                { $match: { $and: [{ status: { $ne: "ordered" } }] } },
                {
                  $project: {
                    _id: 1
                  }
                }
              ],
              as: 'streamingcarts',
            }
          },
          { $unwind: "$streamingcarts" },
          { $match: { $and: [{ cardStatus: { $eq: true } }, { add_to_cart: { $eq: true } }] } },
          { $group: { _id: null, count: { $sum: "$cartQTY" } } },
        ],
        as: 'stream_cart',
      },
    },
    {
      $unwind: {
        preserveNullAndEmptyArrays: true,
        path: '$stream_cart',
      },
    },
    {
      $lookup: {
        from: 'demoorderproducts',
        localField: '_id',
        foreignField: 'postId',
        pipeline: [
          { $group: { _id: null, count: { $sum: "$purchase_quantity" } } },
        ],
        as: 'stream_checkout',
      },
    },
    {
      $unwind: {
        preserveNullAndEmptyArrays: true,
        path: '$stream_checkout',
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: 'productID',
        foreignField: '_id',
        as: 'products',
      },
    },

    { $unwind: '$products' },
    {
      $project: {
        _id: 1,
        productTitle: '$products.productTitle',
        image: '$products.image',
        productId: 1,
        categoryId: 1,
        quantity: 1,
        marketPlace: 1,
        offerPrice: 1,
        postLiveStreamingPirce: 1,
        validity: 1,
        minLots: 1,
        incrementalLots: 1,
        suppierId: 1,
        DateIso: 1,
        created: 1,
        streamStart: 1,
        streamEnd: 1,
        stream_cart: { $ifNull: ["$stream_cart.count", 0] },
        stream_checkout: { $ifNull: ["$stream_checkout.count", 0] },
      },
    },
  ])
  const agora = await DemostreamToken.findOne({ streamID: req.query.id, type: 'HOST' });
  const agoraID = await AgoraAppId.findById(token.agoraID);
  const allowed_count = await DemostreamToken.find({ golive: true, status: "resgistered", streamID: token._id }).count();
  return { token, streampost, agora, agoraID, allowed_count };
};

const go_live_stream = async (req) => {
  const token = await Demostream.findById(req.query.id);
  if (!token) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid Link');
  }
  try {
    const payload = jwt.verify(token.streamValitity, 'demoStream');
  } catch (err) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Link Expired');
  }
  const streampost = await Demopost.find({ streamID: req.query.id });

  return { token, streampost };
};

const join_stream_buyer = async (req) => {

  const { phoneNumber, name } = req.body

  const streamId = req.query.id;

  let user = await Demobuyer.findOne({ phoneNumber: phoneNumber });

  if (!user) {
    user = await Demobuyer.create({ phoneNumber: phoneNumber, name: name, dateISO: moment() });
  }

  const stream = await Demostream.findById(streamId);
  if (!stream) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stream not found');
  }

  let demotoken = await DemostreamToken.findOne({ userID: user._id, streamID: stream._id })
  if (!demotoken) {
    const uid = await generateUid();
    const role = Agora.RtcRole.PUBLISHER;
    let expirationTimestamp = moment().add(15, 'minutes') / 1000;
    const token = await geenerate_rtc_token(stream._id, uid, role, expirationTimestamp, stream.agoraID);
    demotoken = await DemostreamToken.create({
      expirationTimestamp: moment().add(15, 'minutes'),
      streamID: streamId,
      type: 'BUYER',
      uid: uid,
      agoraID: stream.agoraID,
      token: token,
      channel: streamId,
      dateISO: moment(),
      userID: user._id,
    });

  }

  return demotoken;
}

const get_buyer_token = async (req) => {

  let join_token = req.query.id

  let demotoken = await DemostreamToken.findById(join_token)
  if (!demotoken) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Join token not found');
  }
  const stream = await Demostream.findById(demotoken.streamID);
  if (!stream) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stream not found');
  }
  const appID = await AgoraAppId.findById(stream.agoraID);
  if (!stream) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stream not found');
  }
  const streampost = await Demopost.find({ streamID: demotoken.streamID });

  return { demotoken, stream, appID, streampost }

}


const stream_register_buyer = async (req) => {
  let join_token = req.query.id
  let demotoken = await DemostreamToken.findById(join_token);
  let register = await DemostreamToken.find({ streamID: demotoken.streamID, status: "resgistered" }).count();
  if (register < 5) {
    demotoken.golive = true;
  }
  else {
    demotoken.golive = false;
  }
  demotoken.status = "resgistered";
  demotoken.save();
  return demotoken;
}

const get_get_add_to_cart = async (req) => {
  let temp = req.query.streamId;
  let temptoken = await DemostreamToken.findById(temp);
  let stream = await Demostream.findById(temptoken.streamID)
  let value = await Democart.findOne({ userId: temp, streamId: stream._id, status: { $ne: 'ordered' } });

  return value;

}

const addTocart = async (req) => {
  // //console.log("asdas",2321312)
  let shopId = req.shopId;
  let streamId = req.body.streamId;
  let cart = req.body.cart;
  // //console.log(cart)
  let value = await Democart.findOne({ userId: req.body.userId, streamId: streamId, status: { $ne: 'ordered' } });
  // //console.log(value, 12312)
  if (!value) {
    value = await Democart.create({ cart: cart, shopId: shopId, streamId: streamId, userId: req.body.userId });
    cart.forEach(async (a) => {
      // streamingCart
      let obj = { ...a, ...{ streamingCart: value._id, streamrequestpostId: a._id, userId: req.body.userId } };
      delete obj._id
      await Democartproduct.create(obj)
    })
    await Dates.create_date(value);
  } else {
    await Democartproduct.updateMany({ streamingCart: value._id }, { $set: { cardStatus: false } }, { new: true })
    // value.cart = cart;
    cart.forEach(async (a) => {
      // streamingCart  
      let cartproduct = await Democartproduct.findOne({ streamingCart: value._id, streamrequestpostId: a._id });
      // //console.log(cartproduct)
      if (cartproduct) {
        cartproduct.cartQTY = a.cartQTY;
      }
      else {
        let obj = { ...a, ...{ streamingCart: value._id, streamrequestpostId: a._id } };
        delete obj._id
        cartproduct = await Democartproduct.create(obj)
      }
      cartproduct.cardStatus = true;
      cartproduct.add_to_cart = a.add_to_cart;
      cartproduct.save();
    })
    // //console.log(value)
    // //console.log(value)
    value = await Democart.findByIdAndUpdate({ _id: value._id }, { cart: cart }, { new: true })
  }

  let cart_value = await emit_cart_qty(req, streamId);
  console.log(cart_value)
  return value;


}

const emit_cart_qty = async (req, streamId) => {
  let socket_cart = await Demopost.aggregate([
    { $match: { $and: [{ streamID: streamId }] } },
    {
      $lookup: {
        from: 'democartproducts',
        localField: '_id',
        foreignField: 'streamrequestpostId',
        pipeline: [
          {
            $lookup: {
              from: 'democarts',
              localField: 'streamingCart',
              foreignField: '_id',
              pipeline: [
                { $match: { $and: [{ status: { $ne: "ordered" } }] } },
                {
                  $project: {
                    _id: 1
                  }
                }
              ],
              as: 'streamingcarts',
            }
          },
          { $unwind: "$streamingcarts" },
          { $match: { $and: [{ cardStatus: { $eq: true } }, { add_to_cart: { $eq: true } }] } },
          { $group: { _id: null, count: { $sum: "$cartQTY" } } },
        ],
        as: 'stream_cart',
      },
    },
    {
      $unwind: {
        preserveNullAndEmptyArrays: true,
        path: '$stream_cart',
      },
    },
    {
      $lookup: {
        from: 'demoorderproducts',
        localField: '_id',
        foreignField: 'postId',
        pipeline: [
          { $group: { _id: null, count: { $sum: "$purchase_quantity" } } },
        ],
        as: 'stream_checkout',
      },
    },
    {
      $unwind: {
        preserveNullAndEmptyArrays: true,
        path: '$stream_checkout',
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: 'productID',
        foreignField: '_id',
        as: 'products',
      },
    },

    { $unwind: '$products' },
    {
      $project: {
        _id: 1,
        productTitle: '$products.productTitle',
        productImage: '$products.image',
        productId: 1,
        categoryId: 1,
        quantity: 1,
        marketPlace: 1,
        offerPrice: 1,
        postLiveStreamingPirce: 1,
        validity: 1,
        minLots: 1,
        incrementalLots: 1,
        suppierId: 1,
        DateIso: 1,
        created: 1,
        streamStart: 1,
        streamEnd: 1,
        stream_cart: { $ifNull: ["$stream_cart.count", 0] },
        stream_checkout: { $ifNull: ["$stream_checkout.count", 0] },
      },
    },
  ])

  req.io.emit(streamId + "cart_qty", socket_cart);
  return socket_cart;
}



const confirmOrder_cod = async (shopId, body, req) => {
  let orders;
  let streamId = body.OdrerDetails.cart;
  return new Promise(async (resolve) => {
    let cart = await Democart.findById(streamId);
    if (!cart || cart.status == 'ordered') {
      throw new ApiError(httpStatus.NOT_FOUND, 'cart not found 🖕');
    }
    orders = await addstreaming_order(shopId, body, cart);
    let paymantss = await add_odrerPayment_cod(shopId, body, orders);
    cart.cart.forEach(async (e) => {
      await addstreaming_order_product(shopId, e, orders);
    });
    cart.status = 'ordered';
    cart.save();
    // await emit_cart_qty(req,body.OdrerDetails.streamId);
    resolve(orders);
  });
};
const confirmOrder_razerpay = async (shopId, body, req) => {
  // let orders;
  let streamId = body.OdrerDetails.cart;
  //console.log(body);
  //console.log(streamId);
  if (body.PaymentDatails != null) {
    let payment = await paymentgatway.verifyRazorpay_Amount(body.PaymentDatails);
    let collectedAmount = payment.amount / 100;
    let collectedstatus = payment.status;
    if (collectedstatus == 'captured' && collectedAmount == body.OdrerDetails.Amount) {
      return new Promise(async (resolve) => {
        let cart = await Democart.findById(streamId);
        if (!cart || cart.status == 'ordered') {
          throw new ApiError(httpStatus.NOT_FOUND, 'cart not found 🖕');
        }
        let orders = await addstreaming_order(shopId, body, cart, collectedAmount);
        let paymantss = await add_odrerPayment(shopId, body, orders, payment);
        cart.cart.forEach(async (e) => {
          await addstreaming_order_product(shopId, e, orders);
        });
        cart.status = 'ordered';
        cart.save();
        // return orders;
        resolve(orders);
      });
    }
  }
};

const addstreaming_order = async (shopId, body, cart) => {
  const serverdate = moment().format('YYYY-MM-DD');
  let Buy = await Demoorder.find({ date: serverdate }).count();
  let centerdata = '';
  if (Buy < 9) {
    centerdata = '0000';
  }
  if (Buy < 99 && Buy >= 9) {
    centerdata = '000';
  }
  if (Buy < 999 && Buy >= 99) {
    centerdata = '00';
  }
  if (Buy < 9999 && Buy >= 999) {
    centerdata = '0';
  }
  let BillId = '';
  let totalcounts = Buy + 1;
  BillId = 'OD' + centerdata + totalcounts;
  let value = await Demoorder.create({
    ...{
      orderId: BillId,
    },
    ...body.OdrerDetails,
  });
  await Dates.create_date(value);
  return value;
};

const addstreaming_order_product = async (shopId, event, order) => {
  let value = await Demoorderproduct.create({
    orderId: order._id,
    postId: event._id,
    productId: event.postId,
    purchase_quantity: event.cartQTY,
    shopId: shopId,
    purchase_price: event.offerPrice,
    streamId: order.streamId,
    streamPostId: event.postId
  });
  let post = await Demopost.findById(event.postId);
  if (post) {
    let total = 0;
    if (post.orderedQTY) {
      total = post.orderedQTY + event.cartQTY;
    }
    else {
      total = event.cartQTY;
    }
    post.orderedQTY = total;
    post.pendingQTY = post.quantity - total;
    post.save();
  }
  await Dates.create_date(value);
  return value;
};

const add_odrerPayment = async (shopId, body, orders, payment) => {
  let orderDetails = body.OdrerDetails;
  let currentDate = moment().format('YYYY-MM-DD');
  let currenttime = moment().format('HHmmss');
  let value = await Demopaymnt.create({
    shopId: shopId,
    paidAmt: orderDetails.Amount,
    date: currentDate,
    time: currenttime,
    created: moment(),
    orderId: orders._id,
    type: 'customer',
    paymentMethod: 'Gateway',
    reorder_status: false,
    onlinepaymentId: payment.id,
    onlineorderId: payment.order_id,
    paymentTypes: 'Online',
    paymentGatway: 'razorpay',
    streamId: orderDetails.streamId,
    bookingtype: orderDetails.bookingtype,
    totalAmount: orderDetails.totalAmount,
  });
  await Dates.create_date(value);
  return value;
};
const add_odrerPayment_cod = async (shopId, body, orders) => {
  let orderDetails = body.OdrerDetails;
  let currentDate = moment().format('YYYY-MM-DD');
  let currenttime = moment().format('HHmmss');
  let value = await Demopaymnt.create({
    shopId: shopId,
    paidAmt: 0,
    date: currentDate,
    time: currenttime,
    created: moment(),
    orderId: orders._id,
    type: 'customer',
    paymentMethod: 'COD',
    reorder_status: false,
    paymentTypes: 'cod',
    streamId: orderDetails.streamId,
  });
  await Dates.create_date(value);
  return value;
};

const end_stream = async (req) => {
  let value = await Demostream.findByIdAndUpdate(
    { _id: req.query.id },
    { status: 'Completed', streamEnd_Time: moment(), end_Status: 'HostLeave' },
    { new: true }
  );
  req.io.emit(req.query.id + '_stream_end', { value: true });
  return value;
}


module.exports = {
  send_livestream_link,
  verifyToken,
  get_stream_details_check,
  go_live_stream,
  join_stream_buyer,
  get_stream_verify_buyer,
  get_buyer_token,
  stream_register_buyer,
  get_get_add_to_cart,
  addTocart,
  confirmOrder_razerpay,
  confirmOrder_cod,
  emit_cart_qty,
  end_stream

};
