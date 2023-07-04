const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const moment = require('moment');
const { Sponsor } = require('../../models/liveStreaming/sponsor.model');

const sponsor_registretion = async (req) => {

  let body = req.body;

  body = { ...body, ...{ dateISO: moment() } }

  let insert = await Sponsor.create(body);


  return insert;
}
module.exports = {
  sponsor_registretion,
};
