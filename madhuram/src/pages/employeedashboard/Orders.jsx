import { useState, useEffect } from "react";
import { Table, Button, message, Popconfirm, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/orders/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/orders/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        message.success("Order deleted successfully");
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
      } else {
        message.error("Failed to delete order");
      }
    } catch (error) {
      message.error("Error deleting order");
      console.error("Error:", error);
    }
  };

  const columns = [
    { title: "Order ID", dataIndex: "_id", key: "_id" },
    { title: "User", dataIndex: ["user", "name"], key: "user" },
    { title: "Total Price", dataIndex: "totalPrice", key: "totalPrice" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete this order?"
          onConfirm={() => deleteOrder(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link to="/admin">Admin</Link> },
          { title: "Orders" },
        ]}
      />
      <h2>Manage Orders</h2>
      <Table dataSource={orders} columns={columns} rowKey="_id" />
    </div>
  );
};

export default Orders;
