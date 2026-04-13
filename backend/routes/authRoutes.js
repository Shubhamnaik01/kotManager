import express from "express";
import {
  registerRestaurant,
  registerUser,
  userLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/registerRestaurant", registerRestaurant);
router.post("/register", registerUser);
router.post("/login", userLogin);

export default router;
