import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./Routes/users.js";
import postRoutes from "./Routes/posts.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/auth", userRoutes);
app.use("/posts", postRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

connectDB();
