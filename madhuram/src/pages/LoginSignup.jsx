import { useState } from "react";
import { motion } from "framer-motion";
import Login from "../components/login&signup/Login";
import Signup from "../components/login&signup/Signup";
import Navbar from "../components/landingpage/Navbar";
import Footer from "../components/landingpage/Footer";


const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex flex-grow items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Image Section */}
          <div className="w-1/2 hidden md:flex items-center justify-center bg-[#8B4513]">
            <img
              src={isLogin ? "../public/images/hero-bg3.jpg" : "../public/images/hero-bg2.jpg"}
              alt={isLogin ? "Login" : "Signup"}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-[#8B4513] text-center mb-6">
              {isLogin ? "Welcome Back to Madhuram!" : "Join Madhuram Today!"}
            </h2>
            {isLogin ? <Login /> : <Signup />}
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#D2691E] underline hover:text-[#A0522D] transition"
              >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginSignup;