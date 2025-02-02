import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section id="home" className="relative h-[600px] bg-gradient-to-r from-[#dabfb3] via-[#ae8474] to-[#db9286]">
      <div className="absolute inset-0 bg-[url('/images/hero-bg2.jpg')] mix-blend-overlay opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
        <motion.span 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-lg mb-4 "
        >
          Welcome to Madhuram
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-6xl font-bold mb-6 text-[#db9286]"
        >
          Add Sweetness to Your Memories
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl mb-8 max-w-2xl "
        >
          Discover our handcrafted collection of premium sweets and delightful treats
          that make every moment memorable
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex gap-4"
        >
          <button className="bg-[#ce8628] text-white px-8 py-3 rounded-full text-lg hover:bg-[#db9286] transition">
            Shop Now
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-full text-lg hover:bg-white/10 transition">
            View Collections
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
