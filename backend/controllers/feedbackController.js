// controllers/feedbackController.js
import Feedback from "../models/Feedback.js";

export const createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create({ ...req.body, user: req.user._id });
    res.status(201).json(feedback);
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user", "email");
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    const updated = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updated);
  } catch (error) {
    console.error("Error updating feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: "Feedback removed" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};
