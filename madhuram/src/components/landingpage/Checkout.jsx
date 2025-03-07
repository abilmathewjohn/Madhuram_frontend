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

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:3000/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch cart");
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

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
      if (!response.ok) throw new Error("Invalid coupon code");
      const data = await response.json();
      setDiscount(data.discount);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const placeOrder = async () => {
    if (!address) return alert("Please enter your delivery address.");
    if (!cart || !cart.items.length) return alert("Your cart is empty.");

    try {
      const orderResponse = await fetch("http://localhost:3000/orders/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: cart.items.map((item) => ({ product: item.product._id, quantity: item.quantity })),
          totalPrice: finalPrice,
          address,
          paymentMethod,
        }),
      });
      if (!orderResponse.ok) throw new Error("Failed to place order");
      const orderData = await orderResponse.json();

      navigate(`/orders/${orderData.order._id}`);
    } catch (error) {
      alert("Failed to place order" + error);
    }
  };

  if (!cart) return <div className="text-center py-20 text-xl">Loading...</div>;

  const subtotal = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const finalPrice = subtotal + tax - discount;

  return (
    <>
      <Navbar />
      <div className="bg-[#fdf6f0] py-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-[#5a3e2b]">Checkout</h1>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-[#5a3e2b]">Order Summary</h2>
                {cart.items.map((item) => (
                  <div key={item.product._id} className="flex justify-between border-b py-2">
                    <div className="flex items-center space-x-4">
                      <img src={`http://localhost:3000/${item.product.image}`} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div>
                        <h3 className="text-lg font-semibold">{item.product.name}</h3>
                        <p className="text-gray-600">₹{item.product.price} x {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold">₹{item.product.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-[#5a3e2b]">Delivery Address</h2>
                <textarea className="w-full p-4 border rounded-lg mt-4" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
              </div>
              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-[#5a3e2b]">Payment Method</h2>
                <div className="mt-4 space-y-2">
                  {["credit_card", "debit_card", "upi", "cod"].map((method) => (
                    <label key={method} className="flex items-center space-x-2">
                      <input type="radio" name="paymentMethod" value={method} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} />
                      <span>{method.replace("_", " ").toUpperCase()}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-[#5a3e2b]">Order Total</h2>
              <div className="mt-4 space-y-2">
                <p className="flex justify-between">Subtotal <span>₹{subtotal.toFixed(2)}</span></p>
                <p className="flex justify-between">Tax (18% GST) <span>₹{tax.toFixed(2)}</span></p>
                <p className="flex justify-between">Discount <span>-₹{discount.toFixed(2)}</span></p>
                <p className="flex justify-between font-bold">Total <span>₹{finalPrice.toFixed(2)}</span></p>
              </div>
              <input type="text" placeholder="Enter coupon code" className="w-full p-2 border rounded-lg mt-4" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
              <button className="mt-2 w-full bg-[#ce8628] text-white py-2 rounded-lg hover:bg-[#ae8474]" onClick={applyCoupon}>Apply Coupon</button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <button className="mt-6 w-full bg-[#5a3e2b] text-white py-3 rounded-lg hover:bg-[#3e2b1e]" onClick={placeOrder}>Place Order</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;