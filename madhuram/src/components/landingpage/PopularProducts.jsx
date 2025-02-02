
import { Star,ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const products = [
  { 
    name: "Assorted Gift Box", 
    price: "$29.99", 
    image: "/images/product1.jpg",
    rating: 4.8,
    reviews: 124,
    tag: "Bestseller"
  },
  { 
    name: "Premium Chocolate Box", 
    price: "$39.99", 
    image: "/images/product2.jpg",
    rating: 4.9,
    reviews: 89,
    tag: "New"
  },
  { 
    name: "Fruit & Nut Mix", 
    price: "$24.99", 
    image: "/images/product3.jpg",
    rating: 4.7,
    reviews: 156,
    tag: "Popular"
  },
  { 
    name: "Special Occasion Pack", 
    price: "$49.99", 
    image: "/images/product4.jpg",
    rating: 4.9,
    reviews: 93,
    tag: "Limited"
  }
];

const PopularProducts = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-[#666] text-sm font-medium">Featured</span>
            <h2 className="text-3xl font-bold text-[#333]">Most Popular Products</h2>
          </div>
          <button className="flex items-center space-x-2 text-[#FF6F61] hover:text-[#40E0D0] transition">
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.name}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <span className="absolute top-4 right-4 bg-[#FF6F61] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {product.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-medium text-lg text-[#333] mb-2">{product.name}</h3>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-[#666]">({product.reviews})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[#FF6F61]">{product.price}</span>
                  <button className="bg-[#40E0D0] text-white px-4 py-2 rounded-lg hover:bg-[#FF6F61] transition">
                    Add to Cart
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