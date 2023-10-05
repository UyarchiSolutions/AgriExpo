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
router.route('/getPartners/PlanesAll').get(PartnerController.getPartnersPlanesAll);
router.route('/Plan/Allocatioin').post(PartnerController.PlanAllocatioin);
router.route('/getAll/Allocated/Planes/:page').get(PartnerController.getAllAllocated_Planes);
router.route('/update/AllocationById/:id').put(PartnerController.updateAllocationById);
router.route('/plan/payements/Details/:page').get(PartnerController.plan_payementsDetails);
router.route('/planPayment').post(PartnerController.planPayment);
module.exports = router;
