const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const demostream = require('../../services/liveStreaming/DemoStream.service');


const send_Link = catchAsync(async (req, res) => {
  const data = await demostream.send_Link(req);
  res.status(httpStatus.CREATED).send(data);
});


module.exports = {
  send_Link,

};
