import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    orderStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
      required: true,
    },
    qty: {
      type: Number,
      min: [1, "The order should have atleast one quantity"],
      required: true,
    },
    res_id: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "Restaurant",
      required: [true, "Valid Restaurant is required"],
    },
    cuisine: { type: String, required: true },
    foodType: { type: String, enum: ["veg", "non-veg"], required: true },
  },
  { timestamps: true },
);

const orderModel = mongoose.model("Orders", orderSchema);

export default orderModel;
