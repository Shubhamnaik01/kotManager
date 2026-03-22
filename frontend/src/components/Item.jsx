import React, { useEffect, useState } from "react";

const Item = (props) => {
  const [qty, setQty] = useState(0);

  const handleOrderClick = () => {
    const currentData = {
      itemName: props.itemName,
      qty: qty,
      cuisine: props.cuisine,
      foodType: props.foodType,
    };

    props.createOrder(currentData);
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
      <h2 className="font-bold text-2xl">{props.itemName}</h2>
      <div className="w-full max-w-sm flex justify-around">
        <h4>{props.foodType}</h4>
        <h4>{props.cuisine}</h4>
      </div>
      <p>
        Price - Half : {props.price.half} | Full : {props.price.full}
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
      <button
        onClick={() => handleOrderClick()}
        className="bg-orange-400 hover:bg-amber-500 p-2 rounded-sm active:scale-90 transition-all"
      >
        Order
      </button>
    </div>
  );
};

export default Item;
