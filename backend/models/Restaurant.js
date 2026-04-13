import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      required: [true, "Restaurant name is mandatory"],
      trim: true,
    },
    role: { type: String, default: "admin" },
    businessEmail: {
      type: String,
      required: [true, "Business email name is mandatory"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: [true, "Please enter a password"] },
  },
  { timestamps: true },
);

const restaurantModel = mongoose.model("Restaurant", restaurantSchema);

export default restaurantModel;
