const express = require('express');
const validate = require('../../../middlewares/validate');
const authValidation = require('../../../validations/auth.validation');
const authController = require('../../../controllers/auth.controller');
const auth = require('../../../middlewares/auth');
const authorization = require('../../../controllers/tokenVerify.controller');

const router = express.Router();
const AgoraAppId = require('../../../controllers/liveStreaming/AgoraAppId.controller');

router.route('/insert/app/id').post(authorization, AgoraAppId.InsertAppId);
router.get('/get/app/id', AgoraAppId.InsertAget_app_id);
router.get('/get/token', AgoraAppId.get_all_token);


module.exports = router;
