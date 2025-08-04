import express from "express";
import {
  getUserById,
  updateUserById,
  uploadProfilePicture,
} from "../controllers/user.controller";
import { upload } from "../middleware/multer.middleware";

const router = express.Router();

router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.put("/:id/profile-picture", upload.single("file"), uploadProfilePicture);

export default router;
