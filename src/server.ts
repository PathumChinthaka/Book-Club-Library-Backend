import express from "express";
require("dotenv").config();
import { connectDB } from "./config/mongodb.config";
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true, 
}));

connectDB().then(() => {
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
  });
});
