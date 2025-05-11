import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Navbar from "./Navbar";
import Svg from "./svgn2";
import Herosvg from "../../herosvg";
import "../../App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// background images
const backgrounds = [
  "/pic/home-8-img-shop-5.jpg",
  "/pic/menu1.jpg",
  "/pic/main-img-1.jpg",
];

// text for each background image
const texts = [
  {
    tag: "Welcome to Our Culinary Journey",
    title: "Exquisite Dining Experience",
    description: "Discover the perfect blend of traditional flavors and modern culinary artistry",
  },
  {
    tag: "A Taste of Excellence",
    title: "Signature Dishes",
    description: "Experience our chef's masterpieces crafted with passion and premium ingredients",
  },
  {
    tag: "Fine Dining Redefined",
    title: "Elegant Atmosphere",
    description: "Immerse yourself in an ambiance of sophistication and exceptional service",
  },
];

const Hero = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const bgElement = document.querySelector(".hero-background");
    if (bgElement) {
      bgElement.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
    setIsScrolled(scrollPosition > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home" className="relative z-21 h-screen flex items-center justify-center">
      {/* background and content */}
      <div className="absolute inset-0 w-full h-full hero-background">
        <AnimatePresence>
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 3,
              ease: "easeInOut",
            }}
            className="absolute inset-0 w-full h-full bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage: `url(${backgrounds[bgIndex]})`,
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
            
            <Navbar isScrolled={isScrolled} />
            <div className="text-yellow-gold text-center items-center px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 w-full max-w-7xl mx-auto mt-16">
              {/* Tagline with new animation */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: 0.7,
                }}
                className="text-base sm:text-lg md:text-xl jdid text-yellow-gold mb-4 sm:mb-6 md:mb-8 font-light tracking-wider uppercase"
              >
                {texts[bgIndex].tag}
              </motion.p>

              {/* Title with enhanced animation */}
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: 0.5,
                }}
                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-custom mb-4 sm:mb-6 relative"
                style={{
                  fontFamily: "font1, sans-serif",
                }}
              >
                <span className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
                  <Svg className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
                  {texts[bgIndex].title}
                  <Svg className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: 1,
                }}
                className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 md:mb-10 font-light max-w-3xl mx-auto leading-relaxed px-4"
              >
                {texts[bgIndex].description}
              </motion.p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#ffcc00" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut",
                    delay: 1.5,
                  }}
                  className="text-yellow-gold flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-yellow-gold text-base sm:text-lg font-medium transition duration-300 shadow-lg hover:shadow-yellow-gold/30 w-full sm:w-auto"
                >
                  View Menu
                  <ArrowRight className="ml-2" size={20} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#ffcc00" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut",
                    delay: 1.7,
                  }}
                  className="bg-yellow-gold text-green-ziti flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium transition duration-300 shadow-lg hover:shadow-yellow-gold/30 w-full sm:w-auto"
                >
                  Book a Table
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-yellow-gold"
      >
        <span className="text-xs sm:text-sm mb-2">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} className="sm:w-6 sm:h-6" />
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="hidden md:block absolute cursor-pointer left-10 top-1/2 transform -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity">
        <Herosvg />
      </div>

      <div className="hidden md:block absolute cursor-pointer right-10 top-1/2 transform rotate-180 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity">
        <Herosvg />
      </div>
    </section>
  );
};

export default Hero;
