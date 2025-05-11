import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaSort, FaFilter, FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const ChefsPage = () => {
  const [chefs, setChefs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingChef, setEditingChef] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    specialization: "",
    pic: "",
    about: "",
  });
  const [expandedChef, setExpandedChef] = useState(null);

  // Fetch chefs from the database
  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/chefs");
        setChefs(response.data);
      } catch (error) {
        console.error("Error fetching chefs:", error);
        toast.error("Failed to fetch chefs");
      }
    };

    fetchChefs();
  }, []);

  // Filter and sort chefs
  const filteredAndSortedChefs = chefs
    .filter((chef) => {
      const matchesSearch = chef.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chef.specialization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === "all" || chef.specialization.includes(filterBy);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.fullname.localeCompare(b.fullname);
      if (sortBy === "specialization") return a.specialization.localeCompare(b.specialization);
      return 0;
    });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this chef?")) {
      try {
        await axios.delete(`http://localhost:5000/api/chefs/${id}`);
        setChefs(chefs.filter(chef => chef.id !== id));
        toast.success("Chef deleted successfully");
      } catch (error) {
        console.error("Error deleting chef:", error);
        toast.error("Failed to delete chef");
      }
    }
  };

  const handleEdit = (chef) => {
    setEditingChef(chef.id);
    setFormData({
      fullname: chef.fullname,
      specialization: chef.specialization,
      pic: chef.pic,
      about: chef.about,
    });
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingChef(null);
    setFormData({
      fullname: "",
      specialization: "",
      pic: "",
      about: "",
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        pic: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullname", formData.fullname);
      formDataToSend.append("specialization", formData.specialization);
      formDataToSend.append("about", formData.about);
      if (formData.pic instanceof File) {
        formDataToSend.append("pic", formData.pic);
      }

      let response;
      if (editingChef) {
        response = await axios.put(`http://localhost:5000/api/chefs/${editingChef}`, formDataToSend);
        setChefs(chefs.map(chef => 
          chef.id === editingChef 
            ? { ...chef, ...formData, pic: response.data.pic || chef.pic }
            : chef
        ));
        toast.success("Chef updated successfully");
      } else {
        response = await axios.post("http://localhost:5000/api/chefs", formDataToSend);
        setChefs([...chefs, { ...formData, id: response.data.id, pic: response.data.pic }]);
        toast.success("Chef added successfully");
      }

      setShowModal(false);
      setFormData({
        fullname: "",
        specialization: "",
        pic: "",
        about: "",
      });
    } catch (error) {
      console.error("Error saving chef:", error);
      toast.error("Failed to save chef");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-green-khzy">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-5xl text-center pt-10 text-yellow-gold1 mb-6 font-serif">
            Chefs Management
          </h2>
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search chefs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-green-ziti text-gray-200 px-4 py-2 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-gold1"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-green-ziti text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-gold1"
            >
              <option value="name">Sort by Name</option>
              <option value="specialization">Sort by Specialization</option>
            </select>
            <button
              onClick={handleAddNew}
              className="flex items-center bg-yellow-gold1 hover:bg-yellow-gold text-green-ziti font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <FaPlus className="mr-2" /> Add Chef
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredAndSortedChefs.map((chef) => (
              <motion.div
                key={chef.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-green-ziti rounded-2xl shadow-xl p-6 text-gray-200 transform transition-all duration-300 hover:scale-105"
              >
                <div 
                  className="cursor-pointer"
                  onClick={() => setExpandedChef(expandedChef === chef.id ? null : chef.id)}
                >
                  <div className="relative group">
                    <img
                      src={chef.pic || "/pic/default-chef.jpg"}
                      alt={chef.fullname}
                      className="w-full h-170 object-cover rounded-xl mb-4 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-yellow-gold1 mb-2">{chef.fullname}</h3>
                    <button className="text-yellow-gold1 hover:text-yellow-gold transition-colors duration-300">
                      {expandedChef === chef.id ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                  <p className="text-yellow-gold mb-2">{chef.specialization}</p>
                  <p className="text-sm mb-3">{chef.about}</p>
                </div>

                <div className="flex space-x-4 mt-6">
                  <button
                    className="text-yellow-gold1 hover:text-yellow-gold p-2 rounded-full hover:bg-green-khzy transition-all duration-300 transform hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(chef);
                    }}
                    aria-label={`Edit ${chef.fullname}`}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-green-khzy transition-all duration-300 transform hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(chef.id);
                    }}
                    aria-label={`Delete ${chef.fullname}`}
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Enhanced Modal */}
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-green-ziti p-8 rounded-2xl shadow-2xl w-full max-w-2xl"
            >
              <h3 className="text-2xl font-bold text-yellow-gold1 mb-6">
                {editingChef !== null ? "Edit Chef" : "Add New Chef"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-yellow-gold1 mb-2">Name</label>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      className="w-full bg-green-khzy border border-green-khzy rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-yellow-gold1 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-gold1 mb-2">Specialization</label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      className="w-full bg-green-khzy border border-green-khzy rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-yellow-gold1 focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-yellow-gold1 mb-2">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full bg-green-khzy border border-green-khzy rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-yellow-gold1 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-yellow-gold1 mb-2">Bio</label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    className="w-full bg-green-khzy border border-green-khzy rounded-lg p-3 text-gray-200 h-32 focus:ring-2 focus:ring-yellow-gold1 focus:outline-none"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-green-khzy hover:bg-green-800 text-gray-200 py-3 px-6 rounded-lg transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-yellow-gold1 hover:bg-yellow-gold text-green-ziti font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                  >
                    {isLoading ? "Saving..." : editingChef !== null ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChefsPage;
