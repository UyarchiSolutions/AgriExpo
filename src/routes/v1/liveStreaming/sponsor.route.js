const express = require('express');

const router = express.Router();
const sponsor = require('../../../controllers/liveStreaming/sponsor.controller');

router.route('/registor').post(sponsor.sponsor_registretion);



module.exports = router;
