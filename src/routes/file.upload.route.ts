import { Router } from "express";
import { upload } from "../middleware/multer.middleware";
import { uploadHandler } from "../controllers/file.upload.controller";

const router = Router();

router.post("/upload", upload.single("file"), uploadHandler);

export default router;
