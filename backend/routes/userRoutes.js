import express from "express";
import { changeRole } from "../controllers/userController.js";
import { isAdmin } from "../middelware/role.middelware.js";

const router = new express.Router();

router.put("/updateRole/:id", isAdmin, changeRole);

export default router;
