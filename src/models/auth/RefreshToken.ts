import { Schema, model, Types } from "mongoose";

const RefreshTokenSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    createdOn: { type: Date, default: Date.now },
  },
);

export const RefreshToken = model("RefreshToken", RefreshTokenSchema);
