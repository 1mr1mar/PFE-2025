import React, { useState } from "react";
import { FaTrash, FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      product: "Grilled Salmon",
      rating: 5,
      comment: "An absolutely delightful dish! Fresh and flavorful.",
    },
    {
      id: 2,
      product: "Vegetarian Pizza",
      rating: 4,
      comment: "A tasty and healthy option. The crust was perfect.",
    },
    {
      id: 3,
      product: "Chocolate Cake",
      rating: 5,
      comment: "Rich and decadent, one of the best cakes I've had!",
    },
  ]);

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      const newReviews = [...reviews];
      newReviews.splice(index, 1);
      setReviews(newReviews);
    }
  };

  return (
    <div className="p-8 bg-green-ziti min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl text-center pt-10 text-yellow-gold1 mb-6 font-serif tracking-wide"
            style={{ fontFamily: "font1, serif" }}
          >
            Customer Reviews
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="bg-green-ziti rounded-3xl shadow-2xl p-6 text-gray-300 border border-yellow-gold1/20 backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold text-yellow-gold1 mb-3 font-serif">{review.product}</h3>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? "text-yellow-gold1" : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-200 mb-4 italic">{review.comment}</p>
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-green-800/50 transition-colors duration-300"
                    onClick={() => handleDelete(index)}
                    aria-label={`Delete ${review.product}`}
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
