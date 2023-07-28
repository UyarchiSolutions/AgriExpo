const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const moment = require('moment');
const { purchasePlan } = require('../models/purchasePlan.model');
const paymentgatway = require('./paymentgatway.service');
const Dates = require('./Date.serive');
const AWS = require('aws-sdk');
const { Slotseperation } = require('../models/slot.model');

const {
  Streamplan,
  StreamPost,
  Streamrequest,
  StreamrequestPost,
  StreamPreRegister,
  streamPlanlink,
} = require('../models/ecomplan.model');

const create_purchase_plan = async (req) => {
  let orders;
  if (req.body.PaymentDatails != null) {
    let payment = await paymentgatway.verifyRazorpay_Amount(req.body.PaymentDatails);
    //console.log(payment)
    let collectedAmount = payment.amount / 100;
    let collectedstatus = payment.status;
    let plan = await Streamplan.findById(req.body.plan);
    if (collectedstatus == 'captured' && collectedAmount == plan.salesPrice) {
      var yourDate = new Date();
      var numberOfDaysToAdd = plan.validityofplan;
      var date_now = yourDate.setDate(yourDate.getDate() + numberOfDaysToAdd);
      let datas = {
        planType: 'normal',
        planId: req.body.plan,
        suppierId: req.userId,
        paidAmount: collectedAmount,
        paymentStatus: collectedstatus,
        order_id: payment.order_id,
        noOfParticipants: plan.numberOfParticipants,
        chat: plan.chatNeed,
        max_post_per_stream: plan.max_post_per_stream,
        Duration: plan.Duration,
        planName: plan.planName,
        DurationType: plan.DurationType,
        numberOfParticipants: plan.numberOfParticipants,
        numberofStream: plan.numberofStream,
        validityofplan: plan.validityofplan,
        noOfParticipantsCost: plan.noOfParticipantsCost,
        chatNeed: plan.chatNeed,
        commision: plan.commision,
        commition_value: plan.commition_value,
        stream_expire_hours: plan.stream_expire_hours,
        stream_expire_days: plan.stream_expire_days,
        stream_expire_minutes: plan.stream_expire_minutes,
        regularPrice: plan.regularPrice,
        salesPrice: plan.salesPrice,
        description: plan.description,
        planmode: plan.planmode,
        expireDate: date_now,
        streamvalidity: plan.streamvalidity,
        no_of_host: plan.no_of_host,
      };
      let con = await purchasePlan.create({ ...datas, ...req.body.PaymentDatails });
      await Dates.create_date(con);
      return con;
    } else {
      return { error: 'Amount Not Match' };
    }
  } else {
    return { error: 'order not found' };
  }
};
const create_purchase_plan_private = async (req) => {
  let orders;
  if (req.body.PaymentDatails != null) {
    let payment = await paymentgatway.verifyRazorpay_Amount(req.body.PaymentDatails);
    let collectedAmount = payment.amount / 100;
    let collectedstatus = payment.status;
    let links = await streamPlanlink.findById(req.body.link);
    let plan = await Streamplan.findById(links.plan);
    if (collectedstatus == 'captured' && collectedAmount == plan.salesPrice) {
      var yourDate = new Date();
      var numberOfDaysToAdd = plan.validityofplan;
      var date_now = yourDate.setDate(yourDate.getDate() + numberOfDaysToAdd);
      let datas = {
        planType: 'normal',
        planId: links.plan,
        suppierId: links.supplier,
        paidAmount: collectedAmount,
        paymentStatus: collectedstatus,
        order_id: payment.order_id,
        noOfParticipants: plan.numberOfParticipants,
        chat: plan.chatNeed,
        max_post_per_stream: plan.max_post_per_stream,
        Duration: plan.Duration,
        planName: plan.planName,
        DurationType: plan.DurationType,
        numberOfParticipants: plan.numberOfParticipants,
        numberofStream: plan.numberofStream,
        validityofplan: plan.validityofplan,
        noOfParticipantsCost: plan.noOfParticipantsCost,
        chatNeed: plan.chatNeed,
        commision: plan.commision,
        commition_value: plan.commition_value,
        stream_expire_hours: plan.stream_expire_hours,
        stream_expire_days: plan.stream_expire_days,
        stream_expire_minutes: plan.stream_expire_minutes,
        regularPrice: plan.regularPrice,
        salesPrice: plan.salesPrice,
        description: plan.description,
        planmode: plan.planmode,
        expireDate: date_now,
        streamvalidity: plan.streamvalidity,
        no_of_host: plan.no_of_host,
      };
      let con = await purchasePlan.create({ ...datas, ...req.body.PaymentDatails });
      await Dates.create_date(con);
      links.purchaseId = con._id;
      links.status = 'Purchased';
      links.save();
      return con;
    } else {
      return { error: 'Amount Not Match' };
    }
  } else {
    return { error: 'order not found' };
  }
};

