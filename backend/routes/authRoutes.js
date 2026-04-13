import express from "express";
import {
  loginRestaurant,
  registerRestaurant,
  registerUser,
  userLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/registerRestaurant", registerRestaurant);
router.post("/loginRestaurant", loginRestaurant);
router.post("/register", registerUser);
router.post("/login", userLogin);

export default router;
