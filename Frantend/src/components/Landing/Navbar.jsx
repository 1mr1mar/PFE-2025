/*import React, { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-transparent backdrop-blur-xs text-white shadow-md w-full top-0 left-0 p-4 z-50 fixed border-b border-yellow-gold1">
      <div className="container mx-auto flex items-center w-full justify-center relative">
        
        {/* Desktop Menu 
        <div className="hidden lg:flex items-center text-lg space-x-6 xl:space-x-10">
          <a
            href="#"
            className="relative group text-lg text-white hover:text-white hover:scale-120 transition duration-300"
          >
            HOME
        
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
          
            <span className="absolute bottom-1 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </a>
          <a
            href="#"
            className="relative group hover:text-white hover:scale-120 transition duration-300"
          >
            About
          
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
           
            <span className="absolute bottom-1 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </a>
          <a
            href="#"
            className="relative group hover:text-white hover:scale-120 transition duration-300"
          >
            Gallery
          
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
          
            <span className="absolute bottom-1 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </a>

          
          <img
            src="/pic/logo1.png"
            alt="Logo"
            className="h-12 md:h-20 shadow-lg hover:opacity-80 transition duration-300 mx-6"
          />

          <a
            href="#"
            className="relative group hover:text-white hover:scale-120 transition duration-300"
          >
            Menu
          
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
         
            <span className="absolute bottom-1 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </a>
          <a
            href="#"
            className="relative group hover:text-white hover:scale-120 transition duration-300"
          >
            Our Chef
          
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
           
            <span className="absolute bottom-1 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </a>
          <a
            href="#"
            className="relative group hover:text-white hover:scale-120 transition duration-300"
          >
            Contact Us
           
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
          
            <span className="absolute bottom-1 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </a>
        </div>

       
        <div className="lg:hidden absolute right-4">
          <button
            onClick={toggleMenu}
            className="text-amber-300 hover:text-white transition duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

     
      {isMenuOpen && (
        <div className="lg:hidden bg-transparent bg-opacity-90 shadow-lg mt-4 p-4 rounded-md flex flex-col items-center">
          <div className="flex justify-center mb-4">
            <img
              src="/pic/logo1.png"
              alt="Logo"
              className="h-16 shadow-lg hover:opacity-80 transition duration-300"
            />
          </div>
          <a
            href="#"
            className="block relative group text-lg hover:text-white transition duration-300 text-center"
          >
            HOME
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            <span className="absolute bottom-1 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></span>
          </a>
          <a
            href="#"
            className="block relative group hover:text-white transition duration-300 text-center"
          >
            About
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            <span className="absolute bottom-1 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></span>
          </a>
          <a
            href="#"
            className="block relative group hover:text-white transition duration-300 text-center"
          >
            Gallery
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            <span className="absolute bottom-1 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></span>
          </a>
          <a
            href="#"
            className="block relative group hover:text-white transition duration-300 text-center"
          >
            Menu
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            <span className="absolute bottom-1 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></span>
          </a>
          <a
            href="#"
            className="block relative group hover:text-white transition duration-300 text-center"
          >
            Our Chef
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            <span className="absolute bottom-1 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></span>
          </a>
          <a
            href="#"
            className="block relative group hover:text-white transition duration-300 text-center"
          >
            Contact Us
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            <span className="absolute bottom-1 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></span>
          </a>
          <div className="flex justify-center mt-4">
            <button className="bg-amber-300 text-black px-4 py-2 shadow-md hover:bg-amber-400 transition duration-300">
              BOOK NOW
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;*/


import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (sectionId) => {
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false); 
  };

  return (
    <nav className="bg-transparent  backdrop-blur-xs text-white shadow-md w-full top-0 left-0 p-4 z-5000 fixed border-b border-yellow-gold1">
      <div className="container mx-auto flex items-center w-full justify-center relative">
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center text-lg space-x-6 xl:space-x-10">
          {["home", "about", "gallery", "menu", "chef","booking","reviews", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => handleNavClick(section)}
              className="relative group text-lg text-white hover:text-white hover:scale-120 transition duration-300"
            >
              {section === "home" ? "HOME" :
               section === "chef" ? "Our Chef" :
               section === "contact" ? "Contact Us" :
               section.charAt(0).toUpperCase() + section.slice(1)}

              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
              <span className="absolute bottom-1 left-0 w-full h-[2px] bg-yellow-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden absolute right-4">
          <button
            onClick={toggleMenu}
            className="text-amber-300 hover:text-white transition duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-transparent bg-opacity-90 shadow-lg mt-4 p-4 rounded-md flex flex-col items-center">
          {["home", "about", "gallery", "menu", "chef", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => handleNavClick(section)}
              className="block relative group text-lg hover:text-white transition duration-300 text-center"
            >
              {section === "home" ? "HOME" :
               section === "chef" ? "Our Chef" :
               section === "contact" ? "Contact Us" :
               section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
          <div className="flex justify-center mt-4">
            <button className="bg-amber-300 text-black px-4 py-2 shadow-md hover:bg-amber-400 transition duration-300">
              BOOK NOW
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
