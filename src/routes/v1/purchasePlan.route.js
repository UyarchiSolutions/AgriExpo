const express = require('express');
const purchasePlan = require('../../controllers/purchasePlan.controller');
const supplierAuth = require('../../controllers/supplier.authorizations');
const { SetPass, SellerAuth } = require('../../controllers/sellerAuth.controller');
const PlanImage = require('../../middlewares/plan');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage({
  destination: function (req, res, callback) {
    callback(null, '');
  },
});
const upload = multer({ storage }).single('Paidimage');

router.route('/purchase/suceess').post(SellerAuth, purchasePlan.create_purchase_plan);
router.route('/purchase/addon/suceess').post(SellerAuth, purchasePlan.create_purchase_plan_addon);
router.route('/getpayment/details/one').get(SellerAuth, purchasePlan.get_order_details);
router.route('/getpayment/details/all').get(SellerAuth, purchasePlan.get_all_my_orders);
router.route('/getpayment/details/all/normal').get(SellerAuth, purchasePlan.get_all_my_orders_normal);
router.route('/mypurchase/plans/gellall').get(SellerAuth, purchasePlan.get_all_purchasePlans);
router.route('/purchase/suceess/private').post(purchasePlan.create_purchase_plan_private);
router.route('/purchase/PurchasePlan/EXpo').post(SellerAuth, purchasePlan.create_PurchasePlan_EXpo);
router.route('/purchase/PurchasePlan/expo/admin').post(purchasePlan.create_PurchasePlan_EXpo_Admin);
router.route('/fetch/getPurchasedPlan').get(SellerAuth, purchasePlan.getPurchasedPlan);
router.route('/:id').put(SellerAuth, purchasePlan.updatePurchasedPlan).get(purchasePlan.getPlanyById);
router.route('/update/:id').put(purchasePlan.updatePurchasedPlanById);
router.route('/get/All/Planes/:page').get(purchasePlan.get_All_Planes);
router.route('/Change/Purchased/Plan/:id').put(purchasePlan.ChangePurchasedPlan);
router.route('/UploadProof/plan/:id').put(upload, purchasePlan.UploadProof);
router.route('/Approve/Reject/:id').put(purchasePlan.Approve_Reject);
router.route('/get/PlanDetails/ByUser').get(SellerAuth, purchasePlan.getPlanDetailsByUser);
router.route('/user/Available/Planes/:id').get(SellerAuth, purchasePlan.getuserAvailablePlanes);
router.route('/getPlanes/Request/Streams').get(SellerAuth, purchasePlan.getPlanes_Request_Streams);
router.route('/get/All/Purchased/Plan/:page').get(purchasePlan.get_All_Purchased_Plan);
router.route('/stream/PlanById/:id').get(purchasePlan.streamPlanById);
router.route('/get/Purchased/ByPlanId/:id/:page').get(purchasePlan.getPurchased_ByPlanId);
router.route('/getStreamByUserAndPlan/:user/:plan').get(purchasePlan.getStreamByUserAndPlan);
router.route('/getPlanes/ByUser').get(SellerAuth, purchasePlan.getPlanesByUser);
router.route('/getPurchasedPlanById/:id').get(purchasePlan.getPurchasedPlanById);
module.exports = router;
