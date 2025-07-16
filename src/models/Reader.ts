import { Schema, model, Types } from 'mongoose';

const ReaderSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null }
});

export const Reader = model('Reader', ReaderSchema);
