import { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the backend
  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    fetch("http://localhost:3000/products/", {
      headers: {
        Authorization: `Bearer ${token}`, // Use token from localStorage
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        message.error("Failed to load products");
        setLoading(false);
      });
  }, []);

  // Handle product deletion
  const handleDelete = (id) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    fetch(`http://localhost:3000/products/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Use token from localStorage
      },
    })
      .then((res) => res.json())
      .then(() => {
        message.success("Product deleted successfully");
        setProducts(products.filter((product) => product._id !== id));
      })
      .catch(() => message.error("Failed to delete product"));
  };

  // Table columns configuration
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => (
        <img src={`http://localhost:3000/${image}`} alt="Product" width={50} height={50} />
      ),
      
    },
    { title: "Name", dataIndex: "name" },
    { title: "Category", dataIndex: "category" },
    { title: "Price", dataIndex: "price", render: (price) => `₹${price}` },
    { title: "Stock", dataIndex: "stock" },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Link to={`./edit/${record._id}`}><Button type="link">Edit</Button></Link>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Breadcrumb>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex justify-between items-center my-4">
        <h2 className="text-xl font-semibold">Product List</h2>
        <Link to="./add"><Button type="primary">Add Product</Button></Link>
      </div>

      <Table columns={columns} dataSource={products} loading={loading} rowKey="_id" />
    </div>
  );
};

export default ProductList;