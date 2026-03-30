import Home from "./Home";
import Login from "../pages/Login";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import Register from "../pages/Register";
import AddItem from "../pages/AddItem";
import { useEffect, useState } from "react";
function App() {
  const [socket, setSocket] = useState(null);

  const params = new URLSearchParams(window.location.search);
  const urlRole = params.get("role") || "counter";

  if (urlRole) {
    localStorage.setItem("role", urlRole);
  }
  const myRole = localStorage.getItem("role");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:2000");
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          role: myRole,
          name: `User-${myRole}`,
        }),
      );
      setSocket(ws);
      console.log(myRole + " Connected");
    };

    return () => ws.close();
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createItem" element={<AddItem />} />
        <Route path="/home" element={<Home socket={socket} role={myRole} />} />
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
