const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const { Partner, PartnerPlan, PlanAllocation } = require('../models/Partner-expo-model');

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
      preserveNullAndEmptyArrays:true,
      path:"$partner"
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
      preserveNullAndEmptyArrays:true,
      path:"$partner"
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
};
