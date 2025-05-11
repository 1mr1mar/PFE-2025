import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Checkout() {
  const [orderType, setOrderType] = useState("dine-in"); // "dine-in" or "delivery"
  const [hasReservation, setHasReservation] = useState(false);
  const [reservationId, setReservationId] = useState("");
  const [tableId, setTableId] = useState("");
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    fullname: "",
    phone: "",
    address: "",
    paymentMethod: "cash",
  });

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      orderType,
      hasReservation,
      reservationId,
      tableId,
      customerInfo,
      items: cart,
      total: calculateTotal(),
      orderDate: new Date().toISOString(),
    };
    console.log("Order Data:", orderData);
    // Send this to backend
    // After successful order, clear cart
    localStorage.removeItem("cart");
    // Redirect to confirmation page
  };

  return (
    <div className="min-h-screen bg-green-ziti pt-45 text-yellow-gold">
      <div className="fixed z-5001 top-0 left-1/18 h-full w-[1px] bg-yellow-gold"></div>
      <div className="fixed z-5001 top-0 right-1/18 h-full w-[1px] bg-yellow-gold"></div>

      <div className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl text-center mb-8"
          style={{ fontFamily: "font1, sans-serif" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            className="bg-green-ziti border-2 border-yellow-gold rounded-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-yellow-gold1">Qty: {item.quantity}</p>
                    {item.note && (
                      <p className="text-sm italic text-yellow-gold1">Note: {item.note}</p>
                    )}
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t-2 border-yellow-gold pt-4 mt-4">
                <div className="flex justify-between items-center font-bold text-xl">
                  <span>Total:</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Details Form */}
          <motion.div
            className="bg-green-ziti border-2 border-yellow-gold rounded-lg p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Order Type Selection */}
              <div className="flex gap-4 mb-6">
                <button
                  type="button"
                  className={`flex-1 p-3 rounded-lg border-2 transition-all duration-300 ${
                    orderType === "dine-in"
                      ? "bg-yellow-gold text-green-ziti border-yellow-gold"
                      : "border-yellow-gold text-yellow-gold hover:bg-yellow-gold hover:text-green-ziti"
                  }`}
                  onClick={() => setOrderType("dine-in")}
                >
                  Dine In
                </button>
                <button
                  type="button"
                  className={`flex-1 p-3 rounded-lg border-2 transition-all duration-300 ${
                    orderType === "delivery"
                      ? "bg-yellow-gold text-green-ziti border-yellow-gold"
                      : "border-yellow-gold text-yellow-gold hover:bg-yellow-gold hover:text-green-ziti"
                  }`}
                  onClick={() => setOrderType("delivery")}
                >
                  Home Delivery
                </button>
              </div>

              {/* Reservation Section */}
              {orderType === "dine-in" && (
                <div className="mb-6">
                  <label className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      checked={hasReservation}
                      onChange={(e) => setHasReservation(e.target.checked)}
                      className="w-4 h-4 accent-yellow-gold"
                    />
                    <span>I have a reservation</span>
                  </label>

                  {hasReservation && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Reservation ID"
                        className="w-full p-3 rounded-lg bg-transparent border-2 border-yellow-gold focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                        value={reservationId}
                        onChange={(e) => setReservationId(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Table ID (optional)"
                        className="w-full p-3 rounded-lg bg-transparent border-2 border-yellow-gold focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                        value={tableId}
                        onChange={(e) => setTableId(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Customer Information */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 rounded-lg bg-transparent border-2 border-yellow-gold focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                  value={customerInfo.fullname}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, fullname: e.target.value })
                  }
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-3 rounded-lg bg-transparent border-2 border-yellow-gold focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, phone: e.target.value })
                  }
                  required
                />
                {orderType === "delivery" && (
                  <input
                    type="text"
                    placeholder="Delivery Address"
                    className="w-full p-3 rounded-lg bg-transparent border-2 border-yellow-gold focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                    value={customerInfo.address}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        address: e.target.value,
                      })
                    }
                    required
                  />
                )}
                <select
                  className="w-full p-3 rounded-lg bg-transparent border-2 border-yellow-gold focus:ring-2 focus:ring-yellow-gold focus:border-transparent"
                  value={customerInfo.paymentMethod}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      paymentMethod: e.target.value,
                    })
                  }
                >
                  <option value="cash">Cash on Delivery</option>
                  <option value="card">Credit Card</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <Link
                  to="/cart"
                  className="flex-1 p-3 rounded-lg border-2 border-yellow-gold text-yellow-gold hover:bg-yellow-gold hover:text-green-ziti transition-all duration-300 text-center"
                >
                  Back to Cart
                </Link>
                <button
                  type="submit"
                  className="flex-1 bg-yellow-gold text-green-ziti p-3 rounded-lg hover:bg-yellow-gold1 transition-all duration-300 font-semibold"
                >
                  Place Order
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
