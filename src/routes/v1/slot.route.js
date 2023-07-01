const express = require('express');
const SlotController = require('../../controllers/slot.controller');
const router = express.Router();

router.route('/').post(SlotController.SlotCreation).get(SlotController.Fetch_Slot);
router.route('/:id').put(SlotController.UpdateSlotById).delete(SlotController.DeleteSlotById);
router.route('/slots/drop/doen').get(SlotController.getSlots_Minutse_Wise);
module.exports = router;
