import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Upload, message, Select, Breadcrumb } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

const { Option } = Select;

const EditProduct = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Fetch product details by ID
  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        form.setFieldsValue({
          name: data.name,
          price: data.price,
          category: data.category,
          description: data.description,
          stock: data.stock,
        });
      })
      .catch(() => message.error("Failed to fetch product details"));
  }, [id, form]);

  // Handle file upload
  const handleFileChange = (info) => {
    if (info.file.status === "done" || info.file.status === "uploading") {
      setFile(info.file.originFileObj);
    }
  };

  // Handle form submission
  const onFinish = (values) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) {
      message.error("You are not authorized. Please log in.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("description", values.description);
    formData.append("stock", values.stock);
    if (file) formData.append("image", file);

    fetch(`http://localhost:3000/products/update/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`, // Use token from localStorage
      },
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        message.success("Product updated successfully!");
        navigate("../");
      })
      .catch(() => message.error("Failed to update product"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-4">
      <Breadcrumb>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="../">Products</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit Product</Breadcrumb.Item>
      </Breadcrumb>

      <h2 className="text-xl font-semibold my-4">Edit Product</h2>

      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Product Name" name="name" rules={[{ required: true, message: "Please enter product name" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Price (₹)" name="price" rules={[{ required: true, message: "Please enter product price" }]}>
          <InputNumber min={1} className="w-full" />
        </Form.Item>

        <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please select category" }]}>
          <Select placeholder="Select a category">
            <Option value="Gourmet">Gourmet</Option>
            <Option value="Luxury">Luxury</Option>
            <Option value="Handmade">Handmade</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Stock Quantity" name="stock" rules={[{ required: true, message: "Please enter stock quantity" }]}>
          <InputNumber min={1} className="w-full" />
        </Form.Item>

        <Form.Item label="Product Image">
          <Upload  onChange={handleFileChange} >
            <Button icon={<UploadOutlined />}>Upload New Image (Optional)</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProduct;