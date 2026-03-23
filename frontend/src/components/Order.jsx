import React from "react";
import { useState } from "react";
import api from "../lib/axiosBase";
import notification from "../lib/toastNotify";

const Order = (props) => {
  const [status, setStatus] = useState(props.status);
  const [editState, setEditState] = useState(false);
  const [itemName, setItemName] = useState(props.itemName);
  const [foodType, setFoodType] = useState(props.foodType);
  const [cuisine, setCuisine] = useState(props.cuisine);
  const [qty, setQty] = useState(props.qty);

  return (
    <div className="w-full max-w-sm bg-[#ececeb] shadow-lg p-5 flex flex-col justify-center items-center rounded-md text-xl gap-1">
      {editState ? (
        <input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="p-2 bg-amber-50"
        />
      ) : (
        <h2 className="font-bold text-2xl">{props.itemName}</h2>
      )}
      <div className="w-full max-w-sm flex justify-around">
        {editState ? (
          <input
            value={foodType}
            onChange={(e) => {
              setFoodType(e.target.value);
            }}
            className="p-2 bg-amber-50 w-full max-w-32"
          />
        ) : (
          <h4
            className={`font-bold ${
              props.foodType?.toLowerCase() == "veg"
                ? "text-green-500"
                : "text-red-600"
            }`}
          >
            {props.foodType}
          </h4>
        )}
        {editState ? (
          <input
            value={cuisine}
            onChange={(e) => {
              setCuisine(e.target.value);
            }}
            className="p-2 bg-amber-50 w-full max-w-32"
          />
        ) : (
          <h4>{props.cuisine}</h4>
        )}
      </div>
      {editState ? (
        <input
          value={qty}
          onChange={(e) => {
            // if (!isNaN(e.target.value)) {
            setQty(e.target.value);
            // }
          }}
          className="p-2 bg-amber-50 w-full max-w-10"
        />
      ) : (
        <p>Qty : {props.qty}</p>
      )}
      <select
        name="status"
        className="w-full max-w-34 p-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <div className="flex w-full max-w-xl justify-evenly">
        {editState ? (
          <button
            type="button"
            onClick={() => {
              if (isNaN(qty)) {
                return notification("Quantity should be a number", "error");
              }
              props.updateOrder({
                _id: props._id,
                itemName,
                cuisine,
                foodType,
                orderStatus: status,
                qty,
              });
              setEditState(false);
            }}
            className="bg-orange-400 p-2 rounded-md hover:bg-orange-500 active:scale-90 transition-all"
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              props.deleteOrder(props._id);
            }}
            className="bg-orange-400 p-2 rounded-md hover:bg-orange-500 active:scale-90 transition-all"
          >
            Delete
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setEditState(!editState);
          }}
          className="bg-orange-400 p-2 rounded-md hover:bg-orange-500 active:scale-90 transition-all"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Order;
