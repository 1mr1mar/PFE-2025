import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaUtensils,
  FaShoppingCart,
  FaUsers,
  FaHome,
  FaClipboardList,
  FaStar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/admin/login");
  };

  const navItems = [
    { to: "/admin", icon: <FaHome />, label: "Dashboard" },
    { to: "/admin/menu", icon: <FaUtensils />, label: "Menu" },
    { to: "/admin/orders", icon: <FaClipboardList />, label: "Orders" },
    { to: "/admin/bookings", icon: <FaUsers />, label: "Bookings" },
    { to: "/admin/chefs", icon: <FaUsers />, label: "Chefs" },
    { to: "/admin/reviews", icon: <FaStar />, label: "Reviews" },
    { to: "/admin/sittings", icon: <FaCog />, label: "Settings" },
  ];

  return (
    <div className="h-screen w-full flex overflow-hidden font1 bg-green-khzy text-yellow-gold1">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-green-ziti text-yellow-gold1 lg:hidden hover:bg-green-800 transition-colors duration-300"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed lg:static h-screen w-64 bg-green-ziti border-r border-yellow-gold/20 p-4 flex flex-col shadow-lg z-40"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl mb-8 border-b border-yellow-gold/20 pb-4 text-center text-yellow-gold1"
              style={{ fontFamily: "font1, sans-serif" }}
            >
              Admin Panel
            </motion.h2>

            <nav className="flex-1 space-y-2 overflow-y-auto">
              {navItems.map((item, index) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  isActive={location.pathname === item.to}
                  delay={index * 0.1}
                />
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-khzy hover:text-yellow-gold transition-all duration-300 w-full group"
              >
                <span className="text-lg transform group-hover:scale-110 transition-transform">
                  <FaSignOutAlt />
                </span>
                <span>Logout</span>
              </button>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 h-screen overflow-y-auto bg-green-khzy">
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ to, icon, label, isActive, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
  >
    <Link
      to={to}
      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group ${
        isActive
          ? "bg-green-khzy text-yellow-gold shadow-lg"
          : "hover:bg-green-khzy hover:text-yellow-gold"
      }`}
    >
      <span
        className={`text-lg transform group-hover:scale-110 transition-transform ${
          isActive ? "text-yellow-gold" : ""
        }`}
      >
        {icon}
      </span>
      <span className={isActive ? "font-semibold" : ""}>{label}</span>
    </Link>
  </motion.div>
);

export default DashboardLayout;
