import React from "react";

const Nav = () => {
  return (
    <div className="w-full min-h-15 bg-[#121212]  text-zinc-400 font-lexend font-bold flex justify-center items-center">
      <nav className="w-full flex justify-between items-center mx-8">
        <h2 className="text-2xl font-logo text-orange-400">KOT</h2>
        <ul className="w-full max-w-60 flex justify-around text-md">
          <li className="">Items</li>
          <li>Orders</li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
