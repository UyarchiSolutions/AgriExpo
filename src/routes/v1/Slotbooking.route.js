const express = require('express');
const SlotBookingController = require('../../controllers/SlotBooking.controller');
const router = express.Router();
const { SellerAuth } = require('../../controllers/sellerAuth.controller');

router.route('/').post(SellerAuth, SlotBookingController.createSlotBooking);
router.route('/slots').get(SellerAuth, SlotBookingController.getBooked_Slot);
module.exports = router;
