import express from "express";
import {
  createFeedback,
  getMyFeedbacks,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createFeedback).get(protect, getMyFeedbacks);
router.route("/:id").put(protect, updateFeedback).delete(protect, deleteFeedback);

export default router;
