import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => res.send("ThinkLikeMusab API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
