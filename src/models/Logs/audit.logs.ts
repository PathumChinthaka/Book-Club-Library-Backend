import { Schema, model, Types } from "mongoose";

const AuditLogSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    activity: {
      type: String,
      required: true,
    },
    params: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
    payload: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AuditLog = model("AuditLog", AuditLogSchema);
