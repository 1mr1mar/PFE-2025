import React, { useState } from "react";
import { motion } from "framer-motion";
import "../App.css";
import "../index.css";
import Navbar from "./Landing/Navbar";
import Footer from "./Landing/Footer";
import ContactUs from "./Landing/ContactUs";
import Herosvg from "./Landing/svgn2";
import { Calendar, Clock, Users, Phone, Mail, User, ChevronDown } from "lucide-react";
import { useCustomer } from "../hooks/useCustomer";
import axiosConfig from "../axiosConfig";
import { toast } from "react-toastify";

const Book = () => {
  const customerId = useCustomer();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    guests: "1",
    date: "",
    time: "",
    customer_uuid: customerId
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosConfig.post("/bookings", formData);
      toast.success("Booking submitted successfully!");
      // Reset form after successful submission
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        guests: "1",
        date: "",
        time: "",
        customer_uuid: customerId
      });
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error(error.response?.data?.message || "Failed to submit booking");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="relative min-h-screen bg-green-ziti">
      <div className="fixed z-500 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="fixed z-500 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="absolute z-[-1] top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-[-1] top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-[-1] top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-[-1] top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>

      <Navbar />

      <motion.div
        style={{
          backgroundImage: `url(/pic/pic1-homme.jpg)`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="relative h-[60vh] sm:h-[70vh] w-full flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-green-ziti/60 backdrop-blur-sm"></div>
        
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-yellow-gold text-center px-4 relative z-10 flex items-center gap-4"
          style={{ fontFamily: "font1, sans-serif" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Herosvg className="w-8 h-8 sm:w-12 sm:h-12" />
          Book Your Place Now
          <Herosvg className="w-8 h-8 sm:w-12 sm:h-12" />
        </motion.h1>
      </motion.div>

      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <motion.div
          className="max-w-6xl mx-auto bg-green-khzy/20 border-2 border-yellow-gold/30 rounded-xl p-6 sm:p-8 lg:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative">
                  <label htmlFor="fullName" className="block text-yellow-gold text-lg mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-gold/50" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-transparent border-2 border-yellow-gold/30 rounded-lg text-yellow-gold placeholder-yellow-gold/50 focus:outline-none focus:border-yellow-gold transition-colors duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="email" className="block text-yellow-gold text-lg mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-gold/50" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-transparent border-2 border-yellow-gold/30 rounded-lg text-yellow-gold placeholder-yellow-gold/50 focus:outline-none focus:border-yellow-gold transition-colors duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="phone" className="block text-yellow-gold text-lg mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-gold/50" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-transparent border-2 border-yellow-gold/30 rounded-lg text-yellow-gold placeholder-yellow-gold/50 focus:outline-none focus:border-yellow-gold transition-colors duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative">
                  <label htmlFor="guests" className="block text-yellow-gold text-lg mb-2">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-gold/50" />
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-12 py-4 bg-transparent border-2 border-yellow-gold/30 rounded-lg text-yellow-gold appearance-none focus:outline-none focus:border-yellow-gold transition-colors duration-300"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? "Person" : "People"}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-gold/50 pointer-events-none" />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="date" className="block text-yellow-gold text-lg mb-2">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-gold/50" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-transparent border-2 border-yellow-gold/30 rounded-lg text-yellow-gold focus:outline-none focus:border-yellow-gold transition-colors duration-300"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="time" className="block text-yellow-gold text-lg mb-2">
                    Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-gold/50" />
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-transparent border-2 border-yellow-gold/30 rounded-lg text-yellow-gold focus:outline-none focus:border-yellow-gold transition-colors duration-300"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="text-center pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-yellow-gold text-yellow-gold rounded-lg text-lg font-medium hover:bg-yellow-gold hover:text-green-ziti transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Now
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      <div className="border-t border-yellow-gold/20 mt-12">
        <ContactUs />
      </div>
      <Footer />
    </section>
  );
};

export default Book;
