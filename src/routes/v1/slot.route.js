const express = require('express');
const SlotController = require('../../controllers/slot.controller');
const router = express.Router();

router.route('/').post(SlotController.SlotCreation).get(SlotController.Fetch_Slot);
router.route('/:id').put(SlotController.UpdateSlotById).delete(SlotController.DeleteSlotById);
router.route('/slots/drop/doen').get(SlotController.getSlots_Minutse_Wise);
router.route('/getDetails/For/Slot/Choosing').get(SlotController.getDetailsForSlotChoosing);
router.route('/getDetails/slots').post(SlotController.getSlotsWitdSort);
module.exports = router;
