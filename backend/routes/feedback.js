const express = require('express');
const { sendFeedback } = require('../controllers/feedbackController');

const router = express.Router();

// POST /api/feedback
router.post('/', sendFeedback);

module.exports = router;
