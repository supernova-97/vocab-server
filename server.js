import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import listRoutes from "./routes/listRoutes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// DB-Verbindung
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// Routes
app.use("/lists", listRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
