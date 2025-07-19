import { Request, Response, NextFunction } from "express";
import { uploadFileToSupabase } from "../service/file/file.upload.service";

export const uploadHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const url = await uploadFileToSupabase(req.file);
    return res.status(200).json({ url });
  } catch (error) {
    next(error);
  }
};
