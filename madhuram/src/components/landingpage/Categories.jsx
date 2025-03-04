import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

const categories = [
  { name: "Premium Chocolates", image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRNb5JdEsoiSNSVXprcoLlGqdWsKrgGcvfXc8vHSuRVRN-HM7_Y9lsTqhJk01oyI4PViaXRZMtqjpahvO_-eb7NhrEAi1id95Y-nLD1dpk" },
  { name: "Chocolate Combos", image: "https://artisante.in/cdn/shop/products/mini-chocolates-with-nuts-341877_1800x1800.jpg?v=1663919892" },
  { name: "Fruits & Nuts Chocolates", image: "https://d2kwrscaws6vau.cloudfront.net/products/Fruit-Nut-1.jpg-2024-12-24-123525-g7ztzhiskyk.png" },
  { name: "Assorted Sweets", image: "https://m.media-amazon.com/images/I/5189Im2EfpL._SX300_SY300_QL70_FMwebp_.jpg" },
  { name: "Dry Fruit Sweets", image: "https://m.media-amazon.com/images/I/81s63nDYp4L._SX679_.jpg" },
  { name: "Gift Hampers", image: "https://m.media-amazon.com/images/I/A1SIyuoJ8VL.jpg" },
  { name: "Festive Deals", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSffARbw95bc5hijtgu7YhZg2hFlP_KP2dTJA&s" }
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <section id="categories" className="py-16 bg-[#f8f1eb]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#5a2d0c] mb-4 drop-shadow-md">
            Explore Our Collection
          </h2>
          <p className="text-[#7a4f2e] text-lg">
            Handcrafted chocolates, delightful sweets & perfect gifts for every occasion
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
          }}
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative rounded-lg cursor-pointer transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1"
                onClick={() => handleCategoryClick(category.name)}
              >
                {/* Category Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-56 object-cover rounded-lg shadow-md"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end px-4 pb-4">
                  <h3 className="text-white text-2xl font-semibold">
                    {category.name}
                  </h3>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;
