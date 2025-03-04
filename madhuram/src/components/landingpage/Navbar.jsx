import { useEffect, useState } from "react";
import { Search, ShoppingCart, PhoneCall, UserCircle, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial cart count
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await fetch("http://localhost:3000/cart/count", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!response.ok) throw new Error("Failed to fetch cart count");

        const data = await response.json();
        setCartCount(data.count);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartCount();
  }, []);

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = (event) => {
      setCartCount(event.detail);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 bg-white/90 backdrop-blur-md shadow-md z-50 py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div onClick={() => navigate("/")} className="flex items-center space-x-2 cursor-pointer">
          <img src="/images/logo.png" alt="Madhuram" className="w-10 h-10" />
          <span className="logo-text text-[#ce8628] font-bold text-2xl tracking-wide">Madhuram</span>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Menu className="w-6 h-6 text-[#333] cursor-pointer" onClick={toggleMobileMenu} />
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex space-x-6">
          <Search className="w-6 h-6 text-[#333] cursor-pointer hover:text-[#db9286] transition" onClick={() => navigate("/shop")} />
          <a href="tel:+1234567890">
            <PhoneCall className="w-6 h-6 text-[#333] cursor-pointer hover:text-[#db9286] transition" />
          </a>

          {/* Shopping Cart */}
          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <ShoppingCart className="w-6 h-6 text-[#333] hover:text-[#db9286] transition" />
            {!isLoading && (
              <span className="absolute -top-2 -right-2 bg-[#db9286] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <UserCircle
              className="w-6 h-6 text-[#333] cursor-pointer hover:text-[#db9286] transition"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            />

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                {isLoggedIn ? (
                  <>
                    <div
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate("/my-account");
                        setIsDropdownOpen(false);
                      }}
                    >
                      My Account
                    </div>
                    <div
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate("/profile");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Profile/Update
                    </div>
                    <div
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate("/orders");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Order History
                    </div>
                    <div
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate("/payments");
                        setIsDropdownOpen(false);
                      }}
                    >
                      Payments
                    </div>
                    <div
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </div>
                  </>
                ) : (
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate("/login");
                      setIsDropdownOpen(false);
                    }}
                  >
                    Login
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-md mt-4 py-4">
          <div className="flex flex-col space-y-4 px-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/shop")}>
              <Search className="w-6 h-6 text-[#333]" />
              <span>Search</span>
            </div>
            <a href="tel:+1234567890" className="flex items-center space-x-2">
              <PhoneCall className="w-6 h-6 text-[#333]" />
              <span>Call Us</span>
            </a>
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/cart")}>
              <ShoppingCart className="w-6 h-6 text-[#333]" />
              <span>Cart ({cartCount})</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/login")}>
              <UserCircle className="w-6 h-6 text-[#333]" />
              <span>{isLoggedIn ? "My Account" : "Login"}</span>
            </div>
          </div>
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;