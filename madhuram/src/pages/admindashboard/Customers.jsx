import { useState, useEffect } from "react";
import { Table, Button, message, Popconfirm, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }

      const data = await response.json();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomers([]);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/user/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        message.success("Customer deleted successfully");
        setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer._id !== id));
      } else {
        message.error("Failed to delete customer");
      }
    } catch (error) {
      message.error("Error deleting customer");
      console.error("Error:", error);
    }
  };

  const columns = [
    { title: "Customer ID", dataIndex: "_id", key: "_id" },
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure to delete this customer?"
          onConfirm={() => deleteCustomer(record._id)}
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
          { title: "Customers" },
        ]}
      />
      <h2>Manage Customers</h2>
      <Table dataSource={customers} columns={columns} rowKey="_id" />
    </div>
  );
};

export default Customers;
