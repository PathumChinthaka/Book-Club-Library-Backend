import { Schema, model } from "mongoose";
import { UserRole } from "../types/enum/userRole.enum";

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.LIBRARIAN,
  },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: null },
});

export const User = model("User", UserSchema);
