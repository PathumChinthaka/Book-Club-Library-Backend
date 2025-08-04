import express from "express";
import { getUserById, updateUserById } from "../controllers/user.controller";

const router = express.Router();

router.get("/:id", getUserById);
router.put("/:id", updateUserById);

export default router;
