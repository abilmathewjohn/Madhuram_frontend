import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Card, Spin, Pagination } from "antd";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, products]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-[#fffaf5] to-[#e8d4c9] py-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 pb-6">
            {categories.map((cat) => (
              <Button
                key={cat}
                type={selectedCategory === cat ? "primary" : "default"}
                className={`capitalize px-5 py-2 rounded-full transition-all ${
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
          <div className="flex justify-center mt-4">
            <Input
              className="w-full max-w-xl px-4 py-3 border border-[#ce8628] rounded-lg focus:ring-2 focus:ring-[#db9286]"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <motion.div
                  key={product._id}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="cursor-pointer"
                >
                  <Card
                    hoverable
                    className="rounded-xl shadow-lg border border-[#dabfb3] bg-white flex flex-col justify-between h-[420px] transition-all duration-300 hover:shadow-2xl"
                    cover={
                      <div className="w-full h-[220px] flex items-center justify-center overflow-hidden rounded-t-xl">
                        <img
                          src={`http://localhost:3000/${product.image}`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    }
                  >
                    <div className="px-3 text-center">
                      <h3 className="text-lg font-semibold text-[#5a3e2b] h-14 overflow-hidden leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-[#ce8628] font-bold text-xl mt-2">
                        ₹{product.price}
                      </p>
                    </div>
                    <div className="w-full mt-auto flex gap-3 px-3 pb-3">
                      <button
                        className="flex-1 bg-[#ce8628] text-white py-2.5 rounded-lg font-semibold hover:bg-[#ae8474] transition text-lg"
                        onClick={() => navigate(`/product/${product._id}`)}
                      >
                        View
                      </button>
                      <button
                        className="flex-1 bg-[#5a3e2b] text-white py-2.5 rounded-lg font-semibold hover:bg-[#3e2b1e] transition text-lg"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">No products found.</p>
            )}
          </div>

          {/* Pagination */}
          {filteredProducts.length > itemsPerPage && (
            <div className="flex justify-center mt-8">
              <Pagination
                current={currentPage}
                total={filteredProducts.length}
                pageSize={itemsPerPage}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopPage;