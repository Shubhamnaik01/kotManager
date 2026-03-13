import express from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  updateItem,
} from "../controllers/itemController.js";
import { isCounter } from "../middelware/role.middelware.js";

const router = express.Router();

router.post("/add", isCounter, createItem);
router.put("/update/:id", isCounter, updateItem);
router.get("/all", getAllItems);
router.delete("/remove/:id", isCounter, deleteItem);

export default router;
