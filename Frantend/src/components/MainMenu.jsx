import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Landing/Navbar";
import Footer from "./Landing/Footer";
import "../index.css";
import "../App.css";
import Svg from "./Landing/svgn2";
import { Link } from "react-router-dom";
import Cartsvg from "./cartsvg.jsx";
import axios from "axios";

const MainMenu = () => {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState(30);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsData, setProductsData] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [categoriesMap, setCategoriesMap] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const productsPerPage = 6;

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/meals");
        setProductsData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Fetch categories from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => {
        const categories = res.data;
        const categoryNames = categories.map((cat) => cat.name);
        setAllCategories(["All", ...categoryNames]);

        const catMap = {};
        categories.forEach((cat) => {
          catMap[cat.name] = cat.id;
        });
        setCategoriesMap(catMap);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  // Filtering logic
  const filteredProducts = productsData.filter((product) => {
    const matchesCategory =
      categoryFilter === "All" ||
      product.category_id === categoriesMap[categoryFilter];
    const matchesPrice = product.price <= priceFilter;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price":
        return a.price - b.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "popularity":
        return (b.popularity || 0) - (a.popularity || 0);
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative min-h-screen bg-green-ziti text-yellow-gold">
      <div className="z-10 flex justify-between items-center pt-4 px-4 sm:px-8">
        <Link to="/cart">
          <div className="cursor-pointer z-50001 fixed top-12 sm:top-4 right-4 flex items-center space-x-2">
            <Cartsvg className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-gold cursor-pointer hover:scale-110 transition-transform duration-300" />
            <span className="text-yellow-gold text-sm sm:text-base">Cart</span>
          </div>
        </Link>
      </div>

      {/* Grid lines - hidden on mobile */}
      <div className="hidden md:block fixed z-5001 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="hidden md:block fixed z-5001 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="hidden md:block absolute z-10 top-0 left-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="hidden md:block absolute z-10 top-0 left-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="hidden md:block absolute z-10 top-0 right-[calc(8/20*100%)] h-full w-[1px] bg-yellow-gold1"></div>
      <div className="hidden md:block absolute z-10 top-0 right-[calc(4/18*100%)] h-full w-[1px] bg-yellow-gold1"></div>

      <div className="z-10">
        <Navbar style={{ position: "absolute" }} />
      </div>

      <div className="flex z-40 relative flex-col items-center justify-center pt-20 sm:pt-50 px-4 sm:px-8 md:px-16 lg:px-60">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-10 flex z-20 gap-x-2 sm:gap-x-4 items-center mb-6"
          style={{ fontFamily: "font1, sans-serif" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
        >
          <Svg />
          Our menu
          <Svg />
        </motion.h1>

        {/* Mobile Filter Toggle */}
        <button
          className="md:hidden mb-4 px-4 py-2 border border-yellow-gold1 text-yellow-gold hover:bg-yellow-gold hover:text-green-ziti flex items-center gap-2"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          {isFilterOpen ? "Hide Filters" : "Show Filters"}
        </button>

        <div className="flex flex-col lg:flex-row w-full gap-8">
          {/* Left Section - Products */}
          <div className="w-full lg:w-2/3 p-4 sm:p-6">
            {/* Search Bar - Always visible on mobile */}
            <div className="mb-6 md:hidden">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 w-full text-yellow-gold bg-transparent border border-yellow-gold1"
                placeholder="Search by name"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <p className="text-sm sm:text-base">
                Page {currentPage} / {totalPages}
              </p>
              <div className="w-full sm:w-auto">
                <select
                  className="w-full sm:w-auto bg-transparent text-yellow-gold border-1 border-yellow-gold1 p-2"
                  onChange={(e) => setSortOption(e.target.value)}
                  value={sortOption}
                >
                  <option value="latest">Sort by latest</option>
                  <option value="popularity">Sort by popularity</option>
                  <option value="rating">Sort by rating</option>
                  <option value="price">Sort by price</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-transparent items-center text-center w-full p-4 shadow-md"
                >
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={`/pic/${product.pic}`}
                      alt={product.name}
                      className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover mb-4 hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <h3 className="text-lg sm:text-xl font-bold">{product.name}</h3>
                  <p className="text-base sm:text-lg text-yellow-gold">${product.price}</p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 sm:px-4 py-2 border border-yellow-gold1 text-yellow-gold hover:bg-yellow-gold hover:text-green-ziti disabled:opacity-50 text-sm sm:text-base"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 sm:px-4 py-2 border border-yellow-gold1 text-sm sm:text-base ${
                    currentPage === i + 1
                      ? "bg-yellow-gold text-green-ziti"
                      : "text-yellow-gold hover:bg-yellow-gold hover:text-green-ziti"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 sm:px-4 py-2 border border-yellow-gold1 text-yellow-gold hover:bg-yellow-gold hover:text-green-ziti disabled:opacity-50 text-sm sm:text-base"
              >
                Next
              </button>
            </div>
          </div>

          {/* Right Section - Filters */}
          <div className={`w-full lg:w-1/3 p-4 sm:p-6 ${isFilterOpen ? 'block' : 'hidden'} md:block`}>
            {/* Price Filter */}
            <div className="mb-8 w-full">
              <label className="block jdid text-xl sm:text-2xl text-yellow-gold mb-2">
                Price Range
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={priceFilter}
                onChange={(e) => setPriceFilter(Number(e.target.value))}
                className="slider w-full h-2 bg-gray-300 rounded-lg"
              />
              <div className="mt-4 text-white flex justify-between text-sm sm:text-base">
                <span>Min: $0</span>
                <span>Max: ${priceFilter}</span>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-8 w-full">
              <label className="block text-xl sm:text-2xl text-yellow-gold mb-2">
                Categories
              </label>
              <select
                className="w-full bg-transparent text-yellow-gold border-1 border-yellow-gold1 p-2"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {allCategories.length > 0 ? (
                  allCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading categories...</option>
                )}
              </select>
            </div>

            {/* Search Filter - Only visible on desktop */}
            <div className="mb-8 hidden md:block">
              <label className="block text-xl sm:text-2xl text-yellow-gold mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 w-full text-yellow-gold bg-transparent border border-yellow-gold1"
                placeholder="Search by name"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainMenu;
