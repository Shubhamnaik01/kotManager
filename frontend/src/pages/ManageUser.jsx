import React, { useEffect, useState } from "react";
import api from "../lib/axiosBase";
import notification from "../lib/toastNotify";
import TableData from "../components/TableData";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const { role } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (role != "admin") {
      notification("Access denied", "error");
      return navigate("/home");
    }
    getAllUsers();
  }, [role]);

  const getAllUsers = async () => {
    try {
      const result = await api.get("/users/all");
      if (result.status == 200) {
        setUsers(result.data.payload);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        notification(error.response.data.message, "error");
      } else if (error.request) {
        notification("Server not reacheable or Internal server error", "error");
      } else {
        console.log("Error in code:", error.message);
      }
    }
  };
  return (
    <>
      <Nav />
      <div className="w-full h-dvh flex justify-center items-center">
        <table className="w-xl max-w-full">
          <thead>
            <tr className=" bg-black text-white p-4 text-center">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.map((i) => {
              return <TableData data={i} key={i._id} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUser;
