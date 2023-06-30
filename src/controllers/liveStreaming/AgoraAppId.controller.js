const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const AgoraAppId = require('../../services/liveStreaming/AgoraAppId.service');


const InsertAppId= catchAsync(async (req, res) => {
    const data = await AgoraAppId.InsertAppId(req);
    res.status(httpStatus.CREATED).send(data);
  });

  const InsertAget_app_id= catchAsync(async (req, res) => {
    const data = await AgoraAppId.InsertAget_app_id(req);
    res.status(httpStatus.CREATED).send(data);
  });
  const get_all_token= catchAsync(async (req, res) => {
    const data = await AgoraAppId.get_all_token(req);
    res.status(httpStatus.CREATED).send(data);
  });
const get_country_list= catchAsync(async (req, res) => {
  const data = await AgoraAppId.get_country_list(req);
  res.status(httpStatus.CREATED).send(data);
});
const get_state_list= catchAsync(async (req, res) => {
  const data = await AgoraAppId.get_state_list(req);
  res.status(httpStatus.CREATED).send(data);
});

const get_city_list= catchAsync(async (req, res) => {
  const data = await AgoraAppId.get_city_list(req);
  res.status(httpStatus.CREATED).send(data);
});
const get_token_usage_agri= catchAsync(async (req, res) => {
  const data = await AgoraAppId.get_token_usage_agri(req);
  res.status(httpStatus.CREATED).send(data);
});

const get_token_usage_demo= catchAsync(async (req, res) => {
  const data = await AgoraAppId.get_token_usage_demo(req);
  res.status(httpStatus.CREATED).send(data);
});

module.exports = {
  InsertAppId,
  InsertAget_app_id,
  get_all_token,
  get_country_list,
  get_state_list,
  get_city_list,
  get_token_usage_demo,
  get_token_usage_agri
  };
  