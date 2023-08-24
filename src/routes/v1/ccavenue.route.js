const express = require('express');
const ccavenue = require("../../controllers/ccavenue.controller");
const router = express.Router();
const shopverify = require('../../controllers/shoptokenverify.controller');

router.route('/get/payment/url').get(ccavenue.get_paymnent_url);


module.exports = router;