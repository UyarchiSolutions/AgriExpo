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


module.exports = {
  InsertAppId,
  InsertAget_app_id,
  get_all_token
  };
  