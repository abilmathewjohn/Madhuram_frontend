import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Card, Spin } from "antd";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ShopPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = ["All", ...new Set(data.map((p) => p.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter products by category and search term
  useEffect(() => {
    let filtered = products;
    if (selectedCategory !== "All") {
      filtered = products.filter((p) => p.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-[#fdf6f0] to-[#dabfb3] py-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {/* Categories Section */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            {categories.map((cat) => (
              <Button
                key={cat}
                type={selectedCategory === cat ? "primary" : "default"}
                className={`capitalize transition-all px-4 py-2 rounded-lg ${
                  selectedCategory === cat
                    ? "bg-[#ce8628] text-white shadow-md"
                    : "bg-[#f5e1da] text-[#5a3e2b] hover:bg-[#e2c3b3]"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <Input
              className="w-full px-4 py-3 border border-[#ce8628] rounded-lg focus:ring-2 focus:ring-[#db9286]"
              placeholder="Search for chocolates, sweets, gifts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Loading/Error Handling */}
          {loading && (
            <div className="flex justify-center mt-8">
              <Spin size="large" />
            </div>
          )}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="cursor-pointer"
                >
                  <Card
                    hoverable
                    className="rounded-lg shadow-lg border border-[#dabfb3] bg-white flex flex-col justify-between h-[320px]"
                    cover={
                      <div className="w-full h-[180px] flex items-center justify-center overflow-hidden">
                        <img
                          src={`http://localhost:3000/${product.image}`}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      </div>
                    }
                  >
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-[#5a3e2b]">
                        {product.name}
                      </h3>
                      <p className="text-[#ce8628] font-semibold text-xl">₹{product.price}</p>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopPage;
