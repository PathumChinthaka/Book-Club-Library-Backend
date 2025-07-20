import express from "express";
import {
  logoutUser,
  registerUser,
  refreshToken,
  userLogin,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);
router.get("/refresh-token", refreshToken);
router.post("/logout", logoutUser);

export default router;
