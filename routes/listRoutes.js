import express from "express";
import {
  getLists,
  getListById,
  createList,
  deleteList,
  createWord,
} from "../controllers/listController.js";

const router = express.Router();

router.get("/", getLists); // GET /lists
router.get("/:id", getListById);
router.post("/", createList);
router.delete("/:id", deleteList);
router.post("/:id/words", createWord);

// NEU: Wörter direkt in Liste posten
router.post("/:id/words", createWord);

export default router;
