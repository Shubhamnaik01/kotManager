import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import api from "../lib/axiosBase";
import notification from "../lib/toastNotify";
import { currentTabStore } from "../store/useNavigationStore";

const CreateStaff = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("kitchen");
  const { selectManageUsers, selectCreateStaff, isCreateStaff } =
    currentTabStore();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      if (result.status == 201) {
        selectManageUsers();
        notification(result.data.message, "success");
        navigate("/manageUser", { replace: true });
      }
    } catch (error) {
      if (error.response?.data?.message) {
        notification(error.response.data.message, "error");
      } else if (error.request) {
        console.log(error.message);
        notification("Server not reacheable or Internal server error", "error");
      } else {
        console.log("Error in code:", error.message);
      }
    }
  };

  useEffect(() => {
    selectCreateStaff();
  }, []);
  return (
    <>
      <Nav />
      <div className="h-dvh  flex justify-center items-center font-lexend">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-4 bg-orange-300 flex flex-col justify-center items-center gap-2 rounded-md"
        >
          <h2 className="text-white text-2xl font-bold">Create New Staff</h2>

          <input
            type="text"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-md p-2 bg-white rounded-md"
          />
          <input
            type="text"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-md p-2 bg-white rounded-md"
          />
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full max-w-md p-2 bg-white rounded-md"
          />
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full max-w-md p-2 bg-white rounded-md"
          >
            <option value="kitchen">Kitchen</option>
            <option value="counter">Counter</option>
            <option value="admin">Admin</option>
          </select>
          <button className="p-2 bg-white rounded-md">Create</button>
          <button
            type="button"
            className="p-2 bg-white rounded-md"
            onClick={() => navigate("/manageUser")}
          >
            Manage Users
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateStaff;
