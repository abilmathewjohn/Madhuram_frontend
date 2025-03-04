import { useState, useEffect } from "react";
import { Table, Button, message, Popconfirm, Breadcrumb, Spin } from "antd";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Unauthorized. Please login.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:3000/orders/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch orders");

      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      message.error("Error fetching orders");
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Unauthorized. Please login.");
        return;
      }

      const response = await fetch(`http://localhost:3000/orders/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
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
    { 
      title: "User", 
      key: "user",
      render: (_, record) => `${record.user?.firstName || "N/A"} ${record.user?.lastName || ""}`,
    },
    { title: "Total Price", dataIndex: "totalPrice", key: "totalPrice" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
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
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb
        items={[
          { title: <Link to="/admin">Admin</Link> },
          { title: "Orders" },
        ]}
      />
      <h2 className="text-xl font-semibold mb-4">Manage Orders</h2>

      {loading ? (
        <div className="flex justify-center my-4">
          <Spin size="large" />
        </div>
      ) : (
        <Table dataSource={orders} columns={columns} rowKey="_id" />
      )}
    </div>
  );
};

export default Orders;
