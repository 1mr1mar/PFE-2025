import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Landing from "./components/LandingPage";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { v4 as uuidv4 } from "uuid";

import MainMenu from "./components/MainMenu";
import Book from "./components/bookingPage";
import Chefs from "./components/chefs";
import AddReviewForm from "./components/AddReviewForm";
import ReviewsPage from "./components/ReviewsPage";
import MealDetails from "./components/MealDetails";
import CartPage from "./components/CartPage";
import Checkout from "./components/Checkout";

import DashboardLayout from "./components/admin/DashboardLayout";
import DashboardHome from "./components/admin/DashboardHome";
import ChefsPage from "./components/admin/ChefsPage";
import AdminMenu from "./components/admin/AdminMenu";
import AdminOrders from "./components/admin/AdminOrders";
import Bookings from "./components/admin/Bookings";
import Login from "./components/Login";
import ReviewssPage from "./components/admin/ReviewsPage";
import Sittings from "./components/admin/Sittings";

import Chatbot from "./components/Chatbot";

// Create a context for customer ID
export const CustomerContext = React.createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    // Check if customer ID exists in localStorage
    const storedCustomerId = localStorage.getItem('customerId');
    
    if (storedCustomerId) {
      setCustomerId(storedCustomerId);
    } else {
      // Generate new UUID if no customer ID exists
      const newCustomerId = uuidv4();
      localStorage.setItem('customerId', newCustomerId);
      setCustomerId(newCustomerId);
    }
  }, []);

  return (
    <CustomerContext.Provider value={customerId}>
    <Router>
      <Routes>
        {/* Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/book" element={<Book />} />
        <Route path="/chefs" element={<Chefs />} />
        <Route path="/add-review" element={<AddReviewForm />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/product/:id" element={<MealDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        

        {/* Login */}
        <Route path="/admin/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            isLoggedIn ? <DashboardLayout /> : <Navigate to="/admin/login" />
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="chefs" element={<ChefsPage />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="reviews" element={<ReviewssPage />} />
          <Route path="sittings" element={<Sittings />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="z-5000">
        <Chatbot />
      </div>
    </Router>
    </CustomerContext.Provider>
  );  
}

export default App;
