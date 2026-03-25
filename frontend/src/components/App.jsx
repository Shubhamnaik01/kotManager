import Home from "./Home";
import Login from "../pages/Login";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import Register from "../pages/Register";
import AddItem from "../pages/AddItem"
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createItem" element={<AddItem />} />
        <Route path="/home" element={<Home />} />
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
