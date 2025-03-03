import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/orders/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center py-20 text-xl">Loading...</div>;
  if (error) return <div className="text-center py-20 text-xl text-red-500">{error}</div>;
  if (!orders.length) return <div className="text-center py-20 text-xl">No orders found.</div>;

  return (
    <>
      <Navbar />
      <div className="bg-[#fdf6f0] py-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-[#5a3e2b]">Your Orders</h1>
          <div className="mt-6 space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
                  <p className="text-gray-600">Status: {order.status}</p>
                  <p className="text-gray-600">Total: ₹{order.totalPrice.toFixed(2)}</p>
                </div>
                <button
                  className="bg-[#ce8628] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#ae8474] transition"
                  onClick={() => navigate(`/orders/${order._id}`)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
