import React, { useEffect, useState } from "react";
import api from "../lib/axiosBase";
import notification from "../lib/toastNotify";
import TableData from "../components/TableData";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { currentTabStore } from "../store/useNavigationStore";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const { role } = useAuthStore();
  const { selectManageUsers } = currentTabStore();
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

  const removeUserInArray = (_id) => {
    setUsers((prev) => {
      return prev.filter((i) => i._id != _id);
    });
  };

  useEffect(() => {
    selectManageUsers();
  }, []);
  return (
    <div className="flex flex-col min-h-dvh">
      <Nav />
      <div className="flex-1 flex justify-center items-start my-4 mx-4">
        {users.length <= 0 ? (
          <div className="h-2/5 w-full flex justify-center items-center">
            <h1>No users please create !</h1>
          </div>
        ) : (
          <table className="w-full max-w-4xl">
            <thead>
              <tr className=" bg-black text-white p-4 text-center">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Edit</th>
                <th className="p-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((i) => {
                return (
                  <TableData
                    data={i}
                    key={i._id}
                    updateUserArray={removeUserInArray}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageUser;
