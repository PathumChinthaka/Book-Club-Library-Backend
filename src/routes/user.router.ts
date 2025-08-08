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
router.post("/:id/profile-picture:upload", upload.single("file"), uploadProfilePicture);

export default router;
