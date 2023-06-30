const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const moment = require('moment');
const { AgoraAppId, UsageAppID } = require('../../models/liveStreaming/AgoraAppId.model');


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
  console.log(countries);
  return countries;

}

const get_state_list = async (req) => {

  // const csc = require('country-state-city').Country;
  const state = State.getStatesOfCountry(req.query.county);
  console.log(state);
  return state;


}
const get_city_list = async (req) => {
  // const csc = require('country-state-city').Country;
  const cities = City.getCitiesOfState(req.query.county, req.query.state);
  return cities;


}

const token_assign = async (minutes, streamID, streamType) => {
  let token = await AgoraAppId.find({ expired: false });
  return new Promise(async (resolve) => {
    for (let i = 0; i < token.length; i++) {
      let element = token[i];
      let usedMinutes = element.userMinutes ? element.userMinutes : 0;
      console.log(element)
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
module.exports = {
  InsertAppId,
  InsertAget_app_id,
  get_all_token,
  get_state_list,
  get_country_list,
  get_city_list,
  token_assign,
  get_token_usage_agri,
  get_token_usage_demo
};
