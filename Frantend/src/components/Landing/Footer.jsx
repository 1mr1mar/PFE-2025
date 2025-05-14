import React from 'react';
import { useTheme } from "../../contexts/ThemeContext";

const Footer = () => {
  return (
    <footer className="py-8 md:py-12 bg-[var(--bg-theme)] border-t-1 border-[var(--line-theme)] text-[var(--text-theme)]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="text-center md:text-left">
            <div className="text-xl md:text-2xl text-[var(--text-theme)] font-bold tracking-wide">martest</div>
            <p className="mt-2 text-[var(--text-theme)] font-light text-sm md:text-base">Creative Design & Architecture</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-[var(--text-theme)]">
            <a
              href="#"
              className="relative group text-xs md:text-sm uppercase tracking-widest hover:text-[var(--text1-theme)] transition-colors duration-300 px-2"
            >
              Instagram
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--line-theme)] scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
              <span className="absolute bottom-1 left-0 w-full h-[2px] bg-[var(--line-theme)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </a>
            <a
              href="#"
              className="relative group text-xs md:text-sm uppercase tracking-widest hover:text-[var(--text1-theme)] transition-colors duration-300 px-2"
            >
              Twitter
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--line-theme)] scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
              <span className="absolute bottom-1 left-0 w-full h-[2px] bg-[var(--line-theme)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </a>
            <a
              href="#"
              className="relative group text-xs md:text-sm uppercase tracking-widest hover:text-[var(--text1-theme)] transition-colors duration-300 px-2"
            >
              LinkedIn
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--line-theme)] scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
              <span className="absolute bottom-1 left-0 w-full h-[2px] bg-[var(--line-theme)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </a>
            <a
              href="#"
              className="relative group text-xs md:text-sm uppercase tracking-widest hover:text-[var(--text1-theme)] transition-colors duration-300 px-2"
            >
              Facebook
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--line-theme)] scale-x-0 group-hover:scale-x-100 transition-transform duration-800 origin-left"></span>
              <span className="absolute bottom-1 left-0 w-full h-[2px] bg-[var(--line-theme)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </a>
          </div>
        </div>
        <div className="mt-6 md:mt-8 text-center text-[var(--text-theme)] text-xs md:text-sm font-light">
          &copy; 2025 martest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
