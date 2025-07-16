import { Schema, model, Types } from 'mongoose';

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  publisher: { type: String },
  publicationYear: { type: Number },
  copiesTotal: { type: Number, required: true },
  copiesAvailable: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null }
});

export const Book = model('Book', BookSchema);
