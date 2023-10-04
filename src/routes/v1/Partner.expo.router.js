const express = require('express');
const router = express.Router();
const PartnerController = require('../../controllers/Partner.expo.controller');

// routes

router.route('/').post(PartnerController.createPartner);
router.route('/admin/:page').get(PartnerController.gePartnersAll);
router.route('/:id').put(PartnerController.updatePartnersById);
router.route('/plane/creation').post(PartnerController.createPlanes);
router.route('/gePartners/Planes/All/:page').get(PartnerController.gePartnersPlanesAll);
router.route('/updatePartnerPlanes/:id').put(PartnerController.updatePartnerPlanesById);
router.route('/getPartnersAll').get(PartnerController.getPartnersAll);
module.exports = router;
