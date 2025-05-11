import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Svg from "./svgn2";
import SvgI from "./svgn4";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Clock } from "lucide-react";

const ChefStats = ({ icon: Icon, value, label }) => (
  <motion.div
    className="flex flex-col items-center p-4 bg-green-khzy/30 backdrop-blur-sm rounded-lg border border-yellow-gold/20"
    whileHover={{ scale: 1.05, backgroundColor: "rgba(154, 125, 87, 0.1)" }}
    transition={{ duration: 0.3 }}
  >
    <Icon className="w-8 h-8 text-yellow-gold mb-2" />
    <div className="text-2xl font-bold text-yellow-gold mb-1">{value}</div>
    <div className="text-sm text-gray-300">{label}</div>
  </motion.div>
);

const OurChef = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const stats = [
    {
      icon: Award,
      value: "15+",
      label: "Awards Won",
    },
    {
      icon: Users,
      value: "10k+",
      label: "Happy Customers",
    },
    {
      icon: Clock,
      value: "20+",
      label: "Years Experience",
    },
  ];

  return (
    <section
      id="chef"
      ref={ref}
      className="relative min-h-screen z-22 flex flex-col items-center justify-center bg-green-khzy text-yellow-gold px-6 py-20"
    >
      <div className="absolute z-10 top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1 opacity-50"></div>
      <div className="absolute z-10 top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1 opacity-50"></div>
      <div className="absolute z-10 top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1 opacity-50"></div>
      <div className="absolute z-10 top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1 opacity-50"></div>

      {/* Header */}
      <motion.p
        className="jdid text-lg uppercase z-20 text-yellow-gold tracking-wider mb-2"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        Meet Our Chef
      </motion.p>

      <motion.h1
        className="text-5xl flex z-20 gap-x-4 items-center md:text-6xl mb-12"
        style={{ fontFamily: "font1, sans-serif" }}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
      >
        <Svg />
        Our Chef
        <Svg />
      </motion.h1>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full max-w-4xl z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
      >
        {stats.map((stat, index) => (
          <ChefStats key={index} {...stat} />
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="flex z-20 flex-col md:flex-row items-center justify-center gap-12 w-full max-w-6xl">
        {/* Left Image */}
        <motion.div
          className="relative group"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img
            src="/pic/inner-pages-img-16.jpg"
            alt="Chef at Work"
            className="w-full md:w-[400px] h-[500px] object-cover rounded-lg shadow-lg transform transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        </motion.div>

        {/* Center Text */}
        <motion.div
          className="w-full md:w-auto flex flex-col justify-center items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        >
          <p className="text-lg text-gray-300 max-w-xl leading-relaxed mb-8">
            With over two decades of culinary expertise, our head chef brings a
            unique blend of traditional techniques and innovative approaches to
            every dish. Their passion for creating memorable dining experiences
            has earned them numerous accolades and the admiration of food
            enthusiasts worldwide.
          </p>
          <Link to="/chefs">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#ffcc00" }}
              whileTap={{ scale: 0.95 }}
              className="text-yellow-gold px-8 py-4 border-2 border-yellow-gold text-lg font-medium transition duration-300 shadow-lg hover:shadow-yellow-gold/30 flex items-center"
            >
              Meet Our Team
              <ArrowRight className="ml-2" size={20} />
            </motion.button>
          </Link>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="relative group"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img
            src="/pic/inner-pages-img-17.jpg"
            alt="Signature Dish"
            className="w-full md:w-[400px] h-[500px] object-cover rounded-lg shadow-lg transform transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
      >
        <SvgI />
      </motion.div>
    </section>
  );
};

export default OurChef;
