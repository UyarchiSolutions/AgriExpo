const express = require('express');
const DemoIssueController = require('../../controllers/DemoIssue.controller');
const router = express.Router();

router.route('/Feedback').post(DemoIssueController.createFeedBack);
router.route('/Feedback/:id').get(DemoIssueController.getFeedbackById).put(DemoIssueController.updateFeedback);
router.route('/Feedback/pagination/:page').get(DemoIssueController.getFeedbackWithPagination);
router.route('/TechIssue').post(DemoIssueController.createTecIssues);
router.route('/TechIssue/:id').put(DemoIssueController.update_TechIssue);
router.route('/TechIssue/pagination/:page').get(DemoIssueController.get_TechIssue);

module.exports = router;
