import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    foodType: { type: String, enum: ["veg", "non-veg"], required: true },
    cuisine: { type: String, required: true },
    price: {
      half: { type: Number },
      full: { type: Number, required: true },
    },
  },
  { timestamps: true },
);

const itemsModel = mongoose.model("Items", itemsSchema);

export default itemsModel;
