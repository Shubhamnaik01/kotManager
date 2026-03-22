import express from "express";
import {
  createNewOrder,
  deleteOrder,
  getAllOrders,
  updateOrder,
  updateStatusOnly,
} from "../controllers/orderController.js";
import { isCounter, isKitchen } from "../middelware/role.middelware.js";

const router = express.Router();

router.post("/create", isCounter, createNewOrder);
router.post("/update/:id", isCounter, updateOrder);
router.get("/all", getAllOrders);
router.delete("/delete/:id", deleteOrder);
router.post("/updateStatus/:id", isKitchen, updateStatusOnly);

export default router;
