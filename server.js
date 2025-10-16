import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());

const uri =
  "mongodb+srv://felixbuyni_db_user:sNYZ2FhtUgb4njzT@vocabulary-app-clstr.38ati6w.mongodb.net/vocabularyDB?retryWrites=true&w=majority&appName=vocabulary-app-clstr";

mongoose
  .connect(uri)
  .then(() => console.log("Connected to Atlas!"))
  .catch((err) => console.error("Connection error:", err));

const sampleSchema = new mongoose.Schema({}, { strict: false });
const Sample = mongoose.model("Sample", sampleSchema, "lists");

app.get("/lists", async (req, res) => {
  try {
    const docs = await Sample.find({}).limit(10);
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
