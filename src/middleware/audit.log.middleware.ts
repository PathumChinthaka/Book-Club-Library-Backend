// middleware/logAuditTrails.ts
import { Request, Response, NextFunction } from "express";
import { AuditLog } from "../models/Logs/audit.logs";

const methodMappers: Record<string, string> = {
  GET: "Fetching",
  POST: "Adding",
  PUT: "Updating",
  DELETE: "Deleting",
};

export const auditLogHandler = (req: Request, res: Response, next: NextFunction) => {
  const oldJson = res.json.bind(res);

  res.json = function (body: any): Response {
    res.on("finish", async () => {
      try {
        const activity = `${methodMappers[req.method] || req.method} ${req.originalUrl.split("/").pop() || ""}`;

        await AuditLog.create({
          url: req.originalUrl,
          method: req.method,
          activity,
          userId: (req as any)?.user?.userId || null,
          params: JSON.stringify(req.params),
          query: JSON.stringify(req.query),
          payload: JSON.stringify(req.body),
          response: JSON.stringify(body),
          timestamp: new Date(),
        });
      } catch (err) {
        console.error("Failed to log audit trail:", err);
      }
    });

    return oldJson(body);
  };

  next();
};
