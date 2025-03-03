import { useState } from "react";
import { Form, Input, InputNumber, Button, Upload, message, Select, Breadcrumb } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // Handle file selection
  const handleFileChange = (info) => {
    const selectedFile = info.file;
    setFile(selectedFile);

    // Create a preview URL for the image
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(selectedFile);
  };

  // Prevent auto-upload
  const beforeUpload = (file) => {
    setFile(file);
    return false; // Prevent AntD from auto-uploading
  };

  // Handle form submission
  const onFinish = async (values) => {
    if (!file) {
      message.error("Please upload an image!");
      return;
    }

    const token = localStorage.getItem("token");
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
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3000/products/create", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }, // No Content-Type, FormData handles it
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        message.success("Product added successfully!");
        navigate("/admin/products");
      } else {
        message.error(data.message || "Failed to add product");
      }
    } catch (error) {
      message.error("Error uploading product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Breadcrumb>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="./">Products</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add Product</Breadcrumb.Item>
      </Breadcrumb>

      <h2 className="text-xl font-semibold my-4">Add New Product</h2>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Product Name" name="name" rules={[{ required: true, message: "Please enter product name" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Price (₹)" name="price" rules={[{ required: true, message: "Please enter product price" }]}>
          <InputNumber min={1} className="w-full" />
        </Form.Item>

        <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please select category" }]}>
          <Select placeholder="Select a category">
            <Option value="Premium Chocolates">Premium Chocolates</Option>
            <Option value="Chocolate Combos">Chocolate Combos</Option>
            <Option value="Fruits & Nuts Chocolates">Fruits & Nuts Chocolates</Option>
            <Option value="Assorted Sweets">Assorted Sweets</Option>
            <Option value="Dry Fruit Sweets">Dry Fruit Sweets</Option>
            <Option value="Gift Hampers">Gift Hampers</Option>
            <Option value="Festive Deals">Festive Deals</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Stock Quantity" name="stock" rules={[{ required: true, message: "Please enter stock quantity" }]}>
          <InputNumber min={1} className="w-full" />
        </Form.Item>

        <Form.Item label="Product Image">
          <Upload beforeUpload={beforeUpload} showUploadList={false} onChange={handleFileChange}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Product Preview" className="w-32 h-32 object-cover" />
            </div>
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
