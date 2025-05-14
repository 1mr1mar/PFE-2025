import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Svg from "./svgn2";
import SvgI from "./svgn4";
import { Calendar, Clock, Users, Phone, Mail, MapPin } from "lucide-react";
import axiosConfig from "../../axiosConfig";
import { toast } from "react-toastify";
import { useTheme } from "../../contexts/ThemeContext";

const Booking = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axiosConfig.post("/bookings", formData);
      toast.success("Booking submitted successfully! We'll contact you shortly.");
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "2",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error(error.response?.data?.error || "Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
    },
    {
      icon: Mail,
      title: "Email",
      value: "reservations@restaurant.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "123 Gourmet Street, Foodville",
    },
  ];

  return (
    <section
      id="booking"
      ref={ref}
      className="relative min-h-screen z-22 flex flex-col items-center justify-center bg-[var(--bg-theme)] text-[var(--text-theme)] px-6 py-20"
    >
      {/* Decorative lines */}
      <div className="absolute z-10 top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-[var(--line1-theme)]/50"></div>
      <div className="absolute z-10 top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-[var(--line1-theme)]/50"></div>
      <div className="absolute z-10 top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-[var(--line1-theme)]/50"></div>
      <div className="absolute z-10 top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-[var(--line1-theme)]/50"></div>

      {/* Header */}
      <motion.p
        className="jdid text-lg uppercase z-20 text-[var(--text-theme)] tracking-wider mb-2"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        Make a Reservation
      </motion.p>

      <motion.h1
        className="text-5xl flex z-20 gap-x-4 items-center md:text-6xl mb-12"
        style={{ fontFamily: "font1, sans-serif" }}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
      >
        <Svg />
        Book a Table
        <Svg />
      </motion.h1>

      {/* Contact Info */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full max-w-4xl z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
      >
        {contactInfo.map((info, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center p-6 bg-[var(--bg1-theme)]/30 backdrop-blur-sm rounded-lg border border-[var(--line-theme)]/20"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(154, 125, 87, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <info.icon className="w-8 h-8 text-[var(--text-theme)] mb-3" />
            <h3 className="text-lg font-semibold text-[var(--text-theme)] mb-2">{info.title}</h3>
            <p className="text-[var(--text1-theme)] text-center">{info.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Booking Form */}
      <motion.div
        className="w-full max-w-4xl z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
      >
        <form onSubmit={handleSubmit} className="bg-[var(--bg1-theme)]/30 backdrop-blur-sm p-8 rounded-lg border border-[var(--line-theme)]/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[var(--text-theme)] mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--bg-theme)]/30 border border-[var(--line-theme)]/30 rounded-lg text-[var(--text-theme)] focus:outline-none focus:border-[var(--line-theme)] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-[var(--text-theme)] mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--bg-theme)]/30 border border-[var(--line-theme)]/30 rounded-lg text-[var(--text-theme)] focus:outline-none focus:border-[var(--line-theme)] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-[var(--text-theme)] mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--bg-theme)]/30 border border-[var(--line-theme)]/30 rounded-lg text-[var(--text-theme)] focus:outline-none focus:border-[var(--line-theme)] transition-colors"
                  required
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[var(--text-theme)] mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--bg-theme)]/30 border border-[var(--line-theme)]/30 rounded-lg text-[var(--text-theme)] focus:outline-none focus:border-[var(--line-theme)] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-[var(--text-theme)] mb-2">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--bg-theme)]/30 border border-[var(--line-theme)]/30 rounded-lg text-[var(--text-theme)] focus:outline-none focus:border-[var(--line-theme)] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-[var(--text-theme)] mb-2">Number of Guests</label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--bg-theme)]/30 border border-[var(--line-theme)]/30 rounded-lg text-[var(--text-theme)] focus:outline-none focus:border-[var(--line-theme)] transition-colors"
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Person" : "People"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-[var(--text-theme)] mb-2">Special Requests</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[var(--bg-theme)]/30 border border-[var(--line-theme)]/30 rounded-lg text-[var(--text-theme)] focus:outline-none focus:border-[var(--line-theme)] transition-colors h-32"
              placeholder="Any special requests or dietary requirements?"
            ></textarea>
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05, backgroundColor: "var(--line-theme)" }}
            whileTap={{ scale: 0.95 }}
            className={`w-full mt-8 text-[var(--text-theme)] px-8 py-4 border-2 border-[var(--line-theme)] text-lg font-medium transition duration-300 shadow-lg hover:shadow-[var(--line-theme)]/30 flex items-center justify-center ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Book Now"}
          </motion.button>
        </form>
      </motion.div>

      {/* Decorative SVG */}
      <motion.div
        className="absolute bottom-0 left-0 z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 1 }}
      >
        <SvgI />
      </motion.div>
    </section>
  );
};

export default Booking;
