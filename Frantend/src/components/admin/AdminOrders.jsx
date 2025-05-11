import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaSort,
  FaClipboardList,
  FaDollarSign,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOption, setSortOption] = useState("date-desc");
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    pendingOrders: 0,
  });

  const statuses = ["Pending", "Preparing", "Ready", "Delivered"];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data);
      setFilteredOrders(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (ordersData) => {
    const totalOrders = ordersData.length;
    const totalRevenue = ordersData.reduce((acc, order) => acc + order.total_price, 0);
    const averageOrderValue = totalRevenue / totalOrders;
    const pendingOrders = ordersData.filter(order => order.status === "Pending").length;

    setStats({
      totalOrders,
      totalRevenue,
      averageOrderValue,
      pendingOrders,
    });
  };

  useEffect(() => {
    let result = [...orders];

    // Apply status filter
    if (filterStatus !== "All") {
      result = result.filter(order => order.status === filterStatus);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        order =>
          order.id.toString().includes(term) ||
          order.customer_id.toString().includes(term) ||
          order.delivery_address?.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "date-desc":
        result.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
        break;
      case "date-asc":
        result.sort((a, b) => new Date(a.order_date) - new Date(b.order_date));
        break;
      case "price-desc":
        result.sort((a, b) => b.total_price - a.total_price);
        break;
      case "price-asc":
        result.sort((a, b) => a.total_price - b.total_price);
        break;
      default:
        break;
    }

    setFilteredOrders(result);
  }, [orders, filterStatus, searchTerm, sortOption]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, { status: newStatus });
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Order status updated successfully");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:5000/api/orders/${id}`);
        setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
        toast.success("Order deleted successfully");
      } catch (error) {
        console.error("Error deleting order:", error);
        toast.error("Failed to delete order");
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "Preparing":
        return "bg-blue-500";
      case "Ready":
        return "bg-green-500";
      case "Delivered":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="p-6 bg-green-khzy">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FaClipboardList />}
          label="Total Orders"
          value={stats.totalOrders}
        />
        <StatCard
          icon={<FaDollarSign />}
          label="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
        />
        <StatCard
          icon={<FaCalendarAlt />}
          label="Average Order"
          value={`$${stats.averageOrderValue.toFixed(2)}`}
        />
        <StatCard
          icon={<FaClipboardList />}
          label="Pending Orders"
          value={stats.pendingOrders}
        />
      </div>

      {/* Controls Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          {/* Search Input */}
          <div className="relative group w-full md:w-auto">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FaSearch className="text-yellow-gold1 group-hover:text-yellow-500 transition-colors duration-300" />
            </div>
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 p-2 bg-transparent text-white border border-yellow-gold rounded w-full transition-all duration-300 focus:ring-2 focus:ring-yellow-gold1 focus:border-transparent hover:border-yellow-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative group w-full md:w-auto">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FaFilter className="text-yellow-gold1 group-hover:text-yellow-500 transition-colors duration-300" />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 p-2 bg-transparent text-yellow-gold border border-yellow-gold rounded w-full transition-all duration-300 focus:ring-2 focus:ring-yellow-gold1 focus:border-transparent hover:border-yellow-500"
            >
              <option value="All">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="relative group w-full md:w-auto">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FaSort className="text-yellow-gold1 group-hover:text-yellow-500 transition-colors duration-300" />
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="pl-10 p-2 bg-transparent text-yellow-gold border border-yellow-gold rounded w-full transition-all duration-300 focus:ring-2 focus:ring-yellow-gold1 focus:border-transparent hover:border-yellow-500"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="price-desc">Highest Price</option>
              <option value="price-asc">Lowest Price</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-gold1 mx-auto"></div>
          <p className="text-yellow-gold1 mt-4">Loading orders...</p>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOrders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-ziti border-1 border-yellow-gold rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div 
                  className="flex justify-between items-start mb-4 cursor-pointer"
                  onClick={() => toggleOrderExpand(order.id)}
                >
                  <div>
                    <h3 className="text-xl font-bold text-yellow-gold1">
                      Order #{order.id}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {new Date(order.order_date).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm text-yellow-gold font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                    {expandedOrderId === order.id ? (
                      <FaChevronUp className="text-yellow-gold1" />
                    ) : (
                      <FaChevronDown className="text-yellow-gold1" />
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-300">
                    <FaUser className="mr-2 text-yellow-gold1" />
                    <span>Customer ID: {order.customer_id}</span>
                  </div>
                  {order.delivery_address && (
                    <div className="flex items-center text-gray-300">
                      <FaMapMarkerAlt className="mr-2 text-yellow-gold1" />
                      <span>{order.delivery_address}</span>
                    </div>
                  )}
                  {order.reservation_id && (
                    <div className="flex items-center text-gray-300">
                      <FaCalendarAlt className="mr-2 text-yellow-gold1" />
                      <span>Reservation ID: {order.reservation_id}</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-300">
                    <FaDollarSign className="mr-2 text-yellow-gold1" />
                    <span className="font-bold">${order.total_price}</span>
                  </div>
                </div>

                {/* Order Items Section */}
                {expandedOrderId === order.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 border-t border-yellow-gold1 pt-4"
                  >
                    <h4 className="text-lg font-semibold text-yellow-gold1 mb-3">Order Items</h4>
                    <div className="space-y-2">
                      {order.meal_ids && order.meal_ids.split(',').map((mealId, index) => {
                        const mealName = order.meal_names.split(',')[index];
                        const quantity = order.quantities.split(',')[index];
                        return (
                          <div key={mealId} className="flex justify-between items-center text-gray-300">
                            <div className="flex items-center">
                              <span className="mr-2">•</span>
                              <span>{mealName}</span>
                            </div>
                            <span className="text-yellow-gold1">x{quantity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-end space-x-2 mt-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="bg-transparent text-yellow-gold border border-yellow-gold rounded px-3 py-1 focus:ring-2 focus:ring-yellow-gold1 focus:border-transparent"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-green-ziti rounded-lg">
          <p className="text-yellow-gold1 text-xl">No orders found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, label, value }) => (
  <div className="bg-green-ziti rounded-lg p-4 shadow-lg">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-yellow-gold1 text-2xl font-bold">{value}</p>
      </div>
      <div className="text-2xl text-yellow-gold1">{icon}</div>
    </div>
  </div>
);

export default AdminOrders;