const create_purchase_plan_addon = async (req) => {
  let orders;
  if (req.body.PaymentDatails != null) {
    let payment = await paymentgatway.verifyRazorpay_Amount(req.body.PaymentDatails);
    //console.log(payment)
    let collectedAmount = payment.amount / 100;
    let collectedstatus = payment.status;
    let plan = await Streamplan.findById(req.body.plan);
    if (collectedstatus == 'captured' && collectedAmount == plan.salesPrice) {
      var yourDate = new Date();
      var numberOfDaysToAdd = plan.validityofplan;
      let date_now = yourDate.setDate(yourDate.getDate() + numberOfDaysToAdd);
      if (plan.planType == 'addon') {
        date_now = new Date().getTime();
      }
      //console.log(date_now)
      let con = await purchasePlan.create({
        ...{
          no_of_host: plan.no_of_host,
          planType: 'addon',
          streamId: req.body.streamId,
          planId: req.body.plan,
          suppierId: req.userId,
          paidAmount: collectedAmount,
          paymentStatus: collectedstatus,
          order_id: payment.order_id,
          noOfParticipants: plan.numberOfParticipants,
        },
        ...req.body.PaymentDatails,
      });
      await Dates.create_date(con);
      await addstream_user_limits(req, plan, con);
      return con;
    } else {
      return { error: 'Amount Not Match' };
    }
  } else {
    return { error: 'order not found' };
  }
};

const addstream_user_limits = async (req, plan, con) => {
  let stream = await Streamrequest.findById(req.body.streamId);
  let users_limit = await StreamPreRegister.find({ streamId: req.body.streamId, status: 'Registered' })
    .skip(stream.noOfParticipants)
    .limit(plan.numberOfParticipants);
  //console.log(users_limit)
  let count = stream.noOfParticipants;
  users_limit.forEach(async (e) => {
    count++;
    await StreamPreRegister.findByIdAndUpdate(
      { _id: e._id },
      { eligible: true, streamCount: count, viewstatus: 'Confirmed' },
      { new: true }
    );
  });
  stream.noOfParticipants = plan.numberOfParticipants + stream.noOfParticipants;
  stream.save();
};
const get_order_details = async (req) => {
  let order = await purchasePlan.findById(req.query.id);
  if (!order || order.suppierId != req.userId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  }
  let plan = await Streamplan.findById(order.planId);
  let payment = await paymentgatway.verifyRazorpay_Amount({
    razorpay_order_id: order.razorpay_order_id,
    razorpay_payment_id: order.razorpay_payment_id,
    razorpay_signature: order.razorpay_signature,
  });

  return { payment, plan, order };
};

