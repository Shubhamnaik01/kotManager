import Home from "./Home";
import Login from "../pages/Login";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import Register from "../pages/Register";
import AddItem from "../pages/AddItem";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import ManageUser from "../pages/ManageUser";
import CreateStaff from "../pages/CreateStaff";
import AdminProtectedRoute from "./AdminProtectedRoute";
import CounterProtectedRoute from "./CounterProtectedRoute";
function App() {
  const [socket, setSocket] = useState(null);
  const { role } = useAuthStore();
  const navigate = useNavigate();
  // const params = new URLSearchParams(window.location.search);
  // const urlRole = params.get("role") || "counter";

  // if (urlRole) {
  //   localStorage.setItem("role", urlRole);
  // }

  useEffect(() => {
    if (!role) {
      return;
    }

    // if (role == "admin") {
    //   navigate("/manageUser");
    // }

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
          token: localStorage.getItem("token"),
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
        <Route
          path="/"
          element={
            role ? (
              role == "admin" ? (
                <Navigate to="/manageUser" />
              ) : (
                <Navigate to="/home" />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/register"
          element={
            role ? (
              role == "admin" ? (
                <Navigate to="/manageUser" />
              ) : (
                <Navigate to="/home" />
              )
            ) : (
              <Register />
            )
          }
        />
        <Route
          path="/manageUser"
          element={
            <AdminProtectedRoute>
              <ManageUser />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/createStaff"
          element={
            <AdminProtectedRoute>
              <CreateStaff />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/createItem"
          element={
            <CounterProtectedRoute>
              <AddItem />
            </CounterProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            role ? (
              role == "admin" ? (
                <Navigate to="/manageUser" />
              ) : (
                <Home socket={socket} />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />
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

// return (
//     <div>
//       <Routes>
//         <Route path="/" element={role ? <Navigate to="/home" /> : <Login />} />
//         <Route
//           path="/register"
//           element={role ? <Navigate to="/home" /> : <Register />}
//         />
//         <Route
//           path="/manageUser"
//           element={!role ? <Login /> : <ManageUser />}
//         />
//         <Route
//           path="/createStaff"
//           element={!role ? <Login /> : <CreateStaff />}
//         />
//         <Route
//           path="/createItem"
//           element={!role ? <Navigate to="/" replace={true} /> : <AddItem />}
//         />
//         <Route
//           path="/home"
//           element={
//             !role ? (
//               <Navigate to="/" replace={true} />
//             ) : (
//               <Home socket={socket} />
//             )
//           }
//         />
//       </Routes>
//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//         transition={Flip}
//       />
//     </div>
//   );
// Commented to test recreate the bug later
