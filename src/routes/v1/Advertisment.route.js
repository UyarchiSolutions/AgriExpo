const express = require('express');
const router = express.Router();
const AdvertismentController = require('../../controllers/Advertisment.controller');

router.route('/').post(AdvertismentController.create_Advertisment);

module.exports = router;
