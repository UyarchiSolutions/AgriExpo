const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const moment = require('moment');
const { AgoraAppId } = require('../../models/liveStreaming/AgoraAppId.model');
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
  let expirationTimestamp = moment().add(3000, 'minutes') / 1000;
  const token = await geenerate_rtc_token(demostream._id, uid, role, expirationTimestamp, demostream.agoraID);

  let demotoken = await DemostreamToken.create({
    expirationTimestamp: moment().add(3000, 'minutes'),
    streamID: demostream._id,
    type: 'HOST',
    uid: uid,
    agoraID: demostream.agoraID,
    token: token,
    channel: demostream._id,
    dateISO: moment(),
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
  const streampost = await Demopost.find({ streamID: req.query.id });
  const agora = await DemostreamToken.findOne({ streamID: req.query.id, type: 'HOST' });
  const agoraID = await AgoraAppId.findById(token.agoraID);

  return { token, streampost, agora ,agoraID };
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

module.exports = {
  send_livestream_link,
  verifyToken,
  get_stream_details_check,
  go_live_stream,
};
