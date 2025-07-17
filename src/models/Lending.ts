import { Schema, model, Types } from 'mongoose';

const LendingSchema = new Schema({
  readerId: { type: Types.ObjectId, ref: 'Reader', required: true },
  bookId: { type: Types.ObjectId, ref: 'Book', required: true },
  borrowedAt: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnedDate: { type: Date, default: null }
});

export const Lending = model('Lending', LendingSchema);
