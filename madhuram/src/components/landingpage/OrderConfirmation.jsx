import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch order details
  const fetchOrder = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Order Details:", data); // Debugging
      setOrder(data);
    } catch (error) {
      console.error("Error fetching order:", error); // Debugging
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  if (loading) return <div className="text-center py-20 text-xl">Loading...</div>;
  if (error) return <div className="text-center py-20 text-xl text-red-500">{error}</div>;
  if (!order) return <div className="text-center py-20 text-xl">Order not found</div>;

  return (
    <>
      <Navbar />
      <div className="bg-[#fdf6f0] py-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-[#5a3e2b]">Order Confirmation</h1>
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[#5a3e2b]">Thank you for your order!</h2>
            <p className="mt-2 text-gray-600">Order ID: {order._id}</p>
            <p className="mt-2 text-gray-600">Status: {order.status}</p>
            <p className="mt-2 text-gray-600">Total: ₹{order.totalPrice.toFixed(2)}</p>
            <button
              className="mt-6 bg-[#5a3e2b] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#3e2b1e] transition"
              onClick={() => window.print()}
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmation;