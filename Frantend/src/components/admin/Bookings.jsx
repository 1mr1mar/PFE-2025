import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axiosConfig from "../../axiosConfig";
import { toast } from "react-toastify";
import { Calendar, Clock, Users, Phone, Mail, Check, X, AlertCircle, User } from "lucide-react";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, pending, confirmed, cancelled
  const [customerFilter, setCustomerFilter] = useState(""); // For filtering by customer UUID

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axiosConfig.get("/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError(error.response?.data?.message || "Failed to fetch bookings. Please check if the server is running.");
      toast.error(error.response?.data?.message || "Failed to fetch bookings. Please check if the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      await axiosConfig.patch(`/bookings/${bookingId}`, { status: newStatus });
      toast.success(`Booking ${newStatus} successfully`);
      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error(error.response?.data?.message || "Failed to update booking status");
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = filter === "all" || booking.status === filter;
    const matchesCustomer = !customerFilter || booking.customer_uuid === customerFilter;
    return matchesStatus && matchesCustomer;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-yellow-gold">Bookings</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Filter by Customer UUID"
            value={customerFilter}
            onChange={(e) => setCustomerFilter(e.target.value)}
            className="bg-green-khzy text-yellow-gold border border-yellow-gold/30 rounded-lg px-4 py-2"
          />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-green-khzy text-yellow-gold border border-yellow-gold/30 rounded-lg px-4 py-2"
        >
          <option value="all">All Bookings</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-gold mx-auto"></div>
          <p className="text-yellow-gold mt-4">Loading bookings...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-2 text-red-500 mb-4">
            <AlertCircle className="w-6 h-6" />
            <p className="text-lg font-semibold">Error Loading Bookings</p>
          </div>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={fetchBookings}
            className="bg-yellow-gold text-green-khzy px-6 py-2 rounded-lg hover:bg-yellow-gold/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-ziti/30 backdrop-blur-sm p-6 rounded-lg border border-yellow-gold/20"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-yellow-gold">{booking.name}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    booking.status === "confirmed"
                      ? "bg-green-500/20 text-green-500"
                      : booking.status === "cancelled"
                      ? "bg-red-500/20 text-red-500"
                      : "bg-yellow-500/20 text-yellow-500"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-yellow-gold" />
                  <span className="text-sm font-mono">{booking.customer_uuid}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-yellow-gold" />
                  <span>{booking.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-yellow-gold" />
                  <span>{booking.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-yellow-gold" />
                  <span>{new Date(booking.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-gold" />
                  <span>{booking.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-yellow-gold" />
                  <span>{booking.guests} {booking.guests === 1 ? "Guest" : "Guests"}</span>
                </div>
              </div>

              {booking.message && (
                <div className="mt-4 p-3 bg-black/20 rounded-lg">
                  <p className="text-gray-300 text-sm">{booking.message}</p>
                </div>
              )}

              {booking.status === "pending" && (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => updateBookingStatus(booking.id, "confirmed")}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500/20 text-green-500 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    Confirm
                  </button>
                  <button
                    onClick={() => updateBookingStatus(booking.id, "cancelled")}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500/20 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-yellow-gold">No bookings found</p>
        </div>
      )}
    </div>
  );
};

export default Bookings;
