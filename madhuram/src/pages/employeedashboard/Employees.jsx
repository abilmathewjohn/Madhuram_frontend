import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Input, Button, Breadcrumb, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Unauthorized: No token found");
        return;
      }

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const response = await fetch("http://localhost:3000/employee/", {
        method: "GET",
        headers: myHeaders,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Unauthorized: No token found");
        return;
      }

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const response = await fetch(`http://localhost:3000/employee/${id}`, {
        method: "DELETE",
        headers: myHeaders,
      });

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      message.success("Employee deleted successfully!");
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => role.toUpperCase(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, employee) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/employees/edit/${employee._id}`)}
          >
            Edit
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(employee._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Employees</Breadcrumb.Item>
      </Breadcrumb>

      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Employee List</h1>

      {/* Search Bar */}
      <Input.Search
        placeholder="Search employees..."
        allowClear
        className="mb-4"
        onSearch={(value) => setSearch(value)}
      />

      {/* Table */}
      <Table
        columns={columns}
        dataSource={employees.filter((emp) =>
          emp.name.toLowerCase().includes(search.toLowerCase())
        )}
        rowKey="_id"
        loading={loading}
        bordered
      />
    </div>
  );
};

export default EmployeeList;