const get_all_my_orders = async (req) => {
  let plan = await purchasePlan.aggregate([
    { $sort: { DateIso: -1 } },
    { $match: { suppierId: req.userId } },
    {
      $lookup: {
        from: 'streamplans',
        localField: 'planId',
        foreignField: '_id',
        as: 'streamplans',
      },
    },
    {
      $unwind: {
        path: '$streamplans',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        DateIso: 1,
        active: 1,
        archived: 1,
        created: 1,
        order_id: 1,
        paidAmount: 1,
        paymentStatus: 1,
        planId: 1,
        razorpay_order_id: 1,
        razorpay_payment_id: 1,
        razorpay_signature: 1,
        Duration: '$streamplans.Duration',
        commision: '$streamplans.commision',
        planName: '$streamplans.planName',
        commition_value: '$streamplans.commition_value',
        chatNeed: '$streamplans.chatNeed',
        numberOfParticipants: '$streamplans.numberOfParticipants',
        numberofStream: '$streamplans.numberofStream',
        post_expire_days: '$streamplans.post_expire_days',
        post_expire_hours: '$streamplans.post_expire_hours',
        post_expire_minutes: '$streamplans.post_expire_minutes',
        regularPrice: '$streamplans.regularPrice',
        validityofStream: '$streamplans.validityofStream',
      },
    },
  ]);
  return plan;
};

const get_all_my_orders_normal = async (req) => {
  let page = req.query.page == '' || req.query.page == null || req.query.page == null ? 0 : req.query.page;
  let plan = await purchasePlan.aggregate([
    { $sort: { DateIso: -1 } },
    { $match: { $and: [{ suppierId: req.userId }, { planType: { $eq: 'normal' } }] } },
    { $skip: 10 * page },
    { $limit: 10 },
  ]);
  let total = await purchasePlan.aggregate([
    { $sort: { DateIso: -1 } },
    { $match: { $and: [{ suppierId: req.userId }, { planType: { $eq: 'normal' } }] } },
    { $skip: 10 * (page + 1) },
    { $limit: 10 },
  ]);
  return { plan, next: total.length != 0 };
};

const get_all_purchasePlans = async (req) => {
  var date_now = new Date().getTime();
  const myorders = await purchasePlan.aggregate([
    {
      $match: {
        $and: [{ suppierId: { $eq: req.userId } }, { active: { $eq: true } }, { expireDate: { $gt: date_now } }],
      },
    },
    {
      $lookup: {
        from: 'streamplans',
        localField: 'planId',
        foreignField: '_id',
        pipeline: [{ $match: { planType: { $ne: 'addon' } } }],
        as: 'streamplans',
      },
    },
    {
      $unwind: '$streamplans',
    },
    {
      $project: {
        _id: 1,
        planName: '$streamplans.planName',
        max_post_per_stream: '$streamplans.max_post_per_stream',
        numberOfParticipants: '$streamplans.numberOfParticipants',
        numberofStream: '$streamplans.numberofStream',
        chatNeed: '$streamplans.chatNeed',
        commision: '$streamplans.commision',
        Duration: '$streamplans.Duration',
        commition_value: '$streamplans.commition_value',
        numberOfStreamused: 1,
        expireDate: 1,
        no_of_host: 1,
      },
    },
  ]);

  return myorders;
};

// AGRI EXPO

const create_PurchasePlan_EXpo = async (body, userId) => {
  const data = { ...body, DateIso: moment(), suppierId: userId };
  const creations = await purchasePlan.create(data);
  return creations;
};

const getPurchasedPlan = async (userId) => {
  let values = await purchasePlan.aggregate([{ $match: { suppierId: userId } }]);
  return values;
};

const updatePurchasedPlan = async (id, body, userId) => {
  let values = await purchasePlan.findById(id);
  if (!values) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'plan Not Found');
  }
  values = await purchasePlan.findByIdAndDelete({ _id: id });
  const data = { ...body, DateIso: moment(), suppierId: userId, _id: body._id };
  values = await purchasePlan.create(data);
  return values;
};

