import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server running on port :", port);
  });
});
