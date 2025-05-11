import React, { useState } from "react";
import { FaClock, FaImage, FaLink, FaPhone, FaMapMarkerAlt, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const SittingsPage = () => {
  const [restaurantSettings, setRestaurantSettings] = useState({
    operatingHours: {
      monday: { open: "09:00", close: "22:00" },
      tuesday: { open: "09:00", close: "22:00" },
      wednesday: { open: "09:00", close: "22:00" },
      thursday: { open: "09:00", close: "22:00" },
      friday: { open: "09:00", close: "23:00" },
      saturday: { open: "10:00", close: "23:00" },
      sunday: { open: "10:00", close: "22:00" },
    },
    branding: {
      logo: "",
      restaurantName: "Your Restaurant Name",
      tagline: "Your Restaurant Tagline",
    },
    contact: {
      phone: "",
      email: "",
      address: "",
    },
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
    }
  });

  const [activeTab, setActiveTab] = useState("hours");

  const handleSettingsChange = (section, field, value) => {
    setRestaurantSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleOperatingHoursChange = (day, field, value) => {
    setRestaurantSettings(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value
        }
      }
    }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-yellow-gold1 mb-8" style={{ fontFamily: "font1, sans-serif" }}>
        Restaurant Settings
      </h2>

      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("hours")}
          className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
            activeTab === "hours" 
              ? "bg-yellow-gold1 text-green-ziti shadow-lg" 
              : "bg-green-ziti text-yellow-gold1 hover:scale-105"
          }`}
        >
          <FaClock className="mr-2" /> Operating Hours
        </button>
        <button
          onClick={() => setActiveTab("branding")}
          className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
            activeTab === "branding" 
              ? "bg-yellow-gold1 text-green-ziti shadow-lg" 
              : "bg-green-ziti text-yellow-gold1 hover:scale-105"
          }`}
        >
          <FaImage className="mr-2" /> Branding
        </button>
        <button
          onClick={() => setActiveTab("contact")}
          className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
            activeTab === "contact" 
              ? "bg-yellow-gold1 text-green-ziti shadow-lg" 
              : "bg-green-ziti text-yellow-gold1 hover:scale-105"
          }`}
        >
          <FaLink className="mr-2" /> Contact & Social
        </button>
      </div>

      {/* Operating Hours Section */}
      {activeTab === "hours" && (
        <div className="bg-green-ziti rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <FaClock className="text-3xl text-yellow-gold1 mr-4" />
            <h3 className="text-2xl font-bold text-yellow-gold1">Operating Hours</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(restaurantSettings.operatingHours).map(([day, hours]) => (
              <div key={day} className="bg-green-khzy border-1 border-yellow-gold bg-opacity-50 p-4 rounded-lg">
                <span className="block text-yellow-gold1 font-semibold mb-2 capitalize">{day}</span>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm text-yellow-gold1 mb-1">Open</label>
                    <input
                      type="time"
                      value={hours.open}
                      onChange={(e) => handleOperatingHoursChange(day, "open", e.target.value)}
                      className="w-full bg-green-ziti border border-green-khzy rounded p-2 text-gray-200"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-yellow-gold1 mb-1">Close</label>
                    <input
                      type="time"
                      value={hours.close}
                      onChange={(e) => handleOperatingHoursChange(day, "close", e.target.value)}
                      className="w-full bg-green-ziti border border-green-khzy rounded p-2 text-gray-200"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Branding Section */}
      {activeTab === "branding" && (
        <div className="bg-green-ziti rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <FaImage className="text-3xl text-yellow-gold1 mr-4" />
            <h3 className="text-2xl font-bold text-yellow-gold1">Branding</h3>
          </div>
          <div className="space-y-6">
            <div className="bg-green-khzy bg-opacity-50 p-6 rounded-lg">
              <label className="block text-yellow-gold1 font-semibold mb-2">Restaurant Name</label>
              <input
                type="text"
                value={restaurantSettings.branding.restaurantName}
                onChange={(e) => handleSettingsChange("branding", "restaurantName", e.target.value)}
                className="w-full bg-green-ziti border border-green-khzy rounded p-3 text-gray-200"
                placeholder="Enter restaurant name"
              />
            </div>
            <div className="bg-green-khzy bg-opacity-50 p-6 rounded-lg">
              <label className="block text-yellow-gold1 font-semibold mb-2">Tagline</label>
              <input
                type="text"
                value={restaurantSettings.branding.tagline}
                onChange={(e) => handleSettingsChange("branding", "tagline", e.target.value)}
                className="w-full bg-green-ziti border border-green-khzy rounded p-3 text-gray-200"
                placeholder="Enter restaurant tagline"
              />
            </div>
            <div className="bg-green-khzy bg-opacity-50 p-6 rounded-lg">
              <label className="block text-yellow-gold1 font-semibold mb-2">Logo</label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleSettingsChange("branding", "logo", e.target.files[0])}
                  className="flex-1 bg-green-ziti border border-green-khzy rounded p-3 text-gray-200"
                />
                <button className="bg-yellow-gold1 text-green-ziti px-4 py-3 rounded-lg hover:bg-yellow-gold transition-colors duration-300">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact & Social Section */}
      {activeTab === "contact" && (
        <div className="bg-green-ziti rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <FaLink className="text-3xl text-yellow-gold1 mr-4" />
            <h3 className="text-2xl font-bold text-yellow-gold1">Contact & Social Media</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-khzy bg-opacity-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <FaPhone className="text-yellow-gold1 mr-2" />
                <label className="text-yellow-gold1 font-semibold">Phone Number</label>
              </div>
              <input
                type="tel"
                value={restaurantSettings.contact.phone}
                onChange={(e) => handleSettingsChange("contact", "phone", e.target.value)}
                className="w-full bg-green-ziti border border-green-khzy rounded p-3 text-gray-200"
                placeholder="Enter phone number"
              />
            </div>
            <div className="bg-green-khzy bg-opacity-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <FaEnvelope className="text-yellow-gold1 mr-2" />
                <label className="text-yellow-gold1 font-semibold">Email Address</label>
              </div>
              <input
                type="email"
                value={restaurantSettings.contact.email}
                onChange={(e) => handleSettingsChange("contact", "email", e.target.value)}
                className="w-full bg-green-ziti border border-green-khzy rounded p-3 text-gray-200"
                placeholder="Enter email address"
              />
            </div>
            <div className="bg-green-khzy bg-opacity-50 p-6 rounded-lg md:col-span-2">
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-yellow-gold1 mr-2" />
                <label className="text-yellow-gold1 font-semibold">Address</label>
              </div>
              <textarea
                value={restaurantSettings.contact.address}
                onChange={(e) => handleSettingsChange("contact", "address", e.target.value)}
                className="w-full bg-green-ziti border border-green-khzy rounded p-3 text-gray-200"
                rows="3"
                placeholder="Enter restaurant address"
              />
            </div>
          </div>

          <h4 className="text-xl font-bold text-yellow-gold1 mt-8 mb-6">Social Media Links</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-khzy bg-opacity-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <FaFacebook className="text-yellow-gold1 mr-2" />
                <label className="text-yellow-gold1 font-semibold">Facebook</label>
              </div>
              <input
                type="url"
                value={restaurantSettings.socialMedia.facebook}
                onChange={(e) => handleSettingsChange("socialMedia", "facebook", e.target.value)}
                className="w-full bg-green-ziti border border-green-khzy rounded p-3 text-gray-200"
                placeholder="Enter Facebook URL"
              />
            </div>
            <div className="bg-green-khzy bg-opacity-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <FaInstagram className="text-yellow-gold1 mr-2" />
                <label className="text-yellow-gold1 font-semibold">Instagram</label>
              </div>
              <input
                type="url"
                value={restaurantSettings.socialMedia.instagram}
                onChange={(e) => handleSettingsChange("socialMedia", "instagram", e.target.value)}
                className="w-full bg-green-ziti border border-green-khzy rounded p-3 text-gray-200"
                placeholder="Enter Instagram URL"
              />
            </div>
            <div className="bg-green-khzy bg-opacity-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <FaTwitter className="text-yellow-gold1 mr-2" />
                <label className="text-yellow-gold1 font-semibold">Twitter</label>
              </div>
              <input
                type="url"
                value={restaurantSettings.socialMedia.twitter}
                onChange={(e) => handleSettingsChange("socialMedia", "twitter", e.target.value)}
                className="w-full bg-green-ziti border border-green-khzy rounded p-3 text-gray-200"
                placeholder="Enter Twitter URL"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SittingsPage;
