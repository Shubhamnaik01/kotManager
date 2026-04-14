import express from "express";
import {
  loginRestaurant,
  registerRestaurant,
  registerStaff,
  userLogin,
} from "../controllers/authController.js";
import { isAdmin } from "../middelware/role.middelware.js";
import { authCheck } from "../middelware/auth.middelware.js";

const router = express.Router();

router.post("/registerRestaurant", registerRestaurant);
router.post("/loginRestaurant", loginRestaurant);
router.post("/register", authCheck, isAdmin, registerStaff);
router.post("/login", userLogin);

export default router;
