import { useEffect, useState } from "react";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchPayments();
    fetchTotalRevenue();
  }, []);

  // Fetch all orders
  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  // Fetch total revenue
  const fetchTotalRevenue = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/payments/total-revenue", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setTotalRevenue(data.totalRevenue || 0);
    } catch (error) {
      console.error("Error fetching total revenue:", error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Payments & Revenue</h2>

      {/* Total Revenue Card */}
      <div className="mb-4 p-4 bg-green-200 rounded-md">
        <h3 className="text-xl font-bold">Total Revenue: ₹{totalRevenue}</h3>
      </div>

      {/* Payment Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Transaction ID</th>
            <th className="border p-2">Payment Method</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id} className="text-center">
              <td className="border p-2">{payment.orderId}</td>
              <td className="border p-2">₹{payment.amount}</td>
              <td className="border p-2">{payment.transactionId}</td>
              <td className="border p-2">{payment.paymentMethod}</td>
              <td className={`border p-2 ${payment.status === "Success" ? "text-green-600" : "text-red-600"}`}>
                {payment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payment;
