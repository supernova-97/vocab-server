import List from "../models/list.js";

export const getLists = async (req, res) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getListById = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) return res.status(404).json({ error: "List not found" });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createList = async (req, res) => {
  try {
    const newList = new List({ name: req.body.name });
    const saved = await newList.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteList = async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.json({ message: "List deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// NEU: Wörter direkt in List einfügen
export const createWord = async (req, res) => {
  try {
    const { english, italian } = req.body;
    const list = await List.findById(req.params.id);
    if (!list) return res.status(404).json({ error: "List not found" });

    const newWord = { english, italian };
    list.words.push(newWord);
    await list.save();

    res.json(newWord); // nur das neue Wort zurückgeben
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
