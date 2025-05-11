import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Cartsvg from "./cartsvg";
import { Trash2, ChevronLeft, Plus, Minus, ShoppingBag, User, Phone, Mail, MapPin, CreditCard, Table } from "lucide-react";
import { useCustomer } from "../hooks/useCustomer";
import axiosConfig from "../axiosConfig";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Initialize Stripe with correct configuration
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


// Stripe Payment Form Component
const StripePaymentForm = ({ amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    
    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please try again.");
      return;
    }

    setProcessing(true);

    try {
      // Create payment intent on your backend
      const { data: clientSecret } = await axiosConfig.post("/api/payments/create-payment-intent", {
        amount: Math.round(parseFloat(amount) * 100), // Convert to cents
      });

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        onError(stripeError.message);
      } else if (paymentIntent.status === "succeeded") {
        onSuccess(paymentIntent);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Payment failed. Please try again.";
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
          {error}
        </div>
      )}
      <div className="p-4 bg-white/10 rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#FCD34D',
                '::placeholder': {
                  color: '#FCD34D80',
                },
                backgroundColor: 'transparent',
                ':-webkit-autofill': {
                  color: '#FCD34D',
                },
              },
              invalid: {
                color: '#FF5252',
                iconColor: '#FF5252',
              },
            },
            hidePostalCode: true,
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full bg-yellow-gold text-green-ziti p-4 rounded-lg text-center text-lg font-medium transition-all duration-300 ${
          processing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-gold1'
        }`}
      >
        {processing ? "Processing..." : `Pay $${parseFloat(amount).toFixed(2)}`}
      </button>
    </form>
  );
};

// Utility Functions to Manage Cart Logic
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getCartFromLocalStorage = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return Array.isArray(cart) ? cart : [];
};

const removeItemFromCart = (cart, productId) => {
  const updatedCart = cart.filter(item => item.id !== productId);
  saveCartToLocalStorage(updatedCart);
  return updatedCart;
};

const updateItemQuantity = (cart, productId, newQuantity) => {
  if (newQuantity < 1) return cart;
  const updatedCart = cart.map(item => 
    item.id === productId ? { ...item, quantity: newQuantity } : item
  );
  saveCartToLocalStorage(updatedCart);
  return updatedCart;
};

const calculateTotal = (cart) => {
  return cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
};

// CartPage Component
const CartPage = () => {
  const customerId = useCustomer();
  const [cartItems, setCartItems] = useState([]);
  const [isRemoving, setIsRemoving] = useState(null);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    orderType: "delivery", // delivery, pickup, or table
    address: "",
    notes: "",
    paymentMethod: "cash", // cash or card
    tableId: null
  });
  const [activeBooking, setActiveBooking] = useState(null);
  const [showStripeForm, setShowStripeForm] = useState(false);

  useEffect(() => {
    const storedCart = getCartFromLocalStorage();
    setCartItems(storedCart);
    // Fetch customer info and active booking
    fetchCustomerInfo();
  }, []);

  const fetchCustomerInfo = async () => {
    if (!customerId) {
      console.log("No customer ID available");
      return;
    }

    try {
      // Fetch customer info from bookings
      const bookingsResponse = await axiosConfig.get(`/api/bookings/customer/${customerId}`);
      if (bookingsResponse.data && bookingsResponse.data.length > 0) {
        const latestBooking = bookingsResponse.data[0];
        setCustomerInfo(prev => ({
          ...prev,
          name: latestBooking.name || "",
          phone: latestBooking.phone || "",
          email: latestBooking.email || ""
        }));

        // Check if there's an active booking for today
        const today = new Date().toISOString().split('T')[0];
        const activeBooking = bookingsResponse.data.find(booking => 
          booking.date === today && 
          booking.status === "confirmed"
        );

        if (activeBooking) {
          setActiveBooking(activeBooking);
          setCustomerInfo(prev => ({
            ...prev,
            orderType: "table",
            tableId: activeBooking.tableId
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching customer info:", error);
      // Don't show error toast for missing customer info
      if (error.response?.status !== 404) {
        toast.error("Failed to fetch customer information");
      }
    }
  };

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRemoveFromCart = (productId) => {
    setIsRemoving(productId);
    setTimeout(() => {
      const updatedCart = removeItemFromCart(cartItems, productId);
      setCartItems(updatedCart);
      setIsRemoving(null);
    }, 300);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = updateItemQuantity(cartItems, productId, newQuantity);
    setCartItems(updatedCart);
  };

  const handleCheckout = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    if (customerInfo.paymentMethod === "card") {
      setShowStripeForm(true);
      return;
    }

    try {
      const orderData = {
        items: cartItems,
        customer_uuid: customerId,
        total: calculateTotal(cartItems),
        status: "pending",
        customer_info: {
          name: customerInfo.name,
          phone: customerInfo.phone,
          email: customerInfo.email
        },
        order_info: {
          type: customerInfo.orderType,
          tableId: customerInfo.orderType === "table" ? customerInfo.tableId : null,
          address: customerInfo.orderType === "delivery" ? customerInfo.address : null,
          notes: customerInfo.notes,
          paymentMethod: customerInfo.paymentMethod
        }
      };

      const response = await axiosConfig.post("/orders", orderData);
      toast.success("Order placed successfully!");
      setCartItems([]);
      setShowCheckoutForm(false);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  };

  const handleStripeSuccess = async (paymentIntent) => {
    try {
      const orderData = {
        items: cartItems,
        customer_uuid: customerId,
        total: calculateTotal(cartItems),
        status: "pending",
        customer_info: {
          name: customerInfo.name,
          phone: customerInfo.phone,
          email: customerInfo.email
        },
        order_info: {
          type: customerInfo.orderType,
          tableId: customerInfo.orderType === "table" ? customerInfo.tableId : null,
          address: customerInfo.orderType === "delivery" ? customerInfo.address : null,
          notes: customerInfo.notes,
          paymentMethod: customerInfo.paymentMethod,
          paymentIntentId: paymentIntent.id
        }
      };

      const response = await axiosConfig.post("/orders", orderData);
      toast.success("Order placed successfully!");
      setCartItems([]);
      setShowCheckoutForm(false);
      setShowStripeForm(false);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  };

  const handleStripeError = (error) => {
    toast.error(error);
    setShowStripeForm(false);
  };

  if (!Array.isArray(cartItems)) {
    return <div>Your cart is not properly initialized.</div>;
  }

  return (
    <div className="bg-green-ziti min-h-screen">
      {/* Cart Button */}
      <div className="z-10 flex justify-between items-center pt-4 px-4 sm:px-8">
        <Link to="/menu">
          <div className="cursor-pointer z-50001 fixed top-12 sm:top-4 right-4 flex items-center space-x-2">
            <Cartsvg className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-gold cursor-pointer hover:scale-110 transition-transform duration-300" />
            <span className="text-yellow-gold text-sm sm:text-base">Cart</span>
          </div>
        </Link>
      </div>

      {/* Decorative Lines - Hidden on Mobile */}
      <div className="hidden md:block fixed z-5001 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="hidden md:block fixed z-5001 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/menu"
            className="inline-flex items-center text-yellow-gold hover:text-yellow-gold1 transition-colors duration-300"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            <span>Back to menu</span>
          </Link>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl text-center mb-8 sm:mb-12"
          style={{ fontFamily: "font1, sans-serif" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Cart
        </motion.h1>

        {cartItems.length === 0 ? (
          <motion.div 
            className="text-center py-12 sm:py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-yellow-gold/50" />
            <p className="text-xl sm:text-2xl mb-8 text-yellow-gold/80">Your cart is empty.</p>
            <Link
              to="/menu"
              className="inline-block bg-yellow-gold text-green-ziti px-8 py-4 rounded-lg text-lg font-medium hover:bg-yellow-gold1 transition-all duration-300 transform hover:scale-105"
            >
              Browse Menu
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="cart-items space-y-6 sm:space-y-8">
            <AnimatePresence>
                {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                    className={`cart-item bg-green-khzy/20 border-2 border-yellow-gold rounded-xl p-6 sm:p-8 shadow-lg ${
                    isRemoving === item.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                      <motion.div
                        className="relative w-full sm:w-40 aspect-square overflow-hidden rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img
                      src={`/pic/${item.pic}`}
                      alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div className="flex-1 w-full">
                        <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-yellow-gold">{item.name}</h3>
                        <p className="text-xl sm:text-2xl mb-6 text-yellow-gold">${item.price}</p>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                          <label className="text-lg font-medium text-yellow-gold">Quantity:</label>
                          <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="p-2 rounded-full border-2 border-yellow-gold hover:bg-yellow-gold hover:text-green-ziti transition-colors duration-300"
                          >
                              <Minus className="w-5 h-5" />
                          </button>
                            <span className="text-2xl font-bold text-yellow-gold min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="p-2 rounded-full border-2 border-yellow-gold hover:bg-yellow-gold hover:text-green-ziti transition-colors duration-300"
                          >
                              <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {item.note?.trim() && (
                          <div className="mb-6 p-4 bg-green-khzy/30 rounded-lg">
                            <p className="text-yellow-gold/80 italic">Note: {item.note}</p>
                        </div>
                      )}

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <p className="text-2xl font-bold text-yellow-gold">
                          Total: ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                            className="flex items-center justify-center gap-2 bg-red-600/90 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
                        >
                            <Trash2 className="w-5 h-5" />
                            <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div 
              className="cart-summary mt-8 sm:mt-12 p-6 sm:p-8 bg-green-khzy/20 border-2 border-yellow-gold rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-yellow-gold">Total Amount:</h3>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-gold">${calculateTotal(cartItems).toFixed(2)}</p>
            </div>
            
              {!showCheckoutForm ? (
                <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/menu"
                    className="flex-1 bg-transparent text-yellow-gold border-2 border-yellow-gold p-4 rounded-lg text-center text-lg font-medium hover:bg-yellow-gold hover:text-green-ziti transition-all duration-300"
              >
                Continue Shopping
              </Link>
                  <button
                    onClick={() => setShowCheckoutForm(true)}
                    className="flex-1 bg-yellow-gold text-green-ziti p-4 rounded-lg text-center text-lg font-medium hover:bg-yellow-gold1 transition-all duration-300"
              >
                Proceed to Checkout
                  </button>
                </div>
              ) : showStripeForm ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-yellow-gold">Payment Details</h3>
                    <button
                      onClick={() => setShowStripeForm(false)}
                      className="text-yellow-gold hover:text-yellow-gold1 transition-colors duration-300"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="bg-green-khzy/20 border-2 border-yellow-gold rounded-xl p-6">
                    <Elements stripe={stripePromise}>
                      <StripePaymentForm
                        amount={calculateTotal(cartItems)}
                        onSuccess={handleStripeSuccess}
                        onError={handleStripeError}
                      />
                    </Elements>
            </div>
          </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-yellow-gold mb-6">Customer Information</h3>
                  
                  <form onSubmit={handleCheckout} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label className="block text-yellow-gold mb-2">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-gold/50" />
                          <input
                            type="text"
                            name="name"
                            value={customerInfo.name}
                            onChange={handleCustomerInfoChange}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-transparent border-2 border-yellow-gold/30 rounded-lg text-yellow-gold placeholder-yellow-gold/50 focus:outline-none focus:border-yellow-gold"
                            placeholder="Enter your name"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label className="block text-yellow-gold mb-2">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-gold/50" />
                          <input
                            type="tel"
                            name="phone"
                            value={customerInfo.phone}
                            onChange={handleCustomerInfoChange}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-transparent border-2 border-yellow-gold/30 rounded-lg text-yellow-gold placeholder-yellow-gold/50 focus:outline-none focus:border-yellow-gold"
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label className="block text-yellow-gold mb-2">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-gold/50" />
                          <input
                            type="email"
                            name="email"
                            value={customerInfo.email}
                            onChange={handleCustomerInfoChange}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-transparent border-2 border-yellow-gold/30 rounded-lg text-yellow-gold placeholder-yellow-gold/50 focus:outline-none focus:border-yellow-gold"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label className="block text-yellow-gold mb-2">Order Type</label>
                        <select
                          name="orderType"
                          value={customerInfo.orderType}
                          onChange={handleCustomerInfoChange}
                          className="w-full pl-4 pr-4 py-3 bg-transparent border-2 border-yellow-gold/30 rounded-lg text-yellow-gold focus:outline-none focus:border-yellow-gold"
                        >
                          {activeBooking && (
                            <option value="table">Table {activeBooking.tableId}</option>
                          )}
                          <option value="delivery">Home Delivery</option>
                          <option value="pickup">Pickup</option>
                        </select>
                      </div>

                      {customerInfo.orderType === "delivery" && (
                        <div className="relative md:col-span-2">
                          <label className="block text-yellow-gold mb-2">Delivery Address</label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-gold/50" />
                            <input
                              type="text"
                              name="address"
                              value={customerInfo.address}
                              onChange={handleCustomerInfoChange}
                              required
                              className="w-full pl-12 pr-4 py-3 bg-transparent border-2 border-yellow-gold/30 rounded-lg text-yellow-gold placeholder-yellow-gold/50 focus:outline-none focus:border-yellow-gold"
                              placeholder="Enter your delivery address"
                            />
                          </div>
                        </div>
                      )}

                      <div className="relative">
                        <label className="block text-yellow-gold mb-2">Payment Method</label>
                        <div className="relative">
                          <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-gold/50" />
                          <select
                            name="paymentMethod"
                            value={customerInfo.paymentMethod}
                            onChange={handleCustomerInfoChange}
                            className="w-full pl-12 pr-4 py-3 bg-transparent border-2 border-yellow-gold/30 rounded-lg text-yellow-gold focus:outline-none focus:border-yellow-gold"
                          >
                            <option value="cash">Cash</option>
                            <option value="card">Credit/Debit Card</option>
                          </select>
                        </div>
                      </div>

                      <div className="relative md:col-span-2">
                        <label className="block text-yellow-gold mb-2">Additional Notes</label>
                        <textarea
                          name="notes"
                          value={customerInfo.notes}
                          onChange={handleCustomerInfoChange}
                          className="w-full p-4 bg-transparent border-2 border-yellow-gold/30 rounded-lg text-yellow-gold placeholder-yellow-gold/50 focus:outline-none focus:border-yellow-gold"
                          placeholder="Any special instructions or notes for your order"
                          rows="3"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                      <button
                        type="button"
                        onClick={() => setShowCheckoutForm(false)}
                        className="flex-1 bg-transparent text-yellow-gold border-2 border-yellow-gold p-4 rounded-lg text-center text-lg font-medium hover:bg-yellow-gold hover:text-green-ziti transition-all duration-300"
                      >
                        Back to Cart
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-yellow-gold text-green-ziti p-4 rounded-lg text-center text-lg font-medium hover:bg-yellow-gold1 transition-all duration-300"
                      >
                        {customerInfo.paymentMethod === "card" ? "Proceed to Payment" : "Place Order"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
