const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const sponsor = require('../../services/liveStreaming/sponsor.service');


const sponsor_registretion = catchAsync(async (req, res) => {
  const data = await sponsor.sponsor_registretion(req);
  res.status(httpStatus.CREATED).send(data);
});




module.exports = {
  sponsor_registretion,
};
