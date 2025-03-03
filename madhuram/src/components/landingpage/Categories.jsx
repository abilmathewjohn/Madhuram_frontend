import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

const categories = [
  { name: "Premium Chocolates", image: "/images/premium.png" },
  { name: "Chocolate Combos", image: "/images/combo.jpg" },
  { name: "Fruits & Nuts Chocolates", image: "/images/fruits-nuts.jpg" },
  { name: "Assorted Sweets", image: "/images/sweets.jpg" },
  { name: "Dry Fruit Sweets", image: "/images/dry-fruits.jpg" },
  { name: "Gift Hampers", image: "/images/gift-hampers.jpg" },
  { name: "Festive Deals", image: "/images/deals.jpg" }
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
