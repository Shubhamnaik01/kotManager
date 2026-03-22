import React from "react";
import { useState } from "react";

const Order = (props) => {
  const [status, setStatus] = useState(props.status);
  return (
    <div className="w-full max-w-sm bg-[#ececeb] shadow-lg p-5 flex flex-col justify-center items-center rounded-md text-xl gap-1">
      <h2 className="font-bold text-2xl">{props.itemName}</h2>
      <div className="w-full max-w-sm flex justify-around">
        <h4
          className={`font-bold ${
            props.foodType?.toLowerCase() == "veg"
              ? "text-green-500"
              : "text-red-600"
          }`}
        >
          {props.foodType}
        </h4>
        <h4>{props.cuisine}</h4>
      </div>
      <p>Qty : {props.qty}</p>
      <p>Status : {props.status}</p>
    </div>
  );
};

export default Order;
