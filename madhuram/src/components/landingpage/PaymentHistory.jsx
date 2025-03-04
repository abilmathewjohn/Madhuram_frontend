import { useEffect, useState } from "react";
import Navbar from "./Navbar"; 
import Footer from "./Footer"; 

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        if (!token) {
          setError("Authentication required. Please log in.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:3000/payment/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch payment history");
        }

        const data = await response.json();
        setPayments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <>
      <Navbar /> {/* Navbar at the top */}
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Payment History</h2>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && payments.length === 0 && (
          <p className="text-center text-gray-500">No payment history found.</p>
        )}

        {!loading && !error && payments.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 p-2">Order ID</th>
                  <th className="border border-gray-300 p-2">Amount</th>
                  <th className="border border-gray-300 p-2">Method</th>
                  <th className="border border-gray-300 p-2">Transaction ID</th>
                  <th className="border border-gray-300 p-2">Status</th>
                  <th className="border border-gray-300 p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id} className="text-center">
                    <td className="border border-gray-300 p-2">{payment.orderId?._id || "N/A"}</td>
                    <td className="border border-gray-300 p-2">₹{payment.amount}</td>
                    <td className="border border-gray-300 p-2">{payment.paymentMethod}</td>
                    <td className="border border-gray-300 p-2">{payment.transactionId}</td>
                    <td
                      className={`border border-gray-300 p-2 font-semibold ${
                        payment.status === "Success" ? "text-green-600" : 
                        payment.status === "Failed" ? "text-red-600" : "text-yellow-600"
                      }`}
                    >
                      {payment.status}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {new Date(payment.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer /> {/* Footer at the bottom */}
    </>
  );
};

export default PaymentHistory;
