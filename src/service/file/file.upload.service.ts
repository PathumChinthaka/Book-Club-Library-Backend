import dotenv from 'dotenv' 
dotenv.config()
import { supabase } from "../../util/supabase/supabase.client";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const BUCKET_NAME = process.env.STORAGE_BUCKET_NAME || 'STORAGE_BUCKET_NAME'; 

export const uploadFileToSupabase = async (file: Express.Multer.File): Promise<string> => {
  const fileExt = path.extname(file.originalname);
  const fileName = `${uuidv4()}${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (error) {
    throw new Error(`File upload failed: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
  return publicUrlData.publicUrl;
};
