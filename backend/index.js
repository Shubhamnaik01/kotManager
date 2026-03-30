import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { authCheck } from "./middelware/auth.middelware.js";
import { WebSocketServer } from "ws";
import cors from "cors";
import Order from "./models/Orders.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
let wss;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use((req, res, next) => {
  req.wss = wss;
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/items", authCheck, itemRoutes);
app.use("/api/orders", authCheck, orderRoutes);

connectDB().then(() => {
  const server = app.listen(port, () => {
    console.log("Server running on port :", port);
  });

  wss = new WebSocketServer({ server }); // Attaching websocket server to the http server

  wss.on("connection", (ws) => {
    console.log("Client connected"); // every ws object represents individual client connection stored in Set named clients in wss object
    ws.id = Math.random().toString(36).substr(2, 9);
    ws.on("message", async (message) => {
      console.log("Message sent from the client :", message.toString());
      const data = JSON.parse(message.toString());

      // if (data.type == "update") {
      //   const updatedOrder = await Order.findByIdAndUpdate(
      //     data.id,
      //     { $set: { orderStatus: "completed" } },
      //     { new: true },
      //   );
      //   wss.clients.forEach((client) => {
      //     if (client.role == "counter" && client.readyState == 1) {
      //       client.send(JSON.stringify(updatedOrder));
      //     }
      //   });
      // }
      if (data.role) {
        ws.role = data.role;
        ws.name = data.name;
        console.log(`Socket ${ws.id} is now identified as: ${ws.role}`);
        if (ws.role == "kitchen" && ws.readyState == 1) {
          const existingData = await Order.find({ orderStatus: "pending" });
          // const existingOrder = JSON.stringify(existingData);
          ws.send(JSON.stringify({ type: "Initial", payload: existingData }));
        }
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
      console.log(`Socket ${ws.id} (${ws.role || "unknown"}) DISCONNECTED`);
    });
  });
});
