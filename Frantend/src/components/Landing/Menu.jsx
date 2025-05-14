import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SvgIcon3 from "./svgn3";
import Svg from "./svgn2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import MainMenu from "../MainMenu";
import { ArrowRight } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const MenuItem = ({ name, description, price, delay }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-start px-6 py-8 bg-[var(--bg1-theme)]/30 backdrop-blur-sm rounded-lg border border-[var(--line-theme)]/10 hover:border-[var(--line-theme)]/30 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(154, 125, 87, 0.1)" }}
    >
      <div className="flex justify-between w-full items-center">
        <h3 className="text-lg font-semibold text-[var(--text-theme)] uppercase tracking-wide">
          {name}
        </h3>
        <div className="flex items-center">
          <span className="text-sm text-[var(--text-theme)]/70 mr-2">$</span>
          <p className="text-xl font-bold text-[var(--text-theme)]">{price}</p>
        </div>
      </div>

      <div className="border-t border-[var(--line-theme)]/20 w-full my-3"></div>

      <p className="text-[var(--text1-theme)] text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

const Menu = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const menuItems = [
    {
      name: "Beef Burger Meal",
      description: "Classic Greek salad, barrel aged feta cheese, bread",
      price: "32",
    },
    {
      name: "Roasted Lamb Rump",
      description: "Grilled lamb cutlets, pomegranate glaze, butternut squash",
      price: "25",
    },
    {
      name: "Pan Seared Sea Bass",
      description: "Saffron and mussel's broth, new potatoes, edamame beans",
      price: "38",
    },
    {
      name: "King Prawns and Lobster",
      description: "Creamy saffron, sauce Vierge",
      price: "38",
    },
    {
      name: "Citrus Cured Salmon",
      description: "Horseradish creme fraiche, beetroot mousse, oil",
      price: "41",
    },
    {
      name: "Pan Seared Scallops",
      description: "Saffron, celeriac puree, black pudding, olive oil",
      price: "29",
    },
    {
      name: "Baked Camembert",
      description: "Red onion marmalade, garlic focaccia bread, grilled figs",
      price: "25",
    },
    {
      name: "Braised Ox Cheek Ravioli",
      description: "Mediterranean olives casserole, celeriac puree, mushrooms",
      price: "23",
    },
    {
      name: "Corn Fed Chicken",
      description: "Wild mushrooms, truffle potatoes, braised leeks, carrots",
      price: "17",
    },
    {
      name: "Nduja Pork Chicken Terrine",
      description: "Smoked duck breast, pistachio, smoked pancetta",
      price: "41",
    },
  ];

  return (
    <section id="menu" ref={ref} className="relative px-6 py-20 bg-[var(--bg-theme)] overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute z-10 top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-[var(--line1-theme)]/50"></div>
      <div className="absolute z-10 top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-[var(--line1-theme)]/50"></div>
      <div className="absolute z-10 top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-[var(--line1-theme)]/50"></div>
      <div className="absolute z-10 top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-[var(--line1-theme)]/50"></div>

      <div className="container mx-auto px-6 relative z-20">
        <motion.p
          className="jdid text-sm text-center text-[var(--text-theme)] tracking-wide uppercase mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Special Selection
        </motion.p>

        <motion.h2
          className="text-4xl text-center text-[var(--text-theme)] mb-12 tracking-wider"
          style={{ fontFamily: "font1, sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="flex justify-center gap-x-4 items-center">
            <Svg /> Our best specialties <Svg />
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="space-y-6">
            {menuItems.slice(0, 5).map((item, index) => (
              <MenuItem key={index} {...item} delay={0.3 + index * 0.1} />
            ))}
          </div>

          <div className="space-y-6">
            {menuItems.slice(5).map((item, index) => (
              <MenuItem key={index} {...item} delay={0.3 + index * 0.1} />
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link to="/menu">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "var(--line-theme)" }}
              whileTap={{ scale: 0.95 }}
              className="text-[var(--text-theme)] px-8 py-4 border-2 border-[var(--line-theme)] text-lg font-medium transition duration-300 shadow-lg hover:shadow-[var(--line-theme)]/30 flex items-center mx-auto"
            >
              View Full Menu
              <ArrowRight className="ml-2" size={20} />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute right-0 bottom-0 z-10"
        initial={{ opacity: 0, x: 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <SvgIcon3 />
      </motion.div>
    </section>
  );
};

export default Menu;
