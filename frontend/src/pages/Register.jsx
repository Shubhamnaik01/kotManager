import React, { useState } from "react";
import api from "../lib/axiosBase";
import notification from "../lib/toastNotify";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { assignUserDetails } = useAuthStore();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await api.post("/auth/registerRestaurant", {
        restaurantName: name,
        businessEmail: email,
        password,
      });
      if (result?.status == 201) {
        assignUserDetails({
          _id: result.data.user.res_id,
          role: result.data.user.role,
          name: result.data.user.restaurantName,
        });
        localStorage.setItem("token", result.data.token);
        notification(result.data.message, "success");
        navigate("/home", { replace: true });
      }
    } catch (error) {
      if (error.response?.data?.message) {
        notification(error.response.data.message, "error");
      } else if (error.request) {
        notification("Server not reacheable or Internal server error", "error");
      } else {
        console.log("Error in code", error.message);
      }
    }
  };
  return (
    <div className="h-dvh flex justify-center items-center">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-90 bg-orange-300 flex flex-col justify-around items-center gap-3 p-8 rounded-lg"
      >
        <input
          type="text"
          placeholder="Restaurant name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="w-full max-w-2xl p-2 rounded-md bg-white"
        />
        <input
          type="text"
          placeholder="Business email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-full max-w-2xl p-2 rounded-md bg-white"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-full max-w-2xl p-2 rounded-md bg-white"
        />
        <div className="w-full flex justify-around items-center">
          <button
            className="w-20 h-8 rounded-lg bg-white"
            onClick={handleRegister}
          >
            Register
          </button>
          <button
            type="button"
            className="w-20 h-8 rounded-lg bg-white"
            onClick={() => {
              navigate("/");
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
