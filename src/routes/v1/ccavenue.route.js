const express = require('express');
const ccavenue = require("../../controllers/ccavenue.controller");
const router = express.Router();
const shopverify = require('../../controllers/shoptokenverify.controller');

router.route('/get/payment/url').get(ccavenue.get_paymnent_url);
router.route('/paynow/encript/value').get(ccavenue.pay_now_encript_value);
router.route('/nearby').get(ccavenue.nearby_value);


module.exports = router;