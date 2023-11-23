const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const moment = require('moment');
const { EventRegister, Eventslot } = require('../models/climb.event.model');

const getDatasBy_Event = (req) => {
  return req;
};

const getSlotDetails_WithCandidate = async () => {
  let values = await Eventslot.aggregate([
    {
      $lookup: {
        from: 'climbeventregisters',
        let: { eventDate: '$date', eventTime: '$slot' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$date', '$$eventDate'] }, { $eq: ['$slot', '$$eventTime'] }],
              },
            },
          },
        ],
        as: 'candidates',
      },
    },
    {
      $project: {
        _id: 1,
        booked_count: 1,
        date: 1,
        slot: 1,
        no_of_count: 1,
        createdAt: 1,
        candidates: { $size: '$candidates' },
        candList: '$candidates',
      },
    },
  ]);
  return values;
};

const getCandidateBySlot = async (req) => {
  const { date, time } = req.params;
  let values = await EventRegister.aggregate([
    {
      $match: {
        date: date,
        slot: time,
      },
    },
    {
      $addFields: {
        mobilenumber: { $toDecimal: '$mobileNumber' },
      },
    },
    {
      $lookup: {
        from: 'demobuyers',
        localField: 'mobilenumber',
        foreignField: 'phoneNumber',
        pipeline: [
          {
            $lookup: {
              from: 'demostreamtokens',
              localField: '_id',
              foreignField: 'userID',
              pipeline: [
                {
                  $lookup: {
                    from: 'demostreams',
                    localField: 'streamID',
                    foreignField: '_id',
                    as: 'demostreams',
                  },
                },
                { $unwind: '$demostreams' },
              ],
              as: 'demostreamtokens',
            },
          },
          { $unwind: '$demostreamtokens' },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              // demostreamtokens:{$push:"$demostreamtokens"}
            },
          },
        ],
        as: 'demobuyers',
      },
    },
    {
      $unwind: {
        preserveNullAndEmptyArrays: true,
        path: '$demobuyers',
      },
    },
    {
      $addFields: {
        attended: { $ifNull: ['$demobuyers.count', 0] },
      },
    },
    { $sort: { attended: -1 } },
  ]);
  return values;
};

module.exports = {
  getDatasBy_Event,
  getSlotDetails_WithCandidate,
  getCandidateBySlot,
};
