import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import notification from "../lib/toastNotify";
import { currentTabStore } from "../store/useNavigationStore";

const Nav = (props) => {
  const { logout, role } = useAuthStore();
  const {
    isItem,
    isOrder,
    isAddItem,
    isManageUsers,
    isCreateStaff,
    selectAddItem,
    selectItems,
    selectOrders,
    selectManageUsers,
    selectCreateStaff,
    resetTabs,
  } = currentTabStore();

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    resetTabs();
    navigate("/", { replace: true });
    notification("Logged Out", "success");
  };
  return (
    <div className="w-full min-h-15 bg-[#121212]  text-zinc-400 font-lexend font-bold flex justify-center items-center">
      <nav className="w-full flex justify-between items-center mx-8">
        <h2 className="text-2xl font-logo text-orange-400">KOT</h2>
        <ul className="w-full max-w-60 flex justify-around text-md">
          {role != "admin" && (
            <li
              onClick={() => {
                selectItems();
                navigate("/home");
              }}
              className={isItem ? "text-orange-400 underline" : ""}
            >
              Items
            </li>
          )}
          {role != "admin" && (
            <li
              onClick={() => {
                selectOrders();
                navigate("/home");
              }}
              className={isOrder ? "text-orange-400 underline" : ""}
            >
              Orders
            </li>
          )}
          {role == "counter" && (
            <li
              onClick={() => {
                selectAddItem();
                navigate("/createItem");
              }}
              className={isAddItem ? "text-orange-400 underline" : ""}
            >
              Create Item
            </li>
          )}
          {role == "admin" && (
            <li
              onClick={() => {
                selectManageUsers();
                navigate("/manageUser");
              }}
              className={isManageUsers ? "text-orange-400 underline" : ""}
            >
              Manage Users
            </li>
          )}
          {role == "admin" && (
            <li
              onClick={() => {
                // selectCreateStaff();
                navigate("/createStaff");
              }}
              className={isCreateStaff ? "text-orange-400 underline" : ""}
            >
              Create Staff
            </li>
          )}
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
