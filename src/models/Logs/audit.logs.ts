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
      required: false,
    },
    query: {
      type: String,
      required: false,
    },
    payload: {
      type: String,
      required: false,
    },
    response: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const AuditLog = model("AuditLog", AuditLogSchema);
