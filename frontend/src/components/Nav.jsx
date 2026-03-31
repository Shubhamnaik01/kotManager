import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import notification from "../lib/toastNotify";

const Nav = (props) => {
  const { logout } = useAuthStore();

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/", { replace: true });
    notification("Logged Out", "success");
  };
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
            onClick={() => {
              navigate("/createItem");
            }}
            className={!props.isItem ? "text-orange-400 underline" : ""}
          >
            Create Item
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="p-2 bg-amber-400 text-white rounded-md hover:bg-orange-400"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Nav;
