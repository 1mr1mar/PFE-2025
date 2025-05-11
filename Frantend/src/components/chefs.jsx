import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Svg from "./Landing/svgn2";
import { Send, ChefHat, Star } from "lucide-react";

import Navbar from "./Landing/Navbar";
import Footer from "./Landing/Footer";

const chefs = [
  {
    name: "Chef Ahmed Khaled",
    title: "Executive Chef",
    image: "/pic/inner-pages-img-16.jpg",
    bio: "An expert in French cuisine with over 15 years of experience in crafting fine dining dishes.",
    specialties: ["French Cuisine", "Fine Dining", "Wine Pairing"]
  },
  {
    name: "Chef marwan Mansour",
    title: "Pastry Specialist",
    image: "/pic/Meet-the-chef-img.jpg",
    bio: "Passionate about elegant desserts and luxurious French mousses.",
    specialties: ["Pastry", "Desserts", "French Mousses"]
  },
  {
    name: "Chef Sami Youssef",
    title: "Sushi Chef",
    image: "/pic/inner-pages-img-17.jpg",
    bio: "Creates authentic Japanese sushi with a modern artistic twist.",
    specialties: ["Sushi", "Japanese Cuisine", "Modern Fusion"]
  },
];

export default function OurChefs() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="relative min-h-screen bg-green-ziti">
      {/* Decorative Lines */}
      <div className="fixed z-5001 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="fixed z-5001 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="absolute z-1 top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-1 top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-1 top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="absolute z-1 top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>

      <div className="z-10000">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl pt-20 sm:pt-32 min-h-[40vh] flex flex-col justify-center items-center mx-auto text-center px-4">
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl text-yellow-gold flex z-20 gap-x-4 items-center mb-6 sm:mb-8"
          style={{ fontFamily: "font1, sans-serif" }}
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Svg className="w-8 h-8 sm:w-12 sm:h-12" />
          Our Chefs
          <Svg className="w-8 h-8 sm:w-12 sm:h-12" />
        </motion.h1>
        <motion.p 
          className="text-yellow-gold/80 text-lg sm:text-xl max-w-2xl mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Meet our exceptional culinary team, bringing passion and expertise to every dish
        </motion.p>

        {/* Chefs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 z-50 gap-8 sm:gap-10 px-4 w-full">
          {chefs.map((chef, index) => (
            <motion.div
              key={index}
              className="relative z-10 overflow-hidden rounded-xl shadow-2xl"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-ziti via-green-ziti/90 to-transparent p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-yellow-gold mb-2">{chef.name}</h3>
                <p className="text-yellow-gold/90 text-lg mb-3">{chef.title}</p>
                <p className="text-yellow-gold/80 mb-4">{chef.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {chef.specialties.map((specialty, idx) => (
                    <span 
                      key={idx}
                      className="text-sm px-3 py-1 bg-yellow-gold/10 text-yellow-gold rounded-full border border-yellow-gold/20"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="w-full border-t border-yellow-gold/20 bg-green-khzy/30 mt-20 sm:mt-32">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24" data-aos="fade-up">
          <motion.p 
            className="text-yellow-gold/80 text-lg sm:text-xl mb-4 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ChefHat className="w-5 h-5" />
            Meet our chefs
          </motion.p>
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl text-yellow-gold flex z-20 gap-x-4 items-center mb-8 sm:mb-12"
            style={{ fontFamily: "font1, sans-serif" }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Svg className="w-6 h-6 sm:w-8 sm:h-8" />
            Leave a Message for the Chef
            <Svg className="w-6 h-6 sm:w-8 sm:h-8" />
          </motion.h2>

          <form className="space-y-6 z-5000">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 bg-transparent text-yellow-gold border-2 border-yellow-gold/30 rounded-lg focus:outline-none focus:border-yellow-gold transition-colors duration-300"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-4 bg-transparent text-yellow-gold border-2 border-yellow-gold/30 rounded-lg focus:outline-none focus:border-yellow-gold transition-colors duration-300"
                />
              </div>
            </div>
            <div>
              <select className="w-full p-4 bg-transparent text-yellow-gold border-2 border-yellow-gold/30 rounded-lg focus:outline-none focus:border-yellow-gold transition-colors duration-300">
                <option value="">Select a Chef</option>
                {chefs.map((chef, idx) => (
                  <option key={idx} value={chef.name}>
                    {chef.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full p-4 bg-transparent text-yellow-gold border-2 border-yellow-gold/30 rounded-lg focus:outline-none focus:border-yellow-gold transition-colors duration-300 resize-none"
              ></textarea>
            </div>
            <div className="text-center">
              <motion.button
                type="submit"
                className="inline-flex items-center gap-2 bg-transparent text-yellow-gold border-2 border-yellow-gold px-8 py-4 rounded-lg text-lg font-medium hover:bg-yellow-gold hover:text-green-ziti transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </section>
  );
}
