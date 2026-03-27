import React, { useEffect, useState } from "react";
import api from "../lib/axiosBase";
import notification from "../lib/toastNotify";

const Item = (props) => {
  const [editStatus, setEditStatus] = useState(false);
  const [itemName, setItemName] = useState(props.itemName);
  const [foodType, setFoodType] = useState(props.foodType);
  const [cuisine, setCuisine] = useState(props.cuisine);
  const [price, setPrice] = useState({
    half: props.price.half || "",
    full: props.price.full || "",
  });
  const [qty, setQty] = useState(0);

  const handleOrderClick = () => {
    const currentData = {
      itemName: itemName,
      qty: qty,
      cuisine: cuisine,
      foodType: foodType,
    };

    props.createOrder(currentData);
  };

  const handleUpdate = async () => {
    try {
      const finalUpdate = {
        itemName,
        cuisine,
        foodType: foodType.toLowerCase(),
        price,
      };
      if (price.hasOwnProperty("full")) {
        if (price.full == "") {
          delete price.full;
        } else if (isNaN(price.full)) {
          return notification("Please enter a valid number", "error");
        }
      }
      if (price.hasOwnProperty("half")) {
        if (price.half == "") {
          delete price.half;
        } else if (isNaN(price.half)) {
          return notification("Please enter a valid number", "error");
        }
      }
      if (price.half && !isNaN(price.half)) {
        finalUpdate.price.half = price.half;
      }
      if (price.full && !isNaN(price.full)) {
        finalUpdate.price.full = price.full;
      }

      const result = await api.put("/items/update/" + props._id, finalUpdate);
      if (result.status == "200") {
        props.updateItemParent(result.data.payload);
        notification(result.data.message, "success");
        setEditStatus(false);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        notification(error.response.data.message, "error");
      } else if (error.request) {
        notification("Server not reachable or Internal server error", "error");
      } else {
        console.log("Error in code", error.message);
      }
    }
  };

  const handleDelete = async () => {
    try {
      const result = await api.delete("/items/remove/" + props._id);
      if (result.status == 200) {
        notification(result.data.message, "success");
        props.deleteItem(props._id);
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

  const increaseQty = () => {
    setQty((prev) => {
      return prev + 1;
    });
  };
  const decreaseQty = () => {
    setQty((prev) => {
      return prev - 1;
    });
  };

  return (
    <div className="w-full max-w-sm bg-[#ececeb] shadow-lg p-5 flex flex-col justify-center items-center rounded-md text-xl gap-1">
      {editStatus ? (
        <input
          className="w-full max-w-sm p-2 bg-white"
          value={itemName}
          onChange={(e) => {
            setItemName(e.target.value);
          }}
        />
      ) : (
        <h2 className="font-bold text-2xl">{props.itemName}</h2>
      )}
      <div className="w-full max-w-sm flex justify-around">
        {editStatus ? (
          <input
            className="w-full max-w-sm p-2 bg-white"
            value={foodType}
            onChange={(e) => {
              setFoodType(e.target.value);
            }}
          />
        ) : (
          <h4>{props.foodType}</h4>
        )}
        {editStatus ? (
          <input
            className="w-full max-w-sm p-2 bg-white"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          />
        ) : (
          <h4>{props.cuisine}</h4>
        )}
      </div>
      <p>
        Price - Half :{" "}
        {editStatus ? (
          <input
            className="w-full max-w-10 p-2 bg-white"
            value={price.half}
            onChange={(e) => {
              setPrice({ ...price, half: e.target.value });
            }}
          />
        ) : (
          props.price.half
        )}{" "}
        | Full :{" "}
        {editStatus ? (
          <input
            className="w-full max-w-10 p-2 bg-white"
            value={price.full}
            onChange={(e) => setPrice({ ...price, full: e.target.value })}
          />
        ) : (
          props.price.full
        )}
      </p>
      <p>Qty : {qty}</p>
      <div className="flex justify-center items-center gap-2">
        <button
          className="w-8 h-8 justify-center items-center bg-zinc-400 hover:bg-zinc-500 rounded-full active:scale-90 transition-all"
          onClick={() => {
            increaseQty();
          }}
        >
          +
        </button>
        <button
          className="w-8 h-8 flex justify-center items-center bg-zinc-400 rounded-full hover:bg-zinc-500 active:scale-90 transition-all"
          onClick={() => {
            decreaseQty();
          }}
        >
          -
        </button>
      </div>
      <div className="w-full max-w-sm flex justify-around items-center">
        {editStatus ? (
          <button
            className="bg-orange-400 text-white hover:bg-amber-500 p-2 rounded-sm active:scale-90 transition-all"
            onClick={() => {
              handleUpdate();
            }}
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => handleOrderClick()}
            className="bg-orange-400 text-white  hover:bg-amber-500 p-2 rounded-sm active:scale-90 transition-all"
          >
            Order
          </button>
        )}
        <button
          onClick={() => setEditStatus(!editStatus)}
          className="bg-orange-400 text-white hover:bg-amber-500 p-2 rounded-sm active:scale-90 transition-all"
        >
          Edit
        </button>
      </div>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white hover:bg-amber-500 p-2 rounded-sm active:scale-90 transition-all"
      >
        Delete
      </button>
    </div>
  );
};

export default Item;
