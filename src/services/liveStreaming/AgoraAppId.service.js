const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const moment = require('moment');
const { AgoraAppId, UsageAppID } = require('../../models/liveStreaming/AgoraAppId.model');
const Agora = require('agora-access-token');


const InsertAppId = async (req) => {

  let body = req.body;
  let userId = req.userId;

  let authorization = req.body.cloud_KEY + ":" + req.body.cloud_secret
  body = { ...body, ...{ Authorization: authorization, userId: userId } }
  let appId = await AgoraAppId.create(body);

  return appId;

}
const InsertAget_app_id = async (req) => {
  let id = req.query.id;
  let appId = await AgoraAppId.findById(id)
  // return await token_assign(400, 65778,"demo");
  return appId;

}
const get_all_token = async (req) => {
  let page = req.query.page == '' || req.query.page == null || req.query.page == null ? 0 : parseInt(req.query.page);
  let appId = await AgoraAppId.aggregate([
    {
      $skip: 20 * parseInt(page),
    },
    {
      $limit: 20,
    },
  ])
  let next = await AgoraAppId.aggregate([
    {
      $skip: 20 * (parseInt(page) + 1),
    },
    {
      $limit: 20,
    },
  ])

  return { value: appId, next: next.length != 0 };

}
const { Country, State, City } = require('country-state-city');

const get_country_list = async (req) => {
  // const csc = require('country-state-city').Country;
  const countries = Country.getAllCountries();
  // console.log(countries);
  return countries;

}

const get_state_list = async (req) => {

  // const csc = require('country-state-city').Country;
  const state = State.getStatesOfCountry(req.query.county);
  // console.log(state);
  return state;


}
const get_city_list = async (req) => {
  const cities = City.getCitiesOfState(req.query.county, req.query.state);
  return cities;


}

const token_assign = async (minutes, streamID, streamType) => {
  // 
  let minimum = 9500 - parseInt(minutes);
  console.log(minimum)
  let token = await AgoraAppId.find({ expired: false, userMinutes: { $lte: minimum }, type: { $eq: "paid" } }).limit(10);
  let paid = await AgoraAppId.findById('33ee26ed-c087-4e5f-b11d-dc0972e2bd36');
  return new Promise(async (resolve) => {
    if (minutes < 9500) {
      for (let i = 0; i < token.length; i++) {
        // console.log(element)
        let element = token[i];
        let usedMinutes = element.userMinutes ? element.userMinutes : 0;
        if (usedMinutes + minutes < 9500) {
          let vals = await UsageAppID.create({
            dateISO: moment(),
            date: moment().format('YYYY-MM-DD'),
            streamID: streamID,
            appID: element._id,
            minutes: minutes,
            streamType: streamType
          })
          element.userMinutes = usedMinutes + minutes;
          element.save();
          resolve({ vals, element });
          if (9450 < element.userMinutes) {
            element.expired = true;
          }
          break;
        }
        else {
          if (9400 < usedMinutes) {
            element.expired = true;
          }
        }
        element.save();
      }
    }
    else {
      let usedMinutes = paid.userMinutes ? paid.userMinutes : 0;
      let vals = await UsageAppID.create({
        dateISO: moment(),
        date: moment().format('YYYY-MM-DD'),
        streamID: streamID,
        appID: paid._id,
        minutes: minutes,
        streamType: streamType
      })
      paid.userMinutes = usedMinutes + minutes;
      paid.save();
      resolve({ vals, element: paid });
    }
  });

}

const get_token_usage_agri = async (req) => {
  let page = req.query.page == '' || req.query.page == null || req.query.page == null ? 0 : parseInt(req.query.page);
  let appId = req.query.id;
  let value = await UsageAppID.aggregate([
    { $match: { $and: [{ appID: { $eq: appId } }, { streamType: { $eq: "agri" } }] } },
    {
      $lookup: {
        from: 'streamrequests',
        localField: 'streamID',
        foreignField: '_id',
        as: 'streamrequests',
      },
    },
    {
      $unwind: '$streamrequests',
    },
    {
      $project: {
        _id: 1,
        dateISO: 1,
        streamID: 1,
        date: 1,
        minutes: 1,
        streamType: 1,
        streamName: "$streamrequests.streamName",
        startTime: "$streamrequests.startTime"
      }
    },
    {
      $skip: 10 * parseInt(page),
    },
    {
      $limit: 10,
    },

  ])
  let next = await UsageAppID.aggregate([
    { $match: { $and: [{ appID: { $eq: appId } }, { streamType: { $eq: "agri" } }] } },
    {
      $lookup: {
        from: 'streamrequests',
        localField: 'streamID',
        foreignField: '_id',
        as: 'streamrequests',
      },
    },
    {
      $unwind: '$streamrequests',
    },
    {
      $skip: 10 * (parseInt(page) + 1),
    },
    {
      $limit: 10,
    },
  ])

  return { value: value, next: next.length != 0 };
}
const get_token_usage_demo = async (req) => {
  let page = req.query.page == '' || req.query.page == null || req.query.page == null ? 0 : parseInt(req.query.page);
  let appId = req.query.id;
  let value = await UsageAppID.aggregate([
    { $match: { $and: [{ appID: { $eq: appId } }, { streamType: { $eq: "demo" } }] } },

  ])
}
const generateUid = async (req) => {
  const length = 5;
  const randomNo = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
  return randomNo;
};


const test_appid = async (req) => {
  let id = req.query.id;
  let appId = await AgoraAppId.findById(id)
  const uid = await generateUid();
  const role = req.body.isPublisher ? Agora.RtcRole.PUBLISHER : Agora.RtcRole.SUBSCRIBER;
  const currentTimestamp = moment().add(30, 'seconds');
  const expirationTimestamp = currentTimestamp / 1000
  const token = await geenerate_rtc_token(id, uid, role, expirationTimestamp, appId._id);
  appId.testToken = token;
  appId.testUD = uid;
  appId.endTime = currentTimestamp;
  return appId;
}
const geenerate_rtc_token = async (chennel, uid, role, expirationTimestamp, agoraID) => {
  let agoraToken = await AgoraAppId.findById(agoraID)
  return Agora.RtcTokenBuilder.buildTokenWithUid(agoraToken.appID.replace(/\s/g, ''), agoraToken.appCertificate.replace(/\s/g, ''), chennel, uid, role, expirationTimestamp);
};


const start_cloud_record = async () => {
  const role = Agora.RtcRole.SUBSCRIBER;
}



module.exports = {
  InsertAppId,
  InsertAget_app_id,
  get_all_token,
  get_state_list,
  get_country_list,
  get_city_list,
  token_assign,
  get_token_usage_agri,
  get_token_usage_demo,
  test_appid
};
