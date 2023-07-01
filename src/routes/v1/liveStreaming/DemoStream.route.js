const express = require('express');
const validate = require('../../../middlewares/validate');
const authValidation = require('../../../validations/auth.validation');
const authController = require('../../../controllers/auth.controller');
const auth = require('../../../middlewares/auth');
const authorization = require('../../../controllers/tokenVerify.controller');

const router = express.Router();
const demostream = require('../../../controllers/liveStreaming/DemoStream.controller');

router.route('/send/livestream/link').post(demostream.send_livestream_link);
router.route('/get/livestream/details').get(demostream.get_stream_details);



module.exports = router;
