import { Heart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.slice(0, 4))) // Show top 4 products
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="bg-[#fdf6f0] py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="text-[#a66a50] text-sm font-semibold uppercase tracking-wider">Best Sellers</span>
            <h2 className="text-4xl font-extrabold text-[#5a3e2b]">Indulge in Our Finest Treats</h2>
          </div>
          <button
            onClick={() => navigate("/shop")}
            className="flex items-center space-x-2 text-[#ce8628] hover:text-[#ae8474] transition font-semibold text-lg"
          >
            <span>Shop All</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-3xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center relative"
            >
              {/* Wishlist Button */}
              <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition">
                <Heart className="w-6 h-6 text-[#db9286]" />
              </button>

              {/* Product Image */}
              <img
                src={`http://localhost:3000/${product.image}`}
                alt={product.name}
                className="w-48 h-48 object-cover rounded-xl"
              />

              {/* Product Details */}
              <div className="mt-4 text-center flex flex-col flex-grow w-full">
                {/* Category */}
                <span className="text-sm text-gray-500 uppercase">{product.category}</span>

                {/* Product Name (Fixed Height for Consistency) */}
                <h3 className="mt-2 font-semibold text-lg text-[#5a3e2b] h-12 flex items-center justify-center px-2">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="mt-2 text-xl font-bold text-[#ce8628]">₹{product.price}</div>

                {/* Spacer to keep buttons aligned */}
                <div className="flex-grow"></div>

                {/* Add to Cart / View Details */}
                <div className="w-full mt-4 flex gap-3">
                  <button
                    className="flex-1 bg-[#ce8628] text-white py-3 rounded-xl font-semibold hover:bg-[#ae8474] transition text-lg"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    View
                  </button>
                  <button
                    className="flex-1 bg-[#5a3e2b] text-white py-3 rounded-xl font-semibold hover:bg-[#3e2b1e] transition text-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularProducts;
