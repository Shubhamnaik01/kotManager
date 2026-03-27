import React from "react";
import { useState } from "react";
import api from "../lib/axiosBase";
import notification from "../lib/toastNotify";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const [itemName, setItemName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [foodType, setFoodType] = useState("");
  const [price, setPrice] = useState({});

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalPrice = {};

      if (price.hasOwnProperty("half")) {
        console.log(33);
        if (price.half == "") {
          delete price.half;
        } else if (isNaN(price.half)) {
          return notification("Price can only be a number", "error");
        }
      }
      if (price.hasOwnProperty("full")) {
        if (price.full == "") {
          delete price.full;
        } else if (isNaN(price.full)) {
          return notification("Price can only be a number", "error");
        }
      }
      if (price.half && price.half != "") {
        finalPrice.half = price.half;
      }
      if (price.full && price.full != "") {
        finalPrice.full = price.full;
      }

      console.log(price);
      const result = await api.post("/items/add", {
        itemName,
        cuisine,
        foodType,
        price: finalPrice,
      });
      if (result.status == 201) {
        notification(result.data.message, "success");
        // setPrice({});
      }
    } catch (error) {
      if (error.response?.data?.message) {
        notification(error.response.data.message, "error");
      } else if (error.request) {
        notification("Server not reachable or Internal Server error", "error");
      } else {
        console.log("Error in code ", error.message);
      }
    }
  };
  return (
    <div className="h-dvh  flex justify-center items-center font-lexend">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-4 bg-orange-300 flex flex-col justify-center items-center gap-2 rounded-md"
      >
        <h2 className="text-white text-2xl font-bold">Create New Item</h2>
        <input
          type="text"
          placeholder="Enter Item name"
          onChange={(e) => setItemName(e.target.value)}
          className="w-full max-w-md p-2 bg-white rounded-md"
        />
        <input
          type="text"
          placeholder="Enter Cuisine"
          onChange={(e) => setCuisine(e.target.value)}
          className="w-full max-w-md p-2 bg-white rounded-md"
        />
        <input
          type="text"
          placeholder="Enter Food type Veg or Non-Veg"
          onChange={(e) => setFoodType(e.target.value)}
          className="w-full max-w-md p-2 bg-white rounded-md"
        />
        <div className="flex justify-evenly items-center gap-2">
          <input
            type="text"
            placeholder="Enter price for half"
            onChange={(e) => setPrice({ ...price, half: e.target.value })}
            className="w-full max-w-sm p-2 bg-white rounded-md"
          />
          <input
            type="text"
            placeholder="Enter price for full"
            onChange={(e) => setPrice({ ...price, full: e.target.value })}
            className="w-full max-w-sm p-2 bg-white rounded-md"
          />
        </div>
        <button className="p-2 bg-white rounded-md">Create</button>
        <button
          type="button"
          className="p-2 bg-white rounded-md"
          onClick={() => navigate("/home")}
        >
          Back to Items
        </button>
      </form>
    </div>
  );
};

export default AddItem;
