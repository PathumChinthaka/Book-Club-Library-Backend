import { Schema, model } from "mongoose";
import { UserRole } from "../types/enum/userRole.enum";
import { ActiveStatus } from "../types/enum/activeStatusEnum";

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, default: null },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.Reader,
  },
  address: { type: String, default: null },
  profilePictureUrl: { type: String, default: null },
  activeStatus: {
    type: Number,
    enum: Object.values(ActiveStatus).filter((v) => typeof v === "number"),
    default: ActiveStatus.Active,
  },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: null },
});

export const User = model("User", UserSchema);
