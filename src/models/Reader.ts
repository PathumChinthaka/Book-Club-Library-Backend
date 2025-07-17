import { Schema, model, Types } from 'mongoose';

const ReaderSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: null }
});

export const Reader = model('Reader', ReaderSchema);
