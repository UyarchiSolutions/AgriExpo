const express = require('express');
const purchasePlan = require('../../controllers/purchasePlan.controller');
const supplierAuth = require('../../controllers/supplier.authorizations');
const { SetPass, SellerAuth } = require('../../controllers/sellerAuth.controller');

const router = express.Router();

router.route('/purchase/suceess').post(SellerAuth, purchasePlan.create_purchase_plan);
router.route('/purchase/addon/suceess').post(SellerAuth, purchasePlan.create_purchase_plan_addon);
router.route('/getpayment/details/one').get(SellerAuth, purchasePlan.get_order_details);
router.route('/getpayment/details/all').get(SellerAuth, purchasePlan.get_all_my_orders);
router.route('/getpayment/details/all/normal').get(SellerAuth, purchasePlan.get_all_my_orders_normal);
router.route('/mypurchase/plans/gellall').get(SellerAuth, purchasePlan.get_all_purchasePlans);
router.route('/purchase/suceess/private').post(purchasePlan.create_purchase_plan_private);
router.route('/purchase/PurchasePlan/EXpo').post(SellerAuth, purchasePlan.create_PurchasePlan_EXpo);
router.route('/fetch/getPurchasedPlan').get(SellerAuth, purchasePlan.getPurchasedPlan);
router.route('/:id').put(SellerAuth, purchasePlan.updatePurchasedPlan);
router.route('/update/:id').put(purchasePlan.updatePurchasedPlanById);
router.route('/get/All/Planes/:page').get(purchasePlan.get_All_Planes);
router.route('/Change/Purchased/Plan/:id').put(purchasePlan.ChangePurchasedPlan);
module.exports = router;
