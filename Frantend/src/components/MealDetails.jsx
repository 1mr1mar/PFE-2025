import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Landing/Navbar";
import Footer from "./Landing/Footer";
import { motion } from "framer-motion"; 
import Cartsvg from "./cartsvg";
import { Star, ChevronLeft, Plus, Minus } from "lucide-react";

const MealDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/meals/${id}`);
        
        if (!response.data) {
          throw new Error('No data received from the server');
        }
        
        setProduct(response.data);
        setError(null);
      } catch (error) {
        console.error("Detailed error:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        
        if (error.response) {
          setError(`Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
          setError('No response from server. Please check if the server is running.');
        } else {
          setError(`Error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    if (!id) {
      setError('No meal ID provided');
      setLoading(false);
      return;
    }

    fetchMealData();
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + quantity,
        note: note || updatedCart[existingItemIndex].note
      };
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      alert(`Updated quantity of ${product.name} in your cart!`);
    } else {
      const newProduct = { ...product, quantity, note };
      const updatedCart = [...cart, newProduct];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      alert(`${product.name} has been added to your cart!`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-ziti flex items-center justify-center">
        <div className="text-yellow-gold text-2xl animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-green-ziti flex items-center justify-center">
        <div className="text-yellow-gold text-2xl">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-green-ziti flex items-center justify-center">
        <div className="text-yellow-gold text-2xl">Meal not found</div>
      </div>
    );
  }

  return (
    <div className="bg-green-ziti min-h-screen">
      {/* Cart Button */}
      <div className="z-10 flex justify-between items-center pt-4 px-4 sm:px-8">
        <Link to="/cart">
          <div className="cursor-pointer z-50001 fixed top-12 sm:top-4 right-4 flex items-center space-x-2">
            <Cartsvg className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-gold cursor-pointer hover:scale-110 transition-transform duration-300" />
            <span className="text-yellow-gold text-sm sm:text-base">Cart</span>
          </div>
        </Link>
      </div>

      {/* Decorative Lines - Hidden on Mobile */}
      <div className="hidden md:block fixed z-5001 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="hidden md:block fixed z-5001 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>

      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/menu"
            className="inline-flex items-center text-yellow-gold hover:text-yellow-gold1 transition-colors duration-300"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            <span>Back to menu</span>
          </Link>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Image Section */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={`/pic/${product.pic}`}
              alt={product.name}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.target.onerror = null;
                  e.target.src = '/pic/default-meal.jpg';
              }}
            />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-yellow-gold/10 animate-pulse" />
              )}
            </div>
          </motion.div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-yellow-gold" style={{ fontFamily: "font1, sans-serif" }}>
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-gold fill-yellow-gold"
                          : "text-yellow-gold/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-yellow-gold/80">({product.rating}/5)</span>
              </div>
              <p className="text-3xl sm:text-4xl text-yellow-gold font-bold mb-6">
                ${product.price}
              </p>
              <p className="text-lg text-yellow-gold/90 leading-relaxed">
                {product.description}
              </p>
            </motion.div>

            <motion.div
              className="bg-green-khzy/30 rounded-xl p-6 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-yellow-gold/70 text-sm">Category</span>
                  <p className="text-yellow-gold font-medium">{product.category_name}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-yellow-gold/70 text-sm">Popularity</span>
                  <p className="text-yellow-gold font-medium">{product.popularity}</p>
              </div>
              </div>
            </motion.div>

              <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div>
                <label className="block text-yellow-gold font-medium text-xl mb-4">Quantity</label>
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 rounded-full border-2 border-yellow-gold hover:bg-yellow-gold hover:text-green-ziti transition-colors duration-300"
                  >
                    <Minus className="w-6 h-6" />
                  </button>
                  <span className="text-3xl font-bold text-yellow-gold min-w-[40px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 rounded-full border-2 border-yellow-gold hover:bg-yellow-gold hover:text-green-ziti transition-colors duration-300"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
                </div>

                <div>
                <label className="block text-yellow-gold font-medium mb-2">
                  Special Requests
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  placeholder="Any special requests or notes for your order?"
                  className="w-full h-32 bg-transparent border-2 border-yellow-gold rounded-lg p-3 text-yellow-gold placeholder-yellow-gold/50 focus:outline-none focus:border-yellow-gold1 transition-colors duration-300"
                  />
            </div>

            <motion.button
              onClick={handleAddToCart}
                className="w-full bg-yellow-gold text-green-ziti py-4 rounded-lg font-medium text-lg hover:bg-yellow-gold1 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
              Add to Cart
            </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MealDetails;
