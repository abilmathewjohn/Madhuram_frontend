import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, Upload, Button, Breadcrumb, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateEmployee = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    const formData = new FormData();
    
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("role", values.role);
    formData.append("password", values.password);
    if (values.profileImage) {
      formData.append("profileImage", values.profileImage.file);
    }

    try {
      const response = await fetch("http://localhost:3000/employee/create", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create employee");
      }

      message.success("Employee created successfully!");
      setTimeout(() => navigate("/admin/employees"), 1500);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Employees</Breadcrumb.Item>
        <Breadcrumb.Item>Create Employee</Breadcrumb.Item>
      </Breadcrumb>

      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Create Employee</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Please enter name" }]}> 
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}> 
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: "Please enter phone number" }]}> 
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item name="role" label="Role" initialValue="employee">
            <Select>
              <Option value="employee">Employee</Option>
            </Select>
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please enter password" }]}> 
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item name="profileImage" label="Profile Image">
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Profile Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              {loading ? "Creating..." : "Create Employee"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateEmployee;