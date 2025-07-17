import { Schema, model } from "mongoose";
import { UserRole } from "../types/enum/userRole.enum";

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.LIBRARIAN,
    },
  },
  { timestamps: true }
);

export const User = model("User", UserSchema);
