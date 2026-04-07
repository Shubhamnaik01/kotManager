import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import api from "../lib/axiosBase";
import notification from "../lib/toastNotify";
import Item from "./Item";
import Order from "./Order";
import { useAuthStore } from "../store/useAuthStore";
import { currentTabStore } from "../store/useNavigationStore";

const Home = ({ socket }) => {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const { role } = useAuthStore();
  const { isItem, isOrder } = currentTabStore();

  const updateOrder = async (newData) => {
    try {
      const path =
        role != "kitchen" ? "/orders/update/" : "/orders/updateStatus/";
      const result = await api.post(path + newData._id, newData);
      if (result.status == "200") {
        const updatedOrder = orders.map((i) => {
          if (i._id == newData._id) {
            return result.data.payload;
          }
          return i;
        });
        setOrders(updatedOrder);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        notification(error.response.data.message, "error");
      } else if (error.request) {
        notification("Server not reacheable or Internal server error", "error");
      } else {
        console.log("Error in code ", error.message);
      }
    }
  };

  const deleteOrder = async (id) => {
    try {
      const order_id = id;
      const result = await api.delete("/orders/delete/" + order_id);
      if (result.status == "200") {
        setOrders((prev) => {
          return prev.filter((i) => {
            return i._id != order_id;
          });
        });
        notification(result.data.message, "success");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        notification(error.response.data.message, "error");
      } else if (error.request) {
        notification("Server not reacheable or Internal server error", "error");
      } else {
        console.log("Error in code ", error.message);
      }
    }
  };

  const createOrder = async (data) => {
    try {
      const result = await api.post("/orders/create", data);
      if (result.status == "201") {
        setOrders((prev) => [...prev, result.data.createdOrder]);
        notification(result.data.message, "success");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        console.log(error.response.data.message);
        notification(error.response.data.message, "error");
      } else if (error.request) {
        notification("Server not reacheable or Internal server error", "error");
      } else {
        console.log("Error in code ", error.message);
      }
    }
  };

  const getAllOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await api.get("/orders/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.status == "200") {
        setOrders(result.data.data);
        console.log(result.data.data);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        notification(error.response.data.message, "error");
      } else if (error.request) {
        notification("Server not reacheable or Internal server error", "error");
      } else {
        console.log("Error in code ", error.message);
      }
    }
  };

  const updateItemParent = (data) => {
    const updatedItem = items.map((i, k) => {
      if (i._id == data._id) {
        return data;
      }
      return i;
    });
    setItems(updatedItem);
  };

  const deleteItem = (id) => {
    console.log(id);
    const updatedItemList = items.filter((i) => {
      return i._id != id;
    });
    setItems(updatedItemList);
  };

  const getAllItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await api.get("/items/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.status == "200") {
        console.log(result.data.data);
        setItems(result.data.data);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        notification(error.response.data.message, "error");
      } else if (error.request) {
        notification("Server not reacheable or Internal server error", "error");
      } else {
        console.log("Error in code ", error.message);
      }
    }
  };

  useEffect(() => {
    if (isItem) {
      getAllItems();
    } else {
      getAllOrders();
    }
  }, [isItem]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleMessage = (event) => {
      const result = JSON.parse(event.data);
      console.log(result);

      if (result.type == "Initial") {
        setOrders((prev) => {
          return prev.length > 0 ? prev : result.payload;
        });
      } else if (result.type == "NewOrder") {
        setOrders((prev) => [...prev, result.payload]);
      } else if (result.type == "Delete") {
        setOrders((prev) => {
          const orders = prev.filter((i) => i._id != result.payload._id);
          return orders;
        });
      } else if (result.type == "Update") {
        setOrders((prev) => {
          const orders = prev.map((i) => {
            if (i._id == result.payload._id) {
              return result.payload;
            }
            return i;
          });
          return orders;
        });
      } else if (result.type == "UpdateOnlyStatus") {
        setOrders((prev) => {
          console.log(result);
          const orders = prev.map((i) => {
            if (i._id == result.payload._id) {
              return result.payload;
            }
            return i;
          });
          return orders;
        });
      }
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket]);
  return (
    <div>
      <Nav />
      <div className=" p-10 gap-4 flex flex-wrap">
        {isItem ? (
          items.length > 0 ? (
            items.map((i, k) => {
              return (
                <Item
                  key={i._id}
                  _id={i._id}
                  deleteItem={deleteItem}
                  createOrder={createOrder}
                  itemName={i.itemName}
                  updateItemParent={updateItemParent}
                  price={i.price}
                  cuisine={i.cuisine}
                  foodType={i.foodType}
                ></Item>
              );
            })
          ) : (
            <h1>No Items ! Please create </h1>
          )
        ) : orders.length > 0 ? (
          orders.map((i, k) => (
            <Order
              key={i._id}
              _id={i._id}
              deleteOrder={deleteOrder}
              updateOrder={updateOrder}
              itemName={i.itemName}
              qty={i.qty}
              foodType={i.foodType}
              cuisine={i.cuisine}
              status={i.orderStatus}
            />
          ))
        ) : (
          <h1>No Orders ! Please create</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
