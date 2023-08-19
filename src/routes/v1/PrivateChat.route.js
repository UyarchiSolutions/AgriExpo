const express = require('express');
const router = express.Router();

const PrivateChat = require('../../controllers/PrivateChat.controller');


router.route('/intraction/exp').post(PrivateChat.intraction_exhibitor);

module.exports = router;
