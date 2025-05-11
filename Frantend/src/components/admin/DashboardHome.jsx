import React, { useMemo } from "react";
import { FaUtensils, FaClipboardList, FaUsers, FaStar, FaCalendarAlt, FaDollarSign, FaChartLine } from "react-icons/fa";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardHome = () => {
  // Sample data for statistics display
  const stats = {
    totalOrders: 120,
    totalBookings: 50,
    totalReviews: 90,
    totalChefs: 3,
    revenue: 15000,
    averageRating: 4.5,
  };

  // Memoize chart data to prevent unnecessary re-renders
  const ordersChartData = useMemo(
    () => ({
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Orders",
          data: [30, 25, 35, 40, 50, 45],
          backgroundColor: "rgba(255, 159, 64, 0.6)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    }),
    []
  );

  const bookingsChartData = useMemo(
    () => ({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Bookings",
          data: [12, 19, 15, 17, 22, 25, 18],
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
      ],
    }),
    []
  );

  const revenueChartData = useMemo(
    () => ({
      labels: ["Food", "Drinks", "Desserts"],
      datasets: [
        {
          data: [60, 25, 15],
          backgroundColor: [
            "rgba(255, 159, 64, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
          ],
          borderColor: [
            "rgba(255, 159, 64, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    }),
    []
  );

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#E0E0E0",
        },
      },
      title: {
        display: true,
        text: "Monthly Order Distribution",
        color: "#FFC107",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#E0E0E0",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "#E0E0E0",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  const lineChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        display: true,
        text: "Weekly Bookings",
        color: "#FFC107",
      },
    },
  };

  const doughnutChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        display: true,
        text: "Revenue Distribution",
        color: "#FFC107",
      },
    },
  };

  return (
    <div className="p-4">
      <h2
        className="text-4xl text-center pt-6 text-yellow-gold1 mb-8"
        style={{ fontFamily: "font1, sans-serif" }}
        id="dashboard-heading"
      >
        Admin Dashboard
      </h2>

      {/* Stats Grid */}
      <div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        aria-labelledby="dashboard-heading"
      >
        <StatCard
          icon={<FaClipboardList aria-hidden="true" />}
          label="Total Orders"
          value={stats.totalOrders}
          trend="+12%"
        />
        <StatCard
          icon={<FaCalendarAlt aria-hidden="true" />}
          label="Bookings"
          value={stats.totalBookings}
          trend="+8%"
        />
        <StatCard
          icon={<FaDollarSign aria-hidden="true" />}
          label="Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          trend="+15%"
        />
        <StatCard
          icon={<FaStar aria-hidden="true" />}
          label="Average Rating"
          value={stats.averageRating}
          trend="+0.2"
        />
        <StatCard
          icon={<FaUsers aria-hidden="true" />}
          label="Total Chefs"
          value={stats.totalChefs}
          trend="+1"
        />
        <StatCard
          icon={<FaChartLine aria-hidden="true" />}
          label="Growth Rate"
          value="24%"
          trend="+5%"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Orders Chart */}
        <div className="bg-green-ziti p-6 rounded-xl shadow-lg">
          <Bar data={ordersChartData} options={chartOptions} />
        </div>

        {/* Bookings Chart */}
        <div className="bg-green-ziti p-6 rounded-xl shadow-lg">
          <Line data={bookingsChartData} options={lineChartOptions} />
        </div>
      </div>

      {/* Revenue Distribution */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-ziti p-6 rounded-xl shadow-lg">
          <Doughnut data={revenueChartData} options={doughnutChartOptions} />
        </div>

        {/* Recent Activity */}
        <div className="bg-green-ziti p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-yellow-gold1 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <ActivityItem
              icon={<FaClipboardList />}
              title="New Order"
              description="Order #1234 received"
              time="5 minutes ago"
            />
            <ActivityItem
              icon={<FaCalendarAlt />}
              title="New Booking"
              description="Table reservation for 4 people"
              time="15 minutes ago"
            />
            <ActivityItem
              icon={<FaStar />}
              title="New Review"
              description="5-star rating received"
              time="1 hour ago"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Card component for stats
const StatCard = ({ icon, label, value, trend }) => (
  <div
    className="bg-green-ziti rounded-xl shadow-lg p-6 text-center text-yellow-gold1 transform hover:scale-105 transition-transform duration-300"
    aria-label={`${label}: ${value}`}
  >
    <div className="text-3xl mb-4" aria-hidden="true">
      {icon}
    </div>
    <h4 className="text-lg font-semibold">{label}</h4>
    <p className="text-2xl font-bold mb-2">{value}</p>
    <p className="text-sm text-green-400">{trend}</p>
  </div>
);

// Activity Item component
const ActivityItem = ({ icon, title, description, time }) => (
  <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-green-khzy/20 transition-colors duration-300">
    <div className="text-yellow-gold1 mt-1">{icon}</div>
    <div className="flex-1">
      <h4 className="text-yellow-gold1 font-semibold">{title}</h4>
      <p className="text-gray-300 text-sm">{description}</p>
      <p className="text-gray-400 text-xs mt-1">{time}</p>
    </div>
  </div>
);

export default DashboardHome;
