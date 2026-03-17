import Order from "../models/Orders.js";

export const createNewOrder = async (req, res) => {
  try {
    const { foodType } = req.body;
    const lowerCaseFoodType = foodType.toLowerCase();
    const result = await Order.create({
      ...req.body,
      foodType: lowerCaseFoodType,
    });
    req.wss.clients.forEach((client) => {
      if (client.role == "kitchen" && client.readyState == 1) {
        client.send(JSON.stringify({ type: "NewOrder", payload: result }));
      }
    });
    res.status(201).json({ message: "Order created", createdOrder: result });
  } catch (error) {
    console.log("Error while creating the order in server", error.message);

    if (error.name == "ValidationError") {
      const msg = Object.values(error.errors).map((err) => err.message);
      return res
        .status(400)
        .json({ message: "Validation error", message: msg });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ message: "All notes fetched", data: orders });
  } catch (error) {
    console.log("Error while getting all orders in server", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
