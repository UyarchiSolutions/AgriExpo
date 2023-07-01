const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const demostream = require('../../services/liveStreaming/DemoStream.service');


const send_livestream_link = catchAsync(async (req, res) => {
  const data = await demostream.send_livestream_link(req);
  res.status(httpStatus.CREATED).send(data);
});

const get_stream_details = catchAsync(async (req, res) => {
  const data = await demostream.send_livestream_link(req);
  res.status(httpStatus.CREATED).send(data);
});



module.exports = {
  send_livestream_link,
  get_stream_details
};
