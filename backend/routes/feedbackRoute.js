// routes/feedbackRoutes.js
const express = require("express");
const router = express.Router();
const feedbackController = require("../controller/feedbackController");

// Route to get all feedback
router.get("/", feedbackController.getAllFeedback);

// Route to get feedback by ID
router.get("/:feedback_id", feedbackController.getFeedbackById);

// Route to create feedback
router.post("/", feedbackController.createFeedback);

// Route to update feedback
router.put("/:feedback_id", feedbackController.updateFeedback);

// Route to delete feedback
router.delete("/:feedback_id", feedbackController.deleteFeedback);

module.exports = router;
