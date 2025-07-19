import express from "express";
import { login, register, refresh, logout } from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/refresh:token", refresh);
router.post("/logout", logout);

export default router;
