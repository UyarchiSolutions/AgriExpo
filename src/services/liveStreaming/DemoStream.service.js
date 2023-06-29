const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const moment = require('moment');
const { AgoraAppId } = require('../../models/liveStreaming/DemoStream.model');


const send_Link = async (req) => {

  let body = req.body;
  let userId = req.userId;

  let authorization = req.body.cloud_KEY + ":" + req.body.cloud_secret
  body = { ...body, ...{ Authorization: authorization, userId: userId } }
  let appId = await AgoraAppId.create(body);

  return appId;

}
module.exports = {
  send_Link,

};
