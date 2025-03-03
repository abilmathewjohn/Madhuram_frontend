/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Users, UserPlus, Trash2 } from "lucide-react";

const EmployeeDashboardCard = ({ totalEmployees }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
      <h2 className="text-xl font-semibold text-gray-700">Total Employees</h2>
      <p className="text-4xl font-bold text-blue-600 mt-2">{totalEmployees}</p>

      <div className="mt-4 flex gap-3">
        <Link
          to="/admin/employees"
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          <Users size={18} />
          View All
        </Link>

        <Link
          to="/admin/employees/create"
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          <UserPlus size={18} />
          Add New
        </Link>

        <Link
          to="/admin/employees/delete"
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <Trash2 size={18} />
          Remove
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDashboardCard;
