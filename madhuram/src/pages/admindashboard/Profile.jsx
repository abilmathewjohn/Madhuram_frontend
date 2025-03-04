import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null); // null for loading state
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setUser(data.user);
        setFormData({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          phone: data.user.phone || "",
          address: data.user.address || {
            street: "",
            city: "",
            state: "",
            postalCode: "",
          },
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/user/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      setUser(data.user);
      setEditMode(false);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>; // Show a loading state
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        <p className="font-semibold">Error:</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg mt-5">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>

      <div className="space-y-4">
        <div>
          <strong>First Name:</strong>{" "}
          {editMode ? (
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            />
          ) : (
            user.firstName || "N/A"
          )}
        </div>

        <div>
          <strong>Last Name:</strong>{" "}
          {editMode ? (
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            />
          ) : (
            user.lastName || "N/A"
          )}
        </div>

        <div>
          <strong>Phone:</strong>{" "}
          {editMode ? (
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            />
          ) : (
            user.phone || "N/A"
          )}
        </div>

        <div>
          <strong>Address:</strong>{" "}
          {editMode ? (
            <div className="space-y-2">
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                className="border px-2 py-1 w-full"
                placeholder="Street"
              />
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className="border px-2 py-1 w-full"
                placeholder="City"
              />
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                className="border px-2 py-1 w-full"
                placeholder="State"
              />
              <input
                type="text"
                name="address.postalCode"
                value={formData.address.postalCode}
                onChange={handleChange}
                className="border px-2 py-1 w-full"
                placeholder="Postal Code"
              />
            </div>
          ) : (
            // eslint-disable-next-line no-constant-binary-expression
            `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.postalCode}` || "No address provided"
          )}
        </div>

        {editMode ? (
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-1 rounded mt-2"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white px-4 py-1 rounded mt-2"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;