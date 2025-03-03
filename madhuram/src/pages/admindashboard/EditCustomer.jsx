import { useState, useEffect } from "react";
import { Form, Input, Button, message, Breadcrumb } from "antd";
import { Link, useParams } from "react-router-dom";

const EditCustomer = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCustomer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ id ]);

  const fetchCustomer = async () => {
    try {
      const response = await fetch(`http://localhost:3000/user/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch customer details");
      }

      const data = await response.json();
      form.setFieldsValue(data);
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };

  const updateCustomer = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/user/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      message.success("Customer profile updated successfully");
    } catch (error) {
      message.error("Error updating profile");
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { title: <Link to="/admin">Admin</Link> },
          { title: <Link to="/admin/customers">Customers</Link> },
          { title: "Edit Customer" },
        ]}
      />
      <h2>Edit Customer</h2>
      <Form form={form} layout="vertical" onFinish={updateCustomer}>
        <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "First name is required" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Last name is required" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "Phone is required" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Additional Info" name="additionalInfo">
          <Input.TextArea />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditCustomer;
