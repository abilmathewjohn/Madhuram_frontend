
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#333] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-xl font-bold mb-4">About Us</h4>
          <p className="text-white/80">
            Crafting premium gifts and sweet experiences since 2010. 
            We believe in making every moment special.
          </p>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-white/80">
            <li>Shop All</li>
            <li>Gift Cards</li>
            <li>Corporate Gifts</li>
            <li>Track Order</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-white/80">
            <li>Contact Us</li>
            <li>Shipping Policy</li>
            <li>Returns & Refunds</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <Instagram className="w-6 h-6 text-white/80 hover:text-[#FF6F61] cursor-pointer" />
            <Facebook className="w-6 h-6 text-white/80 hover:text-[#FF6F61] cursor-pointer" />
            <Twitter className="w-6 h-6 text-white/80 hover:text-[#FF6F61] cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80">
        <p>&copy; 2025 Madhuram. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;