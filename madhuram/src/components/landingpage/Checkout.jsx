import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

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
      const response = await fetch("http://localhost:3000/coupons/apply", {
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

  const placeOrder = async () => {
    if (!address) {
      alert("Please enter your delivery address.");
      return;
    }
  
    if (!cart || !cart.items.length) {
      alert("Your cart is empty.");
      return;
    }
  
    try {
      // Create order
      const orderResponse = await fetch("http://localhost:3000/orders/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: cart.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          })),
          totalPrice: finalPrice,
          address,
          paymentMethod,
        }),
      });
  
      if (!orderResponse.ok) {
        throw new Error("Failed to place order");
      }
  
      const orderData = await orderResponse.json();
  
      // Process payment
      const paymentResponse = await fetch("http://localhost:3000/payment/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderData.order._id,
          amount: finalPrice,
          paymentMethod,
          transactionId: `txn_${Math.random().toString(36).substring(7)}`, // Mock transaction ID
        }),
      });
  
      if (!paymentResponse.ok) {
        throw new Error("Payment failed");
      }
  
      // Redirect to order confirmation page
      navigate(`/orders/${orderData.order._id}`);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order");
    }
  };
  

  if (!cart) return <div className="text-center py-20 text-xl">Loading...</div>;

  const subtotal = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.18; // 18% GST
  const finalPrice = subtotal + tax - discount;

  return (
    <>
      <Navbar />
      <div className="bg-[#fdf6f0] py-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-[#5a3e2b]">Checkout</h1>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-[#5a3e2b]">Order Summary</h2>
                <div className="mt-4 space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.product._id} className="flex items-center justify-between border-b py-2">
                      <div className="flex items-center space-x-4">
                        <img
                          src={`http://localhost:3000/${item.product.image}`}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">{item.product.name}</h3>
                          <p className="text-gray-600">₹{item.product.price} x {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-lg font-semibold">₹{item.product.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-[#5a3e2b]">Delivery Address</h2>
                <textarea
                  className="w-full p-4 border rounded-lg mt-4"
                  placeholder="Enter your delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>

              {/* Payment Method */}
              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-[#5a3e2b]">Payment Method</h2>
                <div className="mt-4 space-y-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit_card"
                      checked={paymentMethod === "credit_card"}
                      onChange={() => setPaymentMethod("credit_card")}
                    />
                    <span>Credit Card</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="debit_card"
                      checked={paymentMethod === "debit_card"}
                      onChange={() => setPaymentMethod("debit_card")}
                    />
                    <span>Debit Card</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                    />
                    <span>UPI</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <span>Cash on Delivery (COD)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Total */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-[#5a3e2b]">Order Total</h2>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18% GST)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{finalPrice.toFixed(2)}</span>
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

              {/* Place Order Button */}
              <button
                className="mt-6 w-full bg-[#5a3e2b] text-white py-3 rounded-lg font-semibold hover:bg-[#3e2b1e] transition"
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;