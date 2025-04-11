// feedbackController.js
const db = require("../db/dbConfig");

// Get all feedback
const getAllFeedback = (req, res) => {
  const query = "SELECT * FROM feedback";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
    res.json(results);
  });
};

// Get feedback by ID
const getFeedbackById = (req, res) => {
  const { feedback_id } = req.params;
  const query = "SELECT * FROM feedback WHERE feedback_id = ?";
  db.query(query, [feedback_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
    if (results.length === 0) {
      return res.status(404).send("Feedback not found");
    }
    res.json(results[0]);
  });
};

// Create new feedback (no rating)
const createFeedback = (req, res) => {
  const { user_id, course_id, feedback_text } = req.body;
  const query =
    "INSERT INTO feedback (user_id, course_id, feedback_text) VALUES (?, ?, ?)";
  db.query(query, [user_id, course_id, feedback_text], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
    res.status(201).send("Feedback created");
  });
};

// Update feedback (no rating)
const updateFeedback = (req, res) => {
  const { feedback_id } = req.params;
  const { feedback_text } = req.body;
  const query = "UPDATE feedback SET feedback_text = ? WHERE feedback_id = ?";
  db.query(query, [feedback_text, feedback_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Feedback not found");
    }
    res.send("Feedback updated");
  });
};

// Delete feedback
const deleteFeedback = (req, res) => {
  const { feedback_id } = req.params;
  const query = "DELETE FROM feedback WHERE feedback_id = ?";
  db.query(query, [feedback_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Feedback not found");
    }
    res.send("Feedback deleted");
  });
};

module.exports = {
  getAllFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
