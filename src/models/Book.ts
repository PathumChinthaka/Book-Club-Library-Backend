import { Schema, model, Types } from "mongoose";

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  publisher: { type: String },
  publicationYear: { type: Number },
  copiesTotal: { type: Number, required: true },
  copiesAvailable: { type: Number, required: true },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: null },
});

export const Book = model("Book", BookSchema);
