const express = require('express');
const SlotBookingController = require('../../controllers/SlotBooking.controller');
const router = express.Router();
const { SellerAuth } = require('../../controllers/sellerAuth.controller');

router.route('/').post(SellerAuth,SlotBookingController.createSlotBooking);

module.exports = router;
