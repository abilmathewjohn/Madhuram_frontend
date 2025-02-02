import { useState } from "react";
import { motion } from "framer-motion";
import Login from "../components/login&signup/Login";
import Signup from "../components/login&signup/Signup";
import Navbar from "../components/landingpage/Navbar";
import Footer from "../components/landingpage/Footer";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {isLogin ? <Login /> : <Signup />}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 underline hover:text-blue-700 transition"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </motion.div>
    </div>
    <Footer />
    </div>
  );
};

export default LoginSignup;