import { Search, ShoppingCart, PhoneCall, UserCircle } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="sticky top-0 bg-white/90 backdrop-blur-md shadow-md z-50 py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/images/logo.png" alt="Madhuram" className="w-8 h-8" />
          <span className="logo-text text-[#ce8628] font-bold text-xl">Madhuram</span>
        </div>
        
        <div className="flex space-x-6">
          <Search className="w-6 h-6 text-[#333] cursor-pointer hover:text-[#db9286] transition" />
          <PhoneCall className="w-6 h-6 text-[#333] cursor-pointer hover:text-[#db9286] transition" />
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-[#333] cursor-pointer hover:text-[#db9286] transition" />
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#dabfb3] via-[#ae8474] to-[#db9286] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </div>
          <UserCircle className="w-6 h-6 text-[#333] cursor-pointer hover:text-[#db9286] transition" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;