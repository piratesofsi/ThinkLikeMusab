import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    question: { type: String },
    leetcode: {
      number: { type: Number },
      name: { type: String },
      url: { type: String },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    submittedBy: { type: String },
    rejectionReason: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("Post", postSchema);
