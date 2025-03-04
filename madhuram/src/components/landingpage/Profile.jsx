import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Profile = () => {
  const [user, setUser] = useState(null); // null for loading state
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    // Fetch user profile
    fetch("http://localhost:3000/user/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setFormData({
            firstName: data.user.firstName || "",
            lastName: data.user.lastName || "",
            phone: data.user.phone || "",
            address: data.user.address || "",
          });
        } else {
          setUser({}); // Prevent undefined errors
        }
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/user/profile/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setEditMode(false);
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  if (user === null) {
    return <p className="text-center text-lg">Loading...</p>; // Show a loading state
  }

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg mt-5">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>

        <p><strong>First Name:</strong> {editMode ? (
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="border px-2 py-1" />
        ) : (
          user.firstName || "N/A"
        )}</p>

        <p><strong>Last Name:</strong> {editMode ? (
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="border px-2 py-1" />
        ) : (
          user.lastName || "N/A"
        )}</p>

        <p><strong>Phone:</strong> {editMode ? (
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="border px-2 py-1" />
        ) : (
          user.phone || "N/A"
        )}</p>

        <p><strong>Address:</strong> {editMode ? (
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="border px-2 py-1" />
        ) : (
          user.address || "No address provided"
        )}</p>

        {editMode ? (
          <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded mt-2">Save</button>
        ) : (
          <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white px-4 py-1 rounded mt-2">Edit</button>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
