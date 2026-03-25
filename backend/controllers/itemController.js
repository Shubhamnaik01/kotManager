import Items from "../models/Items.js";

export const createItem = async (req, res) => {
  try {
    const { itemName, price, cuisine, foodType } = req.body;
    const lowerCaseFoodType = foodType.toLowerCase();
    const sameItem = await Items.findOne({
      itemName,
      cuisine,
      foodType: lowerCaseFoodType,
    });
    if (sameItem) {
      return res.status(409).json({ message: "The Item already exist" });
    }
    const result = await Items.create({
      itemName,
      price,
      cuisine,
      foodType: lowerCaseFoodType,
    });
    console.log(result);
    res.status(201).json({ message: "Item added", data: result });
  } catch (error) {
    if (error.name == "ValidationError") {
      const msg = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: msg[0] });
    }
    console.log("Error in server while creating item", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateItem = async (req, res) => {
  try {
    const updates = req.body;
    const item_id = req.params.id;
    const finalUpdate = { ...updates };

    if (updates.price) {
      if (updates.price.half) finalUpdate["price.half"] = updates.price.half;
      if (updates.price.full) finalUpdate["price.full"] = updates.price.full;
      delete finalUpdate.price;
    }

    const result = await Items.findByIdAndUpdate(
      item_id,
      { $set: finalUpdate },
      { new: true },
    );

    if (!result) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(201).json({ message: "Update Successfull", data: result });
  } catch (error) {
    console.log("Error in server while updating notes", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Items.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Item not found" });
    }
    res
      .status(200)
      .json({ message: "The item is Deleted", deletedItem: result });
  } catch (error) {
    console.log("Error in server while deleting note", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const result = await Items.find();
    return res
      .status(200)
      .json({ message: "Get all items successfull", data: result });
  } catch (error) {
    console.log("Error while getting all the items", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
