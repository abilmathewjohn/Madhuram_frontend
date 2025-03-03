import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");

  // Fetch cart data
  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:3000/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Apply coupon
  const applyCoupon = async () => {
    try {
      const response = await fetch("http://localhost:3000/coupon/apply", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: couponCode,
          totalAmount: cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to apply coupon");
      }

      const data = await response.json();
      setDiscount(data.discount);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  // Update item quantity in cart and reload the page
  const updateQuantity = async (productId, newQuantity) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/update/${productId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      await response.json();
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity");
    }
  };

  // Remove item from cart and reload the page
  const removeItem = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/remove/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      await response.json();
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item from cart");
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="bg-[#fdf6f0] py-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#5a3e2b]">Your Cart is Empty</h1>
          <p className="mt-4 text-gray-600">Shop with us for the perfect gifts and chocolates!</p>
          <button
            className="mt-6 bg-[#ce8628] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#ae8474] transition"
            onClick={() => navigate("/shop")}
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const finalPrice = totalPrice - discount;

  return (
    <div className="bg-[#fdf6f0] py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-[#5a3e2b]">Your Cart</h1>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="col-span-2">
            {cart.items.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md mb-4"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={`http://localhost:3000/${item.product.image}`}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-[#5a3e2b]">{item.product.name}</h3>
                    <p className="text-gray-600">₹{item.product.price} per item</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-[#ce8628] text-white rounded-full hover:bg-[#ae8474] transition"
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">{item.quantity}</span>
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-[#ce8628] text-white rounded-full hover:bg-[#ae8474] transition"
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-lg font-semibold">₹{item.product.price * item.quantity}</p>
                  <button
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={() => removeItem(item.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-[#5a3e2b]">Order Summary</h2>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{finalPrice}</span>
              </div>
            </div>

            {/* Coupon */}
            <div className="mt-6">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ce8628]"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                className="mt-2 w-full bg-[#ce8628] text-white py-2 rounded-lg font-semibold hover:bg-[#ae8474] transition"
                onClick={applyCoupon}
              >
                Apply Coupon
              </button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            {/* Continue Shopping and Buy Now Buttons */}
            <div className="mt-6 space-y-4">
              <button
                className="w-full bg-[#ce8628] text-white py-2 rounded-lg font-semibold hover:bg-[#ae8474] transition"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </button>
              <button
                className="w-full bg-[#5a3e2b] text-white py-2 rounded-lg font-semibold hover:bg-[#3e2b1f] transition"
                onClick={() => navigate("/checkout")}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;