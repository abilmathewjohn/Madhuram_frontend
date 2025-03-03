import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const [bannerImage, setBannerImage] = useState('');

  // Fetch a random banner image from the backend
  useEffect(() => {
    const fetchRandomBannerImage = async () => {
      try {
        const response = await fetch('http://localhost:3000/upload/banner/random');
        if (!response.ok) throw new Error('Failed to fetch banner image');

        const data = await response.json();
        console.log("Fetched banner image URL:", data.imageUrl);

        // Set the banner image URL directly
        setBannerImage(data.imageUrl);

      } catch (error) {
        console.error('Error fetching banner image:', error);
      }
    };

    fetchRandomBannerImage();
  }, []);

  return (
    <section
      id="home"
      className="relative h-[600px] bg-gradient-to-r from-[#dabfb3] via-[#ae8474] to-[#db9286]"
      style={{
        backgroundImage: bannerImage ? `url('${bannerImage}')` : 'none', // Use single quotes around the URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/30 mix-blend-overlay"></div>
      <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg mb-4 font-medium"
        >
          Welcome to Madhuram
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-6xl font-bold mb-6 text-[#f8e5d6]"
        >
          Add Sweetness to Your Memories
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl mb-8 max-w-2xl text-[#f8e5d6]"
        >
          Discover our handcrafted collection of premium sweets and delightful treats
          that make every moment memorable
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            className="bg-[#ce8628] text-white px-8 py-3 rounded-full text-lg hover:bg-[#db9286] transition transform hover:scale-105"
            onClick={() => navigate('/shop')}
          >
            Shop Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;