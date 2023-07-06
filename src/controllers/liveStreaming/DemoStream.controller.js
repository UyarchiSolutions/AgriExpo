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
const get_stream_verify = catchAsync(async (req, res) => {
  const data = await demostream.verifyToken(req);
  res.status(httpStatus.CREATED).send(data);
});

const get_stream_verify_buyer = catchAsync(async (req, res) => {
  const data = await demostream.get_stream_verify_buyer(req);
  res.status(httpStatus.CREATED).send(data);
});

const get_stream_details_check = catchAsync(async (req, res) => {
  const data = await demostream.get_stream_details_check(req);
  res.status(httpStatus.CREATED).send(data);
});

const go_live_stream = catchAsync(async (req, res) => {
  const data = await demostream.go_live_stream(req);
  res.status(httpStatus.CREATED).send(data);
});
const join_stream_buyer = catchAsync(async (req, res) => {
  const data = await demostream.join_stream_buyer(req);
  res.status(httpStatus.CREATED).send(data);
});
const buyer_go_live_stream = catchAsync(async (req, res) => {
  const data = await demostream.buyer_go_live_stream(req);
  res.status(httpStatus.CREATED).send(data);
});

const get_buyer_token = catchAsync(async (req, res) => {
  const data = await demostream.get_buyer_token(req);
  res.status(httpStatus.CREATED).send(data);
});
const stream_register_buyer = catchAsync(async (req, res) => {
  const data = await demostream.stream_register_buyer(req);
  res.status(httpStatus.CREATED).send(data);
});

const get_get_add_to_cart = catchAsync(async (req, res) => {
  const data = await demostream.get_get_add_to_cart(req);
  res.status(httpStatus.CREATED).send(data);
});

const add_to_cart = catchAsync(async (req, res) => {
  const tokens = await demostream.addTocart(req);
  res.status(httpStatus.CREATED).send(tokens);
});

const confirmOrder_razerpay = catchAsync(async (req, res) => {
  const category = await demostream.confirmOrder_razerpay(req.shopId, req.body, req);
  console.log(category);
  setTimeout(async () => {
    await demostream.emit_cart_qty(req, req.body.OdrerDetails.streamId);
  }, 3000);
  res.send(category);
});

const confirmOrder_cod = catchAsync(async (req, res) => {
  const category = await demostream.confirmOrder_cod(req.shopId, req.body, req);
  setTimeout(async () => {
    await demostream.emit_cart_qty(req, req.body.OdrerDetails.streamId);
  }, 3000);
  res.send(category);
});

const end_stream = catchAsync(async (req, res) => {
  const category = await demostream.end_stream(req);
  res.send(category);
});

const go_live = catchAsync(async (req, res) => {
  const category = await demostream.go_live(req);
  res.send(category);
});

const get_DemoStream_By_Admin = catchAsync(async (req, res) => {
  const data = await demostream.get_DemoStream_By_Admin(req.userId);
  res.send(data);
});

module.exports = {
  send_livestream_link,
  get_stream_details,
  get_stream_verify,
  get_stream_details_check,
  go_live_stream,
  join_stream_buyer,
  get_stream_verify_buyer,
  get_buyer_token,
  stream_register_buyer,
  get_get_add_to_cart,
  add_to_cart,
  confirmOrder_razerpay,
  confirmOrder_cod,
  end_stream,
  go_live,
  buyer_go_live_stream,
  get_DemoStream_By_Admin,
};
