const express = require('express');
const router = express.Router();
const shopregister = require('../../controllers/shopregister.controller');
const shopverify = require('../../controllers/shoptokenverify.controller');
const vid = require('../../middlewares/vid');
const Issue = require('../../middlewares/issue');

router.route('/getmyorders/vieworder').get(shopverify, shopregister.getmyorder_byId);
router.route('/regiter').post(shopregister.register_shop);
router.route('/new/register').post(shopregister.NewRegister_Shop);
router.route('/forget').post(shopregister.forget_password);
router.route('/sendOTP/continue/Reg').post(shopregister.sendOTP_continue_Reg);
router.route('/verify').post(shopregister.verify_otp);
router.route('/setpassword').post(shopregister.set_password);
router.route('/changepassword').post(shopverify, shopregister.change_password);
router.route('/login').post(shopregister.login_now);
router.route('/mydetails').get(shopverify, shopregister.get_myDetails);
router.route('/myorder').get(shopverify, shopregister.get_myorder);
router.route('/mypayments').get(shopverify, shopregister.get_mypayments);
router.route('/mypayments/history/:id').get(shopverify, shopregister.getpayment_history);
router.route('/orderPending/amount/:id').get(shopverify, shopregister.get_pendung_amount);
router.route('/orderamount/collect').post(shopverify, shopregister.get_orderamount);
router.route('/raiseonissue/order/all').get(shopverify, shopregister.get_raiseonissue);
router.route('/raiseorder/issue/:id').get(shopverify, shopregister.get_raiseorder_issue);
router.route('/raiseproduct/issue/:id').put(shopverify, vid, shopregister.get_raiseproduct);
router.route('/myissues/get/all').get(shopverify, shopregister.get_myissues);
router.route('/myissues/issue/:id').get(shopverify, shopregister.get_my_issue_byorder);
router.route('/cancel/order/bycustomer').get(shopverify, shopregister.cancelorder_byshop);
router.route('/cancel/byorder').put(shopverify, shopregister.cancelbyorder);
router.route('/imageUpload/:id').put(Issue.array('image'), shopregister.imageUpload_For_Issues);
router.route('/getIssuedProduct/:id').get(shopregister.getIssuedProduct);
router.route('/getissuedOrders/:page').get(shopregister.getissuedOrders);
router.route('/update/myprofile').put(shopverify, shopregister.update_profile);
router.route('/update/changepassword').put(shopverify, shopregister.update_changepassword);
router.route('/getmy/orders/all').get(shopverify, shopregister.get_my_orders_all);
router.route('/getmy/orders/single').get(shopverify, shopregister.get_my_orders_single);
router.route('/get/Streaming/orders/:id').get(shopregister.get_Streaming_orders);
router.route('/get/Streaming/ordersByStream/:id').get(shopregister.get_Streaming_ordersByStream);

module.exports = router;
