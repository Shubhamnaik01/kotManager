import Home from "./Home";
import Login from "../pages/Login";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import Register from "../pages/Register";
import AddItem from "../pages/AddItem";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
function App() {
  const [socket, setSocket] = useState(null);
  const { userName, role } = useAuthStore();
  // const params = new URLSearchParams(window.location.search);
  // const urlRole = params.get("role") || "counter";

  // if (urlRole) {
  //   localStorage.setItem("role", urlRole);
  // }

  useEffect(() => {
    if (!role) {
      return;
    }

    const wsProtocol = window.location.protocol == "https:" ? "wss" : "ws";
    const host =
      import.meta.env.MODE == "production"
        ? window.location.host
        : "localhost:2000";
    const ws = new WebSocket(`${wsProtocol}://${host}`);
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          role: role,
          name: `User-${role}`,
        }),
      );
      setSocket(ws);
      console.log(role + " Connected");
    };

    return () => ws.close();
  }, [role]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createItem" element={<AddItem />} />
        <Route path="/home" element={<Home socket={socket} />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
    </div>
  );
}

export default App;
