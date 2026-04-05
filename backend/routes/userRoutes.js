import express from "express";
import { changeRole, deleteUser } from "../controllers/userController.js";
import { isAdmin } from "../middelware/role.middelware.js";

const router = new express.Router();

router.put("/updateRole/:id", isAdmin, changeRole);
router.delete("/delete/:id", isAdmin, deleteUser);

export default router;
