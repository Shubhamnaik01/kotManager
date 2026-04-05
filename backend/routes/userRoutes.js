import express from "express";
import {
  changeRole,
  deleteUser,
  getAllUsers,
} from "../controllers/userController.js";
import { isAdmin } from "../middelware/role.middelware.js";

const router = new express.Router();

router.put("/updateRole/:id", isAdmin, changeRole);
router.delete("/delete/:id", isAdmin, deleteUser);
router.get("/all", isAdmin, getAllUsers);

export default router;
