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
        .json({ message: "Validation error", message: msg[0] });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order_id = req.params.id;
    const lowerCaseFoodType = req.body.foodType.toLowerCase();
    const result = await Order.findByIdAndUpdate(
      order_id,
      { $set: { ...req.body, foodType: lowerCaseFoodType } },
      { new: true, runValidators: true },
    );
    if (!result) {
      return res.status(404).json({ message: "Order does not exisit" });
    }
    res.status(200).json({ message: "Update Successfull", payload: result });
  } catch (error) {
    if (error.name == "ValidationError") {
      const msg = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: msg[0] });
    }
    console.log(error.message);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order_id = req.params.id;
    const result = await Order.findByIdAndDelete(order_id);
    if (!result) {
      return res.status(400).json({ message: "Order does not exist" });
    }
    return res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const updateStatusOnly = async (req, res) => {
  try {
    const order_id = req.params.id;
    const { orderStatus } = req.body;
    const result = await Order.findByIdAndUpdate(
      order_id,
      { $set: { orderStatus } },
      { new: true, runValidators: true },
    );

    if (!result) {
      return res.status(404).json({ message: "Order does not exist" });
    }
    res.status(200).json({ message: "Order Status updated", payload: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server Error" });
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
