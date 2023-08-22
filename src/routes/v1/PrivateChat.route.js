const express = require('express');
const router = express.Router();
const shopverify = require('../../controllers/shoptokenverify.controller');

const PrivateChat = require('../../controllers/PrivateChat.controller');


router.route('/intraction/exp').post(shopverify, PrivateChat.intraction_exhibitor);
router.route('/get/old/chat').get(shopverify, PrivateChat.get_old_chat);

module.exports = router;
