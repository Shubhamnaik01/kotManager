import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    foodType: { type: String, enum: ["veg", "non-veg"], required: true },
    cuisine: { type: String, required: true },
    res_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "Valid Restaurant id is required"],
    },
    price: {
      half: { type: Number, min: [1, "Price cannot be 0 or negative"] },
      full: {
        type: Number,
        required: [true, "Full price is mandatory"],
        min: [1, "Price cannot be 0 or negative"],
      },
    },
  },
  { timestamps: true },
);

const itemsModel = mongoose.model("Items", itemsSchema);

export default itemsModel;
