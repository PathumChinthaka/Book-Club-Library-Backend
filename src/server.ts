require("dotenv").config();
import express from "express";
import { connectDB } from "./config/mongodb.config";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoute from './routes/auth.route'
import { authenticateToken } from './middleware/auth.middleware';
import rootRouter from './routes/root.router'
import { errorHandler } from "./middleware/error.handler.middleware";
import { auditLogHandler } from "./middleware/audit.log.middleware";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}));

app.use(express.json());
app.use(cookieParser());

// Handle Audit Log
app.use(auditLogHandler);

// Authentication Route
app.use("/api/v1/auth", authRoute);

//Auth middleware
app.use(authenticateToken);

// Root router
app.use("/api/v1", rootRouter);

// Error handler middleware
app.use(errorHandler);

connectDB().then(() => {
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
  });
});
