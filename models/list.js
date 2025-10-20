import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  words: [
    {
      english: String,
      italian: String,
    },
  ],
});

export default mongoose.model("List", listSchema);
