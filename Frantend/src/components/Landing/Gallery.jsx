import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Svg from "./svgn2";
import { useTheme } from "../../contexts/ThemeContext";
import "./gallery.css";
import { v4 as uuidv4 } from 'uuid';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const images = [
    {
      src: "/pic/pic1-homme.jpg",
      alt: "Restaurant Interior",
      category: "interior",
    },
    {
      src: "/pic/portfolio-large-img-3.jpg",
      alt: "Delicious Dish",
      category: "food",
    },
    {
      src: "/pic/home-4-img-2.jpg",
      alt: "Chef at Work",
      category: "chef",
    },
    {
      src: "/pic/portfolio-large-img-2.jpg",
      alt: "Special Event",
      category: "event",
    },
    {
      src: "/pic/inner-pages-gallery-img-2.jpg",
      alt: "Wine Selection",
      category: "drinks",
    },
    {
      src: "/pic/inner-pages-gallery-img-7.jpg",
      alt: "Dessert Display",
      category: "food",
    },
  ];

  const categories = ["all", "interior", "food", "chef", "event", "drinks"];

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((image) => image.category === activeCategory);

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative min-h-screen z-22 flex flex-col items-center justify-center bg-[var(--bg-theme)] text-[var(--text-theme)] px-6 py-20"
    >
      {/* Decorative lines */}
      <div className="absolute z-10 top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-[var(--line1-theme)]/30"></div>
      <div className="absolute z-10 top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-[var(--line1-theme)]/30"></div>
      <div className="absolute z-10 top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-[var(--line1-theme)]/30"></div>
      <div className="absolute z-10 top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-[var(--line1-theme)]/30"></div>

      {/* Gallery Title */}
      <motion.p
        className="jdid text-lg uppercase z-20 text-[var(--text-theme)] tracking-wider mb-2"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        Our Gallery
      </motion.p>

      <motion.h1
        className="text-5xl flex z-20 gap-x-4 items-center md:text-6xl mb-8"
        style={{ fontFamily: "font1, sans-serif" }}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
      >
        <Svg />
        Photo Gallery
        <Svg />
      </motion.h1>

      {/* Category Filter */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mb-12 z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300 ${
              activeCategory === category
                ? "bg-[var(--line-theme)] text-[var(--bg-theme)]"
                : "bg-[var(--bg1-theme)] text-[var(--text-theme)] hover:bg-[var(--line-theme)]/20"
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
      >
        {filteredImages.map((image, index) => (
          <motion.div
            key={index}
            className="relative group overflow-hidden rounded-lg cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-theme)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-[var(--text-theme)] text-lg font-medium">
                {image.alt}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-[var(--bg-theme)]/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <button
              className="absolute top-4 right-4 text-[var(--text-theme)] hover:text-[var(--line-theme)] transition-colors duration-300"
              onClick={() => setSelectedImage(null)}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
