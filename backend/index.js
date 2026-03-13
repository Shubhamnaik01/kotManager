import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import { authCheck } from "./middelware/auth.middelware.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/items", authCheck, itemRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server running on port :", port);
  });
});
