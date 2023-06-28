const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const moment = require('moment');
const { AgoraAppId } = require('../../models/liveStreaming/AgoraAppId.model');


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

  return appId;

}

const get_all_token = async (req) => {
  let page = req.query.page == '' || req.query.page == null || req.query.page == null ? 0 : parseInt(req.query.page);
  let appId = await AgoraAppId.aggregate([
    {
      $skip: 10 * parseInt(page),
    },
    {
      $limit: 10,
    },
  ])
  let next = await AgoraAppId.aggregate([
    {
      $skip: 10 * (parseInt(page) + 1),
    },
    {
      $limit: 10,
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
module.exports = {
  InsertAppId,
  InsertAget_app_id,
  get_all_token,
  get_state_list,
  get_country_list,
  get_city_list
};
