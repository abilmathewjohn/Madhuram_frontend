import { Instagram, Facebook, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#1a1a1a] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-[#FF6F61]">About Us</h4>
          <p className="text-white/80">
            Crafting premium gifts and sweet experiences since 2010. We believe in making every moment special.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-[#FF6F61]">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate("/shop")}
                className="text-white/80 hover:text-[#FF6F61] transition-all"
              >
                Shop All
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/gift-cards")}
                className="text-white/80 hover:text-[#FF6F61] transition-all"
              >
                Gift Cards
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/corporate-gifts")}
                className="text-white/80 hover:text-[#FF6F61] transition-all"
              >
                Corporate Gifts
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/track-order")}
                className="text-white/80 hover:text-[#FF6F61] transition-all"
              >
                Track Order
              </button>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-[#FF6F61]">Customer Service</h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate("/contact")}
                className="text-white/80 hover:text-[#FF6F61] transition-all"
              >
                Contact Us
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/shipping")}
                className="text-white/80 hover:text-[#FF6F61] transition-all"
              >
                Shipping Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/returns")}
                className="text-white/80 hover:text-[#FF6F61] transition-all"
              >
                Returns & Refunds
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/faqs")}
                className="text-white/80 hover:text-[#FF6F61] transition-all"
              >
                FAQs
              </button>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-[#FF6F61]">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-8 h-8 text-white/80 hover:text-[#FF6F61] cursor-pointer transition-all" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-8 h-8 text-white/80 hover:text-[#FF6F61] cursor-pointer transition-all" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-8 h-8 text-white/80 hover:text-[#FF6F61] cursor-pointer transition-all" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80">
        <p>&copy; 2025 Madhuram. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
