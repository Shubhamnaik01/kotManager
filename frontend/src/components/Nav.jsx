import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = (props) => {

  const navigate = useNavigate();
  return (
    <div className="w-full min-h-15 bg-[#121212]  text-zinc-400 font-lexend font-bold flex justify-center items-center">
      <nav className="w-full flex justify-between items-center mx-8">
        <h2 className="text-2xl font-logo text-orange-400">KOT</h2>
        <ul className="w-full max-w-60 flex justify-around text-md">
          <li
            onClick={() => props.selectItems()}
            className={props.isItem ? "text-orange-400 underline" : ""}
          >
            Items
          </li>
          <li
            onClick={() => props.selectOrders()}
            className={!props.isItem ? "text-orange-400 underline" : ""}
          >
            Orders
          </li>
          <li
           onClick={()=>{navigate("/createItem")}}
            className={!props.isItem ? "text-orange-400 underline" : ""}
          >
            Create Item
          </li>

        </ul>
      </nav>
    </div>
  );
};

export default Nav;
