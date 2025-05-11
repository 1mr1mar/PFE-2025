/*import React from "react";
import Hero from "./Landing/Hero";
import About from "./Landing/About";
import Gallery from "./Landing/Gallery";
import Menu from "./Landing/Menu";
import OurChef from "./Landing/OurChef";
import Booking from "./Landing/Booking";
import ContactUs from "./Landing/ContactUs";
import Footer from "./Landing/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../app.css";

const Landing = () => {
  return (
    <div className=" relative min-h-screen">
      {/* 2 lines r and l  
      <div className="fixed z-50 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="fixed z-50 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>

      {/*  the 4 inside <div className="fixed z-1 top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold"></div>   
      <div className="fixed z-1 top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold"></div>
      <div className="fixed z-1 top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold"></div>  
      <div className="fixed z-1 top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold"></div>  

      <Hero />
      <About />
      <Gallery />
      <Menu />
      <OurChef />
      <Booking />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Landing;*/
// Landing.js

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Hero from "./Landing/Hero";
import About from "./Landing/About";
import Gallery from "./Landing/Gallery";
import Menu from "./Landing/Menu";
import OurChef from "./Landing/OurChef";
import Booking from "./Landing/Booking";
import ContactUs from "./Landing/ContactUs";
import Footer from "./Landing/Footer";
import Svg from "../herosvg";
import Reviews from "./Landing/ReviewsSection";

// Import slick-carousel CSS with proper order
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Landing = () => {
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const aboutSectionTop = aboutSection.getBoundingClientRect().top;
        setShowScrollTop(aboutSectionTop < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Decorative lines - hidden on mobile, visible on larger screens */}
      <div className="fixed z-50 top-0 left-[5%] h-full w-[1px] bg-yellow-gold hidden md:block"></div>
      <div className="fixed z-50 top-0 right-[5%] h-full w-[1px] bg-yellow-gold hidden md:block"></div>

      {/* Main content sections with proper spacing and z-index */}
      <div className="relative z-10" id="home">
        <Hero />
      </div>
      <div className="relative z-10" id="about">
        <About />
      </div>
      <div className="relative z-10" id="gallery">
        <Gallery />
      </div>
      <div className="relative z-10" id="menu">
        <Menu />
      </div>
      <div className="relative z-10" id="chef">
        <OurChef />
      </div>
      <div className="relative z-10" id="booking">
        <Booking />
      </div>
      <div className="relative z-10" id="reviews">
        <Reviews />
      </div>
      <div className="relative z-10" id="contact">
        <ContactUs />
      </div>

      <Footer />

      {/* Scroll to top button - responsive positioning and size */}
      <div 
        className={`fixed z-50 bottom-4 right-4 md:bottom-6 md:right-6 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <button
          onClick={() => {
            const el = document.getElementById("home");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="text-black rounded-full shadow-lg bg-transparent hover:bg-yellow-gold1 p-2 md:p-3 transition duration-300"
          aria-label="Scroll to top"
        >
          <div className="transform rotate-90 w-6 h-6 md:w-8 md:h-8">
            <Svg />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Landing;




