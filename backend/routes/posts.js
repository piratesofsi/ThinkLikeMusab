import express from "express";
import Post from "../models/Post.js";
import protect from "../middleware/auth.js";
import nodemailer from "nodemailer";

const router = express.Router();

const sendMail = async (subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject,
    text,
  });
};

// POST /api/posts/submit — contributor submits a post
router.post("/submit", async (req, res) => {
  try {
    const post = await Post.create(req.body);

    await sendMail(
      "New Post Submission – ThinkLikeMusab",
      `New post submitted: "${post.title}" by ${post.submittedBy || "Anonymous"}\n\nReview it in your admin panel.`
    );

    res.status(201).json({ message: "Post submitted for review", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/posts — fetch all approved posts (used by frontend)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({ status: "approved" }).sort({ createdAt: 1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/posts — all posts (pending + approved + rejected)
router.get("/admin", protect, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/posts/approve/:id
router.put("/approve/:id", protect, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json({ message: "Post approved", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/posts/reject/:id
router.put("/reject/:id", protect, async (req, res) => {
  try {
    const { reason } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { status: "rejected", rejectionReason: reason },
      { new: true }
    );
    res.json({ message: "Post rejected", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/posts/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;