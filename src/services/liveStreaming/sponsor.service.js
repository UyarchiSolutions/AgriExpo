const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const moment = require('moment');
const { Sponsor } = require('../../models/liveStreaming/sponsor.model');

const sponsor_registretion = async (req) => {
  let body = req.body;
  body = { ...body, ...{ dateISO: moment() } };
  let insert = await Sponsor.create(body);
  return insert;
};

const get_Sponsor = async (page) => {
  const values = await Sponsor.aggregate([
    {
      $skip: 10 * page,
    },
    {
      $limit: 10,
    },
  ]);
  return values;
};

const updateSponsorById = async (id, body) => {
  let values = await Sponsor.findById(id);
  if (!values) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sponsor Not Available');
  }
  values = await Sponsor.findByIdAndUpdate({ _id: id }, body, { new: true });
  return values;
};

const disable_enable = async (id, body) => {
  let values = await Sponsor.findById(id);
  if (!values) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sponsor Not Available');
  }
  if (body.status == 'disable') {
    values = await Sponsor.findByIdAndUpdate({ _id: id }, { active: false }, { new: true });
  } else {
    values = await Sponsor.findByIdAndUpdate({ _id: id }, { active: true }, { new: true });
  }
  return values;
};

module.exports = {
  sponsor_registretion,
  get_Sponsor,
  updateSponsorById,
  disable_enable,
};
