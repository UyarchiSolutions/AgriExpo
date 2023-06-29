const express = require('express');
const SlotController = require('../../controllers/slot.controller');
const router = express.Router();

router.route('/').post(SlotController.SlotCreation).get(SlotController.Fetch_Slot);

module.exports = router;
