import { useEffect, useState } from "react";
import { Card, Spin, Breadcrumb } from "antd";


const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products from the backend
  useEffect(() => {
    fetch("http://localhost:3000/products/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Spin size="large" className="flex justify-center items-center h-screen" />;

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="p-4">
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
      </Breadcrumb>

      <h2 className="text-xl font-semibold my-4">Our Products</h2>

      {Object.keys(groupedProducts).map((category) => (
        <div key={category} className="mb-8">
          <h3 className="text-lg font-semibold mb-4">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {groupedProducts[category].map((product) => (
              <Card
              key={product._id}
              hoverable
              cover={<img alt={product.name} src={`http://localhost:3000/${product.image}`} className="h-48 object-cover" />}
            >
                <Card.Meta
                  title={product.name}
                  description={
                    <>
                      <p className="text-lg font-bold text-[#D2691E]">₹{product.price}</p>
                      <p className="text-sm text-gray-600">{product.description}</p>
                    </>
                  }
                />
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewProduct;