import express from "express";
require("dotenv").config();
import { connectDB } from "./config/mongodb.config";

const app = express();

app.use(express.json());

app.get("/", (_, res) => res.send("Book Club API Running!"));

connectDB().then(() => {
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT}`);
  });
});
