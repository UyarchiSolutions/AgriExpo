const express = require('express');
const influencer = require('../../controllers/influencer.controller');
const router = express.Router();


router.route('/create/new').post(influencer.create_influencer);
router.route('/get/all').get(influencer.get_influencer);

module.exports = router;