const updatePurchasedPlanById = async (id, body) => {
  let values = await purchasePlan.findById(id);
  if (!values) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'plan Not Found');
  }
  values = await purchasePlan.findByIdAndUpdate({ _id: id }, body, { new: true });
  return values;
};

const get_All_Planes = async (page) => {
  let values = await purchasePlan.aggregate([
    { $match: { active: true } },
    { $lookup: { from: 'sellers', localField: 'suppierId', foreignField: '_id', as: 'suppliers' } },
    { $unwind: { preserveNullAndEmptyArrays: true, path: '$suppliers' } },
    {
      $project: {
        _id: 1,
        active: 1,
        archived: 1,
        planType: 1,
        numberOfStreamused: 1,
        streamvalidity: 1,
        planId: 1,
        suppierId: 1,
        paidAmount: 1,
        paymentStatus: 1,
        order_id: 1,
        noOfParticipants: 1,
        chat: 1,
        max_post_per_stream: 1,
        Duration: 1,
        planName: 1,
        DurationType: 1,
        numberOfParticipants: 1,
        numberofStream: 1,
        validityofplan: 1,
        noOfParticipantsCost: 1,
        chatNeed: 1,
        commision: 1,
        commition_value: 1,
        regularPrice: 1,
        salesPrice: 1,
        description: 1,
        planmode: 1,
        expireDate: 1,
        no_of_host: 1,
        razorpay_payment_id: 1,
        razorpay_order_id: 1,
        razorpay_signature: 1,
        DateIso: 1,
        created: 1,
        suppliers: 1,
        status: { $ifNull: ['$status', 'Pending'] },
        Teaser: 1,
        StreamVideos: 1,
        completedStream: 1,
        Pdf: 1,
        Paidimage: 1,
        RaiseHands: 1,
        Advertisement_Display: 1,
        Special_Notification: 1,
        Price: 1,
        slotInfo: 1,
        PayementMode: 1,
        ChequeDDdate: 1,
        ChequeDDNo: 1,
        AccountNo: 1,
        FromBank: 1,
        image: 1,
        TransactionId: 1,
        chat_Option: 1,
        salesCommission: 1,
        PostCount: 1,
      },
    },
    { $skip: 10 * page },
    { $limit: 10 },
  ]);
  let total = await purchasePlan.aggregate([{ $match: { active: true } }]);
  return { values, total: total.length };
};

const ChangePurchasedPlan = async (id, body) => {
  let values = await purchasePlan.findById(id);
  if (!values) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'plan Not Found');
  }
  values = await purchasePlan.findByIdAndDelete({ _id: id });
  const data = { ...body, DateIso: moment(), _id: body._id };
  values = await purchasePlan.create(data);
  return values;
};

const UploadProof = async (id, body) => {
  const s3 = new AWS.S3({
    accessKeyId: 'AKIAZEVZUULIPMENZZH7',
    secretAccessKey: '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',
    region: 'ap-south-1',
  });

  let params = {
    Bucket: 'agriexpoupload',
    Key: body.file.originalname,
    Body: body.file.buffer,
  };
  let stream;
  return new Promise((resolve) => {
    s3.upload(params, async (err, data) => {
      if (err) {
      }
      stream = await purchasePlan.findByIdAndUpdate({ _id: id }, { Paidimage: data.Location }, { new: true });
      resolve({ video: 'success', stream: stream });
    });
  });
};

const getPlanyById = async (id) => {
  const plan = await purchasePlan.findById(id);
  return plan;
};

const Approve_Reject = async (id, body) => {
  let values = await purchasePlan.findById(id);
  if (!values) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Plan Not Available');
  }
  if (body.status == 'Approved') {
    values = await purchasePlan.findByIdAndUpdate({ _id: id }, { status: body.status }, { new: true });
    values.slotInfo.forEach(async (e) => {
      // suppierId
      await Slotseperation.create({
        SlotType: e.slotType,
        Duration: e.Duration,
        userId: values.suppierId,
        Slots: e.No_Of_Slot,
        PlanId: values._id,
      });
    });
  } else if (body.status == 'Rejected') {
    values = await purchasePlan.findByIdAndUpdate({ _id: id }, { status: body.status }, { new: true });
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Error Occured');
  }
  return values;
};

