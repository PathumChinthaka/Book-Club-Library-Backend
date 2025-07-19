import express from "express";
import {
  createReader,
  getAllReaders,
  updateReader,
  deleteReader,
} from "../controllers/reader.controller";

const router = express.Router();

router.post("/", createReader);       
router.get("/", getAllReaders);       
router.put("/:id", updateReader);     
router.delete("/:id", deleteReader);  

export default router;
