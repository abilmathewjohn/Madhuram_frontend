import { useState, useEffect } from "react";
import { Form, Input, Button, message, Breadcrumb, Card } from "antd";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:3000/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch employee details");
      }

      const data = await response.json();
      form.setFieldsValue(data);
    } catch (error) {
      message.error("Error fetching employee details" + error.message);
    }
  };

  const updateEmployee = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/employee/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      message.success("Employee updated successfully");
      setTimeout(() => navigate("/admin/employees"), 1500);
    } catch (error) {
      message.error("Error updating employee" + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/admin">Admin</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/admin/employees">Employees</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit Employee</Breadcrumb.Item>
      </Breadcrumb>

      <Card title="Edit Employee" bordered={false} className="shadow-md">
        <Form form={form} layout="vertical" onFinish={updateEmployee}>
          <Form.Item label="Full Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Email is required" }]}>
            <Input type="email" />
          </Form.Item>

          <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "Phone is required" }]}>
            <Input />
          </Form.Item>

          <div className="flex gap-4">
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Employee
            </Button>
            <Button type="default" onClick={() => navigate("/admin/employees")}>
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default EditEmployee;
