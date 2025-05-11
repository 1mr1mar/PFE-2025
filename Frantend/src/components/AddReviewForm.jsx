import React, { useState } from "react";
import { motion } from "framer-motion"; 

export default function AddReviewForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5); // 5 stars as default 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (name && message) {
      // onsubmit function to handle the review submission
      onSubmit({ name, message, rating, date: new Date().toISOString() });


      
      setName("");
      setMessage("");
      setRating(5);
    } else {
      alert("Please fill in all fields.");
    }
  };

 
  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <motion.div
      className="mt-16 bg-green-ziti p-8  shadow-lg max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }} 
    >
      <motion.h3
        className="text-3xl jdid font-semibold text-yellow-gold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }} 
      >
        Add Your Review
      </motion.h3>
      <motion.form
        onSubmit={handleSubmit}
        className="bg-transparent p-6  border-2 border-green-ziti "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }} 
      >
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <label htmlFor="name" className="block text-yellow-gold1 text-lg">Your Name</label>
          <motion.input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 border-2 border-yellow-gold1 bg-transparent text-yellow-gold placeholder-yellow-gold1 text-lg  mt-2"
            placeholder="Enter your name"
            whileFocus={{ scale: 1.05 }} 
          />
        </motion.div>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }} 
        >
          <label htmlFor="message" className="block text-yellow-gold1 text-lg">Your Message</label>
          <motion.textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-4 border-2 border-yellow-gold1 bg-transparent text-yellow-gold placeholder-yellow-gold1 text-lg  mt-2"
            placeholder="Write your review"
            whileFocus={{ scale: 1.05 }} 
          />
        </motion.div>

        {/*  stars */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }} 
        >
          <label htmlFor="rating" className="block text-yellow-gold1 text-lg">Rating</label>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                onClick={() => handleStarClick(index)} 
                xmlns="http://www.w3.org/2000/svg"
                className={`w-8 h-8 cursor-pointer ${rating > index ? 'text-yellow-gold1' : 'text-gray-400'}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 17.27 18.18 21 15.54 13.97 21 9.24 14.81 8.63 12 2 9.19 8.63 3 9.24 8.46 13.97 5.82 21 12 17.27" />
              </svg>
            ))}
          </div>
        </motion.div>

        <motion.button
          type="submit"
          className="w-full border-1 border-yellow-gold1 bg-green-ziti text-yellow-gold py-3  hover:bg-yellow-gold1 hover:font-bold hover:text-green-ziti transition duration-300"
          whileHover={{ scale: 1.05 }} 
        >
          Submit Review
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
