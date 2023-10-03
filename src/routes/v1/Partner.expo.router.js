const express = require('express');
const router = express.Router();
const PartnerController = require('../../controllers/Partner.expo.controller');

// routes

router.route('/').post(PartnerController.createPartner);
router.route('/admin/:page').get(PartnerController.gePartnersAll);
router.route('/:id').put(PartnerController.updatePartnersById);

module.exports = router;
