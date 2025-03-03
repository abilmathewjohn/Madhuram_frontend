/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Boxes,
  UserCog,
} from "lucide-react";

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("dashboard");
  const [openMenus, setOpenMenus] = useState([]);

  const toggleMenu = (menu) => {
    setOpenMenus((prev) =>
      prev.includes(menu) ? prev.filter((item) => item !== menu) : [...prev, menu]
    );
  };

  const handleNavigation = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  const menuItems = [
    { title: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/dashboard" },
    {
      title: "Products",
      icon: <Package size={20} />,
      path: "/admin/products",
      submenu: [
        { title: "Add Products", icon: <Boxes size={16} />, path: "/admin/products/add" },
        { title: "View Product", icon: <Package size={16} />, path: "/admin/products/view" },
      ],
    },
    {
      title: "Orders",
      icon: <ShoppingCart size={20} />,
      path: "/admin/orders",
      submenu: [
        { title: "View Order", icon: <ShoppingCart size={16} />, path: "/admin/orders/view/" },
        { title: "Update Order", icon: <ShoppingCart size={16} />, path: "/admin/orders/update/:id" },
        { title: "Delete Order", icon: <ShoppingCart size={16} />, path: "/admin/orders/delete/:id" },
      ],
    },
    {
      title: "Customers",
      icon: <Users size={20} />,
      path: "/admin/customers",
      submenu: [
        { title: "Edit Customer", icon: <Users size={16} />, path: "/admin/customers/edit/:id" },
      ],
    },
    {
      title: "Employees",
      icon: <UserCog size={20} />,
      path: "/admin/employees",
      submenu: [
        { title: "Create Employee", icon: <UserCog size={16} />, path: "/admin/employees/create" },
      ],
    },

    { title: "Task", icon: <UserCog size={20} />, path: "/admin/task" ,submenu: [
        
      ]
    },
    { title: "Image Upload", icon: <UserCog size={20} />, path: "/admin/image-upload" },
    { title: "Payments", icon: <CreditCard size={20} />, path: "/admin/payments" },
    { title: "Notifications", icon: <Bell size={20} />, path: "/admin/notifications" },
    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/admin/settings",
      submenu: [
        { title: "General", icon: <Settings size={16} />, path: "/admin/settings/general" },
        { title: "Security", icon: <Settings size={16} />, path: "/admin/settings/security" },
        { title: "Appearance", icon: <Settings size={16} />, path: "/admin/settings/appearance" },
      ],
    },
  ];

  return (
    <div
      className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      {/* Logo & Toggle Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {isExpanded ? (
          <div className="flex items-center gap-2">
            <img src="../public/images/logo.png" alt="Logo" className="h-8 w-8 rounded" />
            <span className="font-semibold text-gray-800">Madhuram</span>
          </div>
        ) : (
          <img src="../public/images/logo.png" alt="Logo" className="h-8 w-8 rounded mx-auto" />
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 rounded-lg hover:bg-gray-100 focus:outline-none"
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.path} className="relative">
            <button
              onClick={() => {
                handleNavigation(item.path);
                if (item.submenu) toggleMenu(item.path);
              }}
              className={`w-full flex items-center ${
                isExpanded ? "justify-between" : "justify-center"
              } p-2 rounded-lg transition-colors duration-200 ${
                activeItem === item.path ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                {isExpanded && <span className="font-medium">{item.title}</span>}
              </div>
              {isExpanded && item.submenu && (
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    openMenus.includes(item.path) ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {/* Submenu */}
            {item.submenu && openMenus.includes(item.path) && isExpanded && (
              <div className="mt-2 ml-4 space-y-1">
                {item.submenu.map((subItem) => (
                  <button
                    key={subItem.path}
                    onClick={() => handleNavigation(subItem.path)}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 ${
                      activeItem === subItem.path ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {subItem.icon}
                    <span className="font-medium">{subItem.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          className={`w-full flex items-center gap-3 p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200 ${
            isExpanded ? "justify-start" : "justify-center"
          }`}
          onClick={() => navigate("/my-account")}
        >
          <LogOut size={20} />
          {isExpanded && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
