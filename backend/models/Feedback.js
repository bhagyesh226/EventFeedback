// models/Feedback.js
import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
