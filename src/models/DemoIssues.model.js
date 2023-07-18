const mongoose = require('mongoose');
const { v4 } = require('uuid');
const { toJSON, paginate } = require('./plugins');

const FeedBackSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    How_did_You_find_the_demo: {
      type: String,
      default: 'Not_Answer',
    },
    Will_you_Decide_to_Buy_Participate: {
      type: String,
      default: 'Not_Answer',
    },
    Did_you_find_difficulty_in_the_demo_Flow: {
      type: String,
      default: 'Not_Answer',
    },
    If_yes: {
      type: String,
      default: 'Not_Answer',
    },
    Do_you_find_the_product_innovative: {
      type: String,
      default: 'Not_Answer',
    },
    Do_you_assume_that_the_Service_would_solve_some_of_your_existing_marketing_Branding_Problems: {
      type: String,
      default: 'Not_Answer',
    },
    Did_your_Request_for_DEMO_Attended_by_our_executive_smoothly: {
      type: String,
      default: 'Not_Answer',
    },
    Rate_the_Remo: {
      type: String,
      default: 'Not_Answer',
    },
    Feedback: {
      type: String,
      default: 'Not_Answer',
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model('demofeedback', FeedBackSchema);

const TechIssueSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    Logi_name: {
      type: String,
      default: 'Not_Answer',
    },
    Mobile_number: {
      type: String,
      default: 'Not_Answer',
    },
    Issue_type: {
      type: String,
      default: 'Not_Answer',
    },
    Issue_description: {
      type: String,
      default: 'Not_Answer',
    },
    Others: {
      type: String,
      default: 'Not_Answer',
    },
    issueId: {
      type: String,
    },
  },
  { timestamps: true }
);

const TechIssue = mongoose.model('techissue', TechIssueSchema);

module.exports = {
  TechIssue,
  Feedback,
};
