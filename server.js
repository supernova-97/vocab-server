import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://felixbuyni_db_user:sNYZ2FhtUgb4njzT@vocabulary-app-clstr.38ati6w.mongodb.net/vocabularyDB?retryWrites=true&w=majority&appName=vocabulary-app-clstr";

mongoose
  .connect(uri)
  .then(() => console.log("Connected to Atlas!"))
  .catch((err) => console.error("Connection error:", err));

const listSchema = new mongoose.Schema({
  name: String,
});
const List = mongoose.model("List", listSchema, "lists");

// GET: Alle Listen abrufen
app.get("/lists", async (req, res) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Neue Liste speichern
app.post("/lists", async (req, res) => {
  try {
    const newList = new List(req.body);
    await newList.save();
    res.status(201).json(newList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Liste löschen
app.delete("/lists/:id", async (req, res) => {
  try {
    const deletedList = await List.findByIdAndDelete(req.params.id);
    if (!deletedList) {
      return res.status(404).json({ error: "List not found" });
    }
    res.json({ message: "List deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
