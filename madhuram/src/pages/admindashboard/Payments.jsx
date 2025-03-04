import { useEffect, useState } from "react";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPayments();
    fetchTotalRevenue();
  }, []);

  // Fetch all payments
  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/payment/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch payments");
      }

      const data = await response.json();
      setPayments(data.payments || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch total revenue
  const fetchTotalRevenue = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/payment/total-revenue", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch total revenue");
      }

      const data = await response.json();
      setTotalRevenue(data.totalRevenue || 0);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Payments & Revenue</h2>

      {/* Total Revenue Card */}
      <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-lg p-6 mb-8 text-white">
        <h3 className="text-2xl font-semibold">Total Revenue</h3>
        <p className="text-4xl font-bold mt-2">₹{totalRevenue.toLocaleString()}</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Payment Table */}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-700">{payment.orderId?._id || "N/A"}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">₹{payment.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{payment.transactionId}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{payment.paymentMethod}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        payment.status === "Success"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "Failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Payments Found */}
      {!loading && !error && payments.length === 0 && (
        <div className="text-center py-6">
          <p className="text-gray-600">No payments found.</p>
        </div>
      )}
    </div>
  );
};

export default Payment;