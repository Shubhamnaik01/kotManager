import React, { useState } from "react";
import api from "../lib/axiosBase";
import { Link, useNavigate } from "react-router-dom";
import notification from "../lib/toastNotify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const result = await api.post("/auth/login", { email, password });
      if (result.status == 200) {
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
        action="submit"
        className="w-full max-w-90 bg-orange-300 flex flex-col justify-around items-center gap-3 p-8 rounded-lg"
      >
        <input
          type="text"
          placeholder="email"
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
        <button className="w-20 h-8 rounded-lg bg-white" onClick={handleLogin}>
          Login
        </button>
        <p className="text-white">
          New user? please{" "}
          <Link
            to="/register"
            className="text-blue-600 font-bold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
