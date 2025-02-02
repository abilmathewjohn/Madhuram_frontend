
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';


const categories = [
  { name: 'Premium', icon: '🎀', image: '/images/premium.png' },
  { name: 'Combo', icon: '🎁', image:  '/images/combo.jpg' },
  { name: 'Fruits & Nuts', icon: '🍎', image: '/images/fruits-nuts.jpg' },
  { name: 'Variety', icon: '✨', image: '/images/variety.jpg' },
  { name: 'Deals', icon: '🏷️', image: '/images/deals.jpg' }
];

const Categories = () => {
  return (
    <section id="categories" className="py-16 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#333] mb-4">Explore Categories</h2>
          <p className="text-[#666]">Discover our wide range of premium collections</p>
        </div>

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
                className="relative overflow-hidden rounded-lg cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{category.name}</h3>
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