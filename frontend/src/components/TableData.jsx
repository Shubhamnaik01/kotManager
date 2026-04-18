import React, { useState } from "react";
import notification from "../lib/toastNotify";
import api from "../lib/axiosBase";

const TableData = (props) => {
  const [role, setRole] = useState(props.data.role);
  const [editStatus, setEditStatus] = useState(false);

  console.log(role);

  const changeRole = async () => {
    try {
      const result = await api.put("/users/updateRole/" + props.data._id, {
        newRole: role,
      });
      if (result.status == 200) {
        setEditStatus(false);
        notification(result.data.message, "success");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        notification(error.response.data.message, "error");
      } else if (error.request) {
        notification("Server not reachable or Internal server error", "error");
      } else {
        console.log("Error in code", error.message);
      }
    }
  };

  const deleteUser = async () => {
    try {
      const result = await api.delete("/users/delete/" + props.data._id);

      if (result.status == 200) {
        props.updateUserArray(props.data._id);
        notification(result.data.message, "success");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        notification(error.response.data.message, "error");
      } else if (error.request) {
        notification("Server not reachable or Internal server error", "error");
      } else {
        console.log("Error in code", error.message);
      }
    }
  };

  return (
    <tr className="text-center">
      <td>{props.data.name}</td>
      <td>{props.data.email}</td>
      <td>
        <select
          name="role"
          onChange={(e) => {
            setRole(e.target.value);
          }}
          value={role}
        >
          <option value="kitchen">Kitchen</option>
          <option value="counter">Counter</option>
          <option value="admin">Admin</option>
        </select>
      </td>
      <td className="p-2">
        {!editStatus ? (
          <button
            className="p-1 bg-gray-600 text-white rounded-md"
            onClick={() => {
              setEditStatus(true);
            }}
          >
            Edit
          </button>
        ) : (
          <div className="flex justify-evenly items-center">
            <button
              className="p-1 bg-gray-600 text-white rounded-md"
              onClick={changeRole}
            >
              Save
            </button>
            <button
              className="p-1 bg-gray-600 text-white rounded-md"
              onClick={() => {
                setEditStatus(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </td>
      <td>
        <button
          className="p-1 bg-gray-600 text-white rounded-md"
          onClick={() => {
            deleteUser();
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableData;