const getPlanDetailsByUser = async (userId) => {
  let val = await purchasePlan.aggregate([
    {
      $match: { status: 'Approved', suppierId: userId },
    },
    {
      $lookup: {
        from: 'slotseperations',
        localField: '_id',
        foreignField: 'PlanId',
        pipeline: [
          {
            $match: {
              SlotType: 'Normal',
            },
          },
        ],
        as: 'NormalSlot',
      },
    },
    {
      $lookup: {
        from: 'slotseperations',
        localField: '_id',
        foreignField: 'PlanId',
        pipeline: [
          {
            $match: {
              SlotType: 'Peak',
            },
          },
        ],
        as: 'PeakSlot',
      },
    },
    {
      $lookup: {
        from: 'slotseperations',
        localField: '_id',
        foreignField: 'PlanId',
        pipeline: [
          {
            $match: {
              SlotType: 'Exclusive',
            },
          },
        ],
        as: 'ExclusiveSlot',
      },
    },
    {
      $lookup: {
        from: 'slotbookings',
        localField: '_id',
        foreignField: 'PlanId',
        pipeline: [{ $match: { slotType: 'Normal' } }],
        as: 'BookedSlotsNormal',
      },
    },
    {
      $lookup: {
        from: 'slotbookings',
        localField: '_id',
        foreignField: 'PlanId',
        pipeline: [{ $match: { slotType: 'Peak' } }],
        as: 'BookedSlotsPeak',
      },
    },
    {
      $lookup: {
        from: 'slotbookings',
        localField: '_id',
        foreignField: 'PlanId',
        pipeline: [{ $match: { slotType: 'Exclusive' } }],
        as: 'BookedSlotsExclusive',
      },
    },
    {
      $project: {
        _id: 1,
        active: 1,
        status: 1,
        planName: 1,
        Normal: { $size: '$NormalSlot' },
        Peak: { $size: '$PeakSlot' },
        Exclusive: { $size: '$ExclusiveSlot' },
        NormalSlots: { $ifNull: [{ $size: '$BookedSlotsNormal' }, 0] },
        PeakSlots: { $ifNull: [{ $size: '$BookedSlotsPeak' }, 0] },
        Exclusive: { $ifNull: [{ $size: '$BookedSlotsExclusive' }, 0] },
      },
    },
  ]);
  return val;
};

const getuserAvailablePlanes = async (id, userId) => {
  let val = await purchasePlan.aggregate([
    {
      $match: {
        _id: id,
      },
    },
    {
      $lookup: {
        from: 'slotseperations',
        localField: '_id',
        foreignField: 'PlanId',
        pipeline: [{ $match: { userId: userId, Slots: { $gt: 0 } } }],
        as: 'available',
      },
    },
    {
      $project: {
        _id: 1,
        planType: 1,
        status: 1,
        planName: 1,
        slotInfo: '$available',
      },
    },
  ]);
  let data = {};
  if (val.length > 0) {
    data = val[0];
  }
  return data;
};

module.exports = {
  create_purchase_plan,
  get_order_details,
  get_all_my_orders,
  create_purchase_plan_addon,
  get_all_my_orders_normal,
  get_all_purchasePlans,
  create_purchase_plan_private,
  create_PurchasePlan_EXpo,
  getPurchasedPlan,
  updatePurchasedPlan,
  updatePurchasedPlanById,
  get_All_Planes,
  ChangePurchasedPlan,
  UploadProof,
  getPlanyById,
  Approve_Reject,
  getPlanDetailsByUser,
  getuserAvailablePlanes,
};
