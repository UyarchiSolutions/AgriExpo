const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const { Partner, PartnerPlan, PlanAllocation, Partnerplanpayment } = require('../models/Partner-expo-model');

const createPartner = async (req) => {
  let body = req.body;
  let value = await Partner.findOne({ $or: [{ email: body.email }, { mobileNumber: body.mobileNumber }] });
  if (value) {
    if (value.email == body.email) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Email Already Exist');
    }
    if (value.mobileNumber == body.mobileNumber) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Phone Number Exist');
    }
  } else {
    //   value = await Seller.create({ ...body, ...{ mainSeller: 'admin', sellerType: 'MainSeller', sellerRole: 'admin' } });
    //   value.roleNum = [1];
    value = await Partner.create(body);
    value.save();
    //   const otp = await sentOTP(value.mobileNumber, value, 'reg');
  }
  return value;
};

const gePartnersAll = async (req) => {
  let page = req.params.page;
  let values = await Partner.aggregate([
    {
      $skip: 10 * page,
    },
    {
      $limit: 10,
    },
  ]);
  let next = await Partner.aggregate([
    {
      $skip: 10 * (page + 1),
    },
    {
      $limit: 10,
    },
  ]);
  return { values, next: next.length != 0 };
};

const updatePartnersById = async (req) => {
  let id = req.params.id;
  let body = req.body;
  let findExist = await Partner.findById(id);
  if (!findExist) {
    throw new ApiErrir(httpStatus.BAD_REQUEST, 'Partner Not Available');
  }
  findExist = await Partner.findByIdAndUpdate({ _id: id }, body, { new: true });
  return findExist;
};

// planes

const createPlanes = async (req) => {
  let creations = await PartnerPlan.create(req.body);
  return creations;
};

const gePartnersPlanesAll = async (req) => {
  let page = req.params.page;
  let values = await PartnerPlan.aggregate([
    {
      $skip: 10 * page,
    },
    {
      $limit: 10,
    },
  ]);
  let next = await PartnerPlan.aggregate([
    {
      $skip: 10 * (page + 1),
    },
    {
      $limit: 10,
    },
  ]);
  return { values, next: next.length != 0 };
};

const updatePartnerPlanesById = async (req) => {
  let id = req.params.id;
  let body = req.body;
  let findExist = await PartnerPlan.findById(id);
  if (!findExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Plan Not Available');
  }
  findExist = await PartnerPlan.findByIdAndUpdate({ _id: id }, body, { new: true });
  return findExist;
};

const getPartnersAll = async () => {
  let val = await Partner.find();
  return val;
};
const getPartnersPlanesAll = async () => {
  let val = await PartnerPlan.find();
  return val;
};

const PlanAllocatioin = async (req) => {
  const { partner, plans } = req.body;
  plans.forEach(async (e) => {
    let data = {
      partnerId: partner,
      planId: e.plan,
      price: e.price,
      no_of_subscription: e.no_of_sub,
    };
    await PlanAllocation.create(data);
  });
  return { message: 'Planes Allocated to Partner' };
};

const getAllAllocated_Planes = async (req) => {
  let page = req.params.page;
  let values = await PlanAllocation.aggregate([
    {
      $lookup: {
        from: 'expopartners',
        localField: 'partnerId',
        foreignField: '_id',
        as: 'partner',
      },
    },

    {
      $unwind: {
        preserveNullAndEmptyArrays: true,
        path: '$partner',
      },
    },
    {
      $lookup: {
        from: 'expopartnerplans',
        localField: 'planId',
        foreignField: '_id',
        as: 'planes',
      },
    },
    {
      $unwind: {
        preserveNullAndEmptyArrays: true,
        path: '$planes',
      },
    },
    {
      $skip: 10 * page,
    },
    {
      $limit: 10,
    },
  ]);
  let next = await PlanAllocation.aggregate([
    {
      $skip: 10 * (page + 1),
    },
    {
      $limit: 10,
    },
  ]);
  return { values, next: next.length != 0 };
};

const updateAllocationById = async (req) => {
  let value = await PlanAllocation.findById(req.params.id);
  if (!value) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Not Found');
  }
  value = await PlanAllocation.findByIdAndUpdate({ _id: value._id }, req.body, { new: true });
  return value;
};

const plan_payementsDetails = async (req) => {
  let page = req.params.page;
  let values = await PlanAllocation.aggregate([
    {
      $lookup: {
        from: 'expopartners',
        localField: 'partnerId',
        foreignField: '_id',
        as: 'partner',
      },
    },

    {
      $unwind: {
        preserveNullAndEmptyArrays: true,
        path: '$partner',
      },
    },
    {
      $lookup: {
        from: 'expopartnerplans',
        localField: 'planId',
        foreignField: '_id',
        as: 'planes',
      },
    },
    {
      $unwind: {
        preserveNullAndEmptyArrays: true,
        path: '$planes',
      },
    },
    {
      $skip: 10 * page,
    },
    {
      $limit: 10,
    },
  ]);
  let next = await PlanAllocation.aggregate([
    {
      $skip: 10 * (page + 1),
    },
    {
      $limit: 10,
    },
  ]);
  return { values, next: next.length != 0 };
};

const planPayment = async (body) => {
  const { PlanId } = body;
  let Plan = await PlanAllocation.findById(PlanId);
  if (!Plan) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Plan not found');
  }
  let discound = Plan.Discount ? Plan.Discount : 0;
  let PlanPrice = parseInt(Plan.price) - discound;
  let PaidAmount = Plan.PaidAmount ? Plan.PaidAmount : 0;
  let ToBePaid = PaidAmount + body.Amount;
  let finding = await Partnerplanpayment.find().count();
  let center = '';
  if (finding < 9) {
    center = '0000';
  }
  if (finding < 99 && finding >= 9) {
    center = '000';
  }
  if (finding < 999 && finding >= 99) {
    center = '00';
  }
  if (finding < 9999 && finding >= 999) {
    center = '0';
  }
  let billId = 'BID' + center;
  let Id = `${billId}${finding + 1}`;
  console.log(Id);
  let data = { ...body, billId: Id };
  let paid = await PlanAllocation.findByIdAndUpdate({ _id: PlanId }, { PaidAmount: ToBePaid }, { new: true });
  if (PlanPrice > 0) {
    if (PlanPrice == paid.PaidAmount) {
      paid.PayementStatus = 'FullyPaid';
    } else {
      paid.PayementStatus = 'PartiallyPaid';
    }
    await paid.save();
  }
  const datas = await Partnerplanpayment.create(data);
  return datas;
};

const getPaymentDetails = async (id) => {
  let values = await Partnerplanpayment.aggregate([
    {
      $match: {
        PlanId: id,
      },
    },
    {
      $lookup: {
        from: 'partneplanAllocation',
        localField: 'PlanId',
        foreignField: '_id',
        as: 'plan',
      },
    },
    {
      $unwind: {
        preserveNullAndEmptyArrays: true,
        path: '$plan',
      },
    },
  ]);
  let findPlan = await PlanAllocation.findById(id);
  if (!findPlan) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'plan not found');
  }

  let partner = await Partner.findById(findPlan.partnerId);
  return {
    values,
    partner,
  };
};

module.exports = {
  createPartner,
  gePartnersAll,
  updatePartnersById,
  createPlanes,
  gePartnersPlanesAll,
  updatePartnerPlanesById,
  getPartnersAll,
  getPartnersPlanesAll,
  PlanAllocatioin,
  getAllAllocated_Planes,
  updateAllocationById,
  plan_payementsDetails,
  planPayment,
  getPaymentDetails,
};
