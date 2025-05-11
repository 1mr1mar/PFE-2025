import React, { useState } from "react";
import AddReviewForm from "./AddReviewForm";
import { motion } from "framer-motion";
import Navbar from "./Landing/Navbar";
import Footer from "./Landing/Footer";
import { Star, ChevronDown, MessageSquare, ThumbsUp } from "lucide-react";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([
    { 
      id: 1, 
      name: "John", 
      message: "The food was amazing! Every dish was perfectly prepared and the flavors were incredible. The service was impeccable.", 
      rating: 5,
      date: "2024-03-15"
    },
    { 
      id: 2, 
      name: "Sarah", 
      message: "Loved the ambiance. The restaurant has such a warm and inviting atmosphere. The staff made us feel like family.", 
      rating: 4,
      date: "2024-03-14"
    },
    {
      id: 3,
      name: "Ali",
      message: "Great service and delicious dishes. The attention to detail in both the food and service is remarkable. Will definitely come back!",
      rating: 5,
      date: "2024-03-13"
    },
  ]);

  const handleNewReview = (newReview) => {
    setReviews((prev) => [...prev, { id: prev.length + 1, ...newReview }]);
  };

  const sortReviews = (value) => {
    let sorted;
    if (value === "rating") {
      sorted = [...reviews].sort((a, b) => b.rating - a.rating);
    } else if (value === "date") {
      sorted = [...reviews].sort(
        (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
      );
    }
    setReviews(sorted);
  };

  return (
    <section className="min-h-screen bg-green-ziti text-yellow-gold relative">
      <Navbar />

      {/* Hero Section with Background Image */}
      <motion.div
        style={{
          backgroundImage: `url(/pic/portfolio-large-img-2.jpg)`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="relative h-[60vh] sm:h-[70vh] w-full border-b border-yellow-gold/20 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-green-ziti/60 backdrop-blur-sm"></div>
        
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-custom text-yellow-gold text-center px-4 relative z-10"
          style={{ fontFamily: "font1, sans-serif" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          What Our Customers Say About Us
        </motion.h1>
      </motion.div>

      {/* Decorative Lines */}
      <div className="fixed z-5000 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="fixed z-5000 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="absolute z-[-1] top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-[-1] top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-[-1] top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-[-1] top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>

      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6"
            style={{ fontFamily: "font1, sans-serif" }}
          >
            Customer Reviews
          </h2>
          <p className="text-yellow-gold/80 text-lg sm:text-xl max-w-2xl mx-auto">
            Discover what our valued customers have to say about their dining experience
          </p>
        </motion.div>

        {/* Sort Controls */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <select
              onChange={(e) => sortReviews(e.target.value)}
              className="appearance-none bg-transparent text-yellow-gold border-2 border-yellow-gold/30 rounded-lg px-6 py-3 pr-12 focus:outline-none focus:border-yellow-gold transition-colors duration-300"
            >
              <option value="">Sort By</option>
              <option value="rating">By Rating</option>
              <option value="date">By Date</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-gold pointer-events-none" />
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto mb-16 sm:mb-20">
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              className="bg-green-khzy/20 border-2 border-yellow-gold/30 rounded-xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-yellow-gold/80" />
                <span className="text-yellow-gold/80 text-sm">
                  {new Date(rev.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-yellow-gold/90 text-lg mb-6 leading-relaxed">"{rev.message}"</p>
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-xl text-yellow-gold">{rev.name}</h4>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < rev.rating
                          ? "text-yellow-gold fill-yellow-gold"
                          : "text-yellow-gold/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Review Form Section */}
        <motion.div
          className="max-w-3xl mx-auto bg-green-khzy/20 border-2 border-yellow-gold/30 rounded-xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <ThumbsUp className="w-12 h-12 mx-auto mb-4 text-yellow-gold" />
            <h3 className="text-2xl sm:text-3xl font-medium text-yellow-gold mb-2">
              Share Your Experience
            </h3>
            <p className="text-yellow-gold/80">
              We'd love to hear about your dining experience
            </p>
          </div>
          <AddReviewForm onSubmit={handleNewReview} />
        </motion.div>
      </div>

      <Footer />
    </section>
  );
};

export default ReviewsPage;
