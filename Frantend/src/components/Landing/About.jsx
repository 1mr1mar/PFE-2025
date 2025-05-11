import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SvgIcon from "./costumsvg";
import Svg from "./svgn2";
import { Clock, Users, Award } from "lucide-react";
import "../../App.css";

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const stats = [
    {
      icon: <Clock className="w-8 h-8" />,
      value: "15+",
      label: "Years of Excellence",
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: "50k+",
      label: "Happy Customers",
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "25+",
      label: "Awards Won",
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen z-22 flex flex-col items-center justify-center bg-green-ziti text-yellow-gold px-6 py-20"
    >
      {/* Decorative lines */}
      <div className="absolute z-10 top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1 opacity-50"></div>
      <div className="absolute z-10 top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1 opacity-50"></div>
      <div className="absolute z-10 top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1 opacity-50"></div>
      <div className="absolute z-10 top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1 opacity-50"></div>

      {/* Our Story */}
      <motion.p
        className="jdid text-lg uppercase z-20 text-yellow-gold tracking-wider mb-2"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      >
        Our Story
      </motion.p>

      {/* About Us */}
      <motion.h1
        className="text-5xl flex z-20 gap-x-4 items-center md:text-6xl mb-8"
        style={{ fontFamily: "font1, sans-serif" }}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
      >
        <Svg />
        About Us
        <Svg />
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-lg z-20 text-gray-300 max-w-3xl text-center mb-16 leading-relaxed"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
      >
        Welcome to our restaurant, where we blend tradition with innovation to
        create unforgettable dining experiences. Our passion for culinary
        excellence and commitment to exceptional service has made us a beloved
        destination for food enthusiasts and families alike.
      </motion.p>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full max-w-4xl z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center p-6 bg-green-ziti/50 rounded-lg backdrop-blur-sm border border-yellow-gold/20"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(154, 125, 87, 0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-yellow-gold mb-4">{stat.icon}</div>
            <div className="text-3xl font-bold text-yellow-gold mb-2">
              {stat.value}
            </div>
            <div className="text-gray-300 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Images and SVG */}
      <div className="flex z-20 flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-6xl">
        {/* Image 1 */}
        <motion.div
          className="relative group w-full sm:w-[80%] md:w-[400px]"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img
            src="/pic/inner-pages-img-16.jpg"
            alt="Restaurant Interior"
            className="w-full h-[400px] sm:h-[450px] md:h-[500px] object-cover rounded-lg shadow-lg transform transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        </motion.div>

        {/* SVG Icon */}
        <div className="w-full z-20 md:w-auto flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          >
            <SvgIcon />
          </motion.div>
        </div>

        {/* Image 2 */}
        <motion.div
          className="relative group w-full sm:w-[80%] md:w-[400px]"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img
            src="/pic/menu6.jpg"
            alt="Delicious Dish"
            className="w-full h-[400px] sm:h-[450px] md:h-[500px] object-cover rounded-lg shadow-lg transform transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
