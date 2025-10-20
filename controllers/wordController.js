// import Word from "../models/word.js";

export const createWord = async (req, res) => {
  try {
    const { listId, english, italian } = req.body;
    const newWord = new Word({ listId, english, italian });
    const saved = await newWord.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getWordsByListId = async (req, res) => {
  try {
    const words = await Word.find({ listId: req.params.listId });
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
