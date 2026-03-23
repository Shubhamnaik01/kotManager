import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import api from "../lib/axiosBase";
import notification from "../lib/toastNotify";
import Item from "./Item";
import Order from "./Order";

const Home = () => {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isItem, setIsItem] = useState(true);

  const selectItems = () => {
    setIsItem(true);
  };
  const selectOrders = () => {
    setIsItem(false);
  };

  const updateOrder = async (newData) => {
    try {
      const result = await api.post("/orders/update/" + newData._id, newData);
      if (result.status == "200") {
        const updatedOrder = orders.map((i) => {
          if (i._id == newData._id) {
            return result.data.payload;
          }
          return i;
        });
        setOrders(updatedOrder);
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
        setOrders((prev) => [[...prev, result.data.createdOrder]]);
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

  const getAllItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await api.get("/items/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.status == "200") {
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
  return (
    <div>
      <Nav
        isItem={isItem}
        selectItems={selectItems}
        selectOrders={selectOrders}
      />
      <div className=" p-10 gap-4 flex">
        {isItem ? (
          items.length > 0 ? (
            items.map((i, k) => {
              return (
                <Item
                  key={k}
                  createOrder={createOrder}
                  itemName={i.itemName}
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
              key={k}
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
