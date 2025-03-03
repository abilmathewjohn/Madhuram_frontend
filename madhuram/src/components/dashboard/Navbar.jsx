/* eslint-disable react/prop-types */
import { Bell, Search, ChevronDown, Menu } from 'lucide-react';

const Navbar = ({ setSidebarOpen }) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <Menu size={20} />
          </button>

          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-400"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              2
            </span>
          </button>

          {/* Admin Profile */}
          <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
            <img src="/avatar.png" alt="Admin" className="h-8 w-8 rounded-full" />
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;