import express from "express";
import {
  createNewOrder,
  getAllOrders,
} from "../controllers/orderController.js";
import { isCounter } from "../middelware/role.middelware.js";

const router = express.Router();

router.post("/create", isCounter, createNewOrder);
router.get("/all", getAllOrders);

export default router;
