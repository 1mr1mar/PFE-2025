import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Svg from "./svgn2";
import { Quote } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const reviews = [
  {
    name: "Sarah M.",
    role: "Food Critic",
    rating: 5,
    comment: "Absolutely delicious! The atmosphere was perfect. Every dish tells a story, and the service is impeccable. A true culinary journey that exceeded all expectations.",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "John D.",
    role: "Regular Customer",
    rating: 5,
    comment: "Great service and tasty food. The attention to detail in every aspect of the dining experience is remarkable. The wine selection perfectly complements the menu.",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Emily R.",
    role: "Food Blogger",
    rating: 5,
    comment: "A wonderful experience from start to finish. The chef's creativity shines through in every dish. The seasonal menu keeps me coming back for more.",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

const ReviewsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <section
      id="reviews"
      ref={ref}
      className="relative min-h-screen border-t-1 border-[var(--line-theme)] z-22 flex flex-col items-center justify-center bg-[var(--bg-theme)] text-[var(--text-theme)] px-6 py-20"
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
        Testimonials
      </motion.p>

      <motion.h1
        className="text-5xl flex z-20 gap-x-4 items-center md:text-6xl mb-12"
        style={{ fontFamily: "font1, sans-serif" }}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
      >
        <Svg />
        Customer Reviews
        <Svg />
      </motion.h1>

      <motion.div
        className="max-w-6xl mx-auto w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
      >
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-[var(--bg1-theme)]/30 backdrop-blur-sm p-8 rounded-lg border border-[var(--line-theme)]/20 h-full"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(154, 125, 87, 0.1)" }}
            >
              <Quote className="w-8 h-8 text-[var(--text-theme)] mb-4" />
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="text-[var(--text-theme)] fill-[var(--text-theme)]" />
                ))}
              </div>
              <p className="text-[var(--text1-theme)] mb-6 leading-relaxed italic">
                "{review.comment}"
              </p>
              <div className="flex items-center">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 border border-[var(--line-theme)]/30"
                />
                <div>
                  <h3 className="text-[var(--text-theme)] font-semibold">
                    {review.name}
                  </h3>
                  <p className="text-[var(--text1-theme)] text-sm">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link to="/reviews">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "var(--line-theme)" }}
              whileTap={{ scale: 0.95 }}
              className="text-[var(--text-theme)] px-8 py-4 border-2 border-[var(--line-theme)] text-lg font-medium transition duration-300 shadow-lg hover:shadow-[var(--line-theme)]/30"
            >
              View All Reviews
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ReviewsSection;
