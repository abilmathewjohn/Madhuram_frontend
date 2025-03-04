import { Bell, Search, ChevronDown, Menu, User } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// eslint-disable-next-line react/prop-types
const Navbar = ({ setSidebarOpen }) => {
  const notifications = [
    { id: 1, message: "New order received" },
    { id: 2, message: "Payment successful" },
  ];

  const handleNotificationClick = () => {
    notifications.forEach((notification) => {
      toast.info(notification.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
  };

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
          <button
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 relative"
            onClick={handleNotificationClick}
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Admin Profile */}
          <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      {/* Toastify Notifications */}
      <ToastContainer />
    </header>
  );
};

export default Navbar;