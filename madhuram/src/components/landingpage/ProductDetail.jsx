import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State for pop-up visibility
  const userToken = localStorage.getItem("token");

  // Fetch product details
  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  // Fetch related products
  useEffect(() => {
    if (product) {
      fetch(`http://localhost:3000/products`)
        .then((res) => res.json())
        .then((data) => {
          const filteredProducts = data
            .filter((p) => p.category === product.category && p._id !== id)
            .slice(0, 4);
          setRelatedProducts(filteredProducts);
        })
        .catch((error) => console.error("Error fetching related products:", error));
    }
  }, [product, id]);

  // Fetch reviews for the product
  useEffect(() => {
    fetch(`http://localhost:3000/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [id]);

  // Add a new review
  const addReview = async () => {
    if (!userToken) {
      setShowLoginPopup(true); // Show pop-up if not logged in
      return;
    }

    if (!newReview.trim()) {
      alert("Review cannot be empty.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/reviews/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ productId: id, message: newReview }),
      });

      const data = await response.json();
      alert(data.message);
      setReviews([...reviews, { message: newReview }]); // Update reviews immediately
      setNewReview("");
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  // Add to Cart
  const addToCart = async () => {
    if (!userToken) {
      setShowLoginPopup(true); // Show pop-up if not logged in
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ productId: id, quantity }),
      });

      const data = await response.json();
      alert(data.message);
      updateCartCount();
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    }
  };

  // Buy Now
  const buyNow = async () => {
    if (!userToken) {
      setShowLoginPopup(true); // Show pop-up if not logged in
      return;
    }

    try {
      await addToCart(); // First, add the item to the cart
      navigate("/checkout"); // Redirect to checkout page
    } catch (error) {
      console.error("Error during buy now:", error);
    }
  };

  // Update cart count in Navbar
  const updateCartCount = async () => {
    try {
      const response = await fetch("http://localhost:3000/cart/count", {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      const data = await response.json();
      window.dispatchEvent(new CustomEvent("cartUpdated", { detail: data.count }));
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  // Handle pop-up close and redirect
  const handlePopupClose = () => {
    setShowLoginPopup(false); // Hide pop-up
    navigate("/my-account"); // Redirect to my-account page
  };

  if (!product) return <div className="text-center py-20 text-xl">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="bg-[#fdf6f0] py-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.img
            src={`http://localhost:3000/${product.image}`}
            alt={product.name}
            className="w-full max-h-[500px] object-cover rounded-3xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          />
          <div>
            <h1 className="text-4xl font-bold text-[#5a3e2b]">{product.name}</h1>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <div className="mt-4 text-2xl font-semibold text-[#ce8628]">₹{product.price}</div>
            <div className="mt-6 flex items-center space-x-4">
              <label className="text-gray-700">Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border px-4 py-2 rounded-lg"
              >
                {[...Array(Math.min(product.stock, 10)).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <span className="text-gray-500">({product.stock} in stock)</span>
            </div>
            <div className="mt-6 flex gap-4">
              <button
                className="bg-[#ce8628] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#ae8474] transition text-lg"
                onClick={addToCart}
              >
                Add to Cart
              </button>
              <button
                className="bg-[#5a3e2b] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#3e2b1e] transition text-lg"
                onClick={buyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16 max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#5a3e2b]">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((p) => (
                <motion.div
                  key={p._id}
                  className="border rounded-lg p-4 shadow-lg cursor-pointer bg-white hover:shadow-xl transition"
                  onClick={() => navigate(`/product/${p._id}`)}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={`http://localhost:3000/${p.image}`}
                    alt={p.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-semibold mt-2">{p.name}</h3>
                  <p className="text-gray-500">₹{p.price}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No related products found.</p>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#5a3e2b]">Reviews</h2>
          <div className="mt-4">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <p key={index} className="text-gray-700 border-b py-2">{review.message}</p>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet. Be the first to write one!</p>
            )}
          </div>

          {/* Add Review Form */}
          {userToken && (
            <div className="mt-6">
              <textarea
                className="w-full p-4 border rounded-lg"
                placeholder="Write a review..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              ></textarea>
              <button
                className="mt-4 bg-[#ce8628] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#ae8474] transition"
                onClick={addReview}
              >
                Submit Review
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Login Pop-up */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-[#5a3e2b]">Please Sign In</h2>
            <p className="mt-2 text-gray-600">You need to be logged in to perform this action.</p>
            <button
              className="mt-4 bg-[#ce8628] text-white py-2 px-6 rounded-xl font-semibold hover:bg-[#ae8474] transition"
              onClick={handlePopupClose}
            >
              Go to My Account
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;