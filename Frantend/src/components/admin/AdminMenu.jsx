import React, { useState, useEffect, useRef } from "react";
import {
  FaPlus,
  FaPencilAlt,
  FaTrash,
  FaSave,
  FaTimes,
  FaSearch,
  FaFilter,
  FaSort,
  FaImage,
  FaStar,
  FaChartLine,
  FaUtensils,
  FaDollarSign,
} from "react-icons/fa";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const AdminMenu = () => {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editMealId, setEditMealId] = useState(null);
  const [editMeal, setEditMeal] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [animateDelete, setAnimateDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMeals: 0,
    averagePrice: 0,
    highestRated: null,
    mostPopular: null,
  });

  const [newMeal, setNewMeal] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    pic: "",
    chef_id: "",
    rating: "",
    popularity: "",
  });

  // Ref for add form animation
  const addFormRef = useRef(null);

  // Fetch meals and categories on component mount
  useEffect(() => {
    fetchMeals();
    fetchCategories();
  }, []);

  const fetchMeals = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5000/api/meals");
      console.log('Fetched meals:', response.data.slice(0, 3)); // Log first 3 meals
      
      // Add the correct path to the image URLs
      const mealsWithImages = response.data.map(meal => {
        // Use the exact path from the database
        const picPath = `/pic/${meal.pic}`;
        console.log('Processing meal:', {
          name: meal.name,
          originalPic: meal.pic,
          newPicPath: picPath
        });
        return {
          ...meal,
          pic: picPath
        };
      });
      setMeals(mealsWithImages);
      setFilteredMeals(mealsWithImages);
      calculateStats(mealsWithImages);
    } catch (error) {
      console.error("Error fetching meals:", error);
      toast.error("Failed to fetch meals");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  const calculateStats = (mealsData) => {
    const totalMeals = mealsData.length;
    const averagePrice = mealsData.reduce((acc, meal) => acc + meal.price, 0) / totalMeals;
    const highestRated = [...mealsData].sort((a, b) => b.rating - a.rating)[0];
    const mostPopular = [...mealsData].sort((a, b) => b.popularity - a.popularity)[0];

    setStats({
      totalMeals,
      averagePrice,
      highestRated,
      mostPopular,
    });
  };

  useEffect(() => {
    let result = [...meals];

    // Apply category filter
    if (filterCategory !== "All") {
      const categoryId = categories.find(cat => cat.name === filterCategory)?.id;
      result = result.filter(meal => meal.category_id === categoryId);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        meal =>
          meal.name.toLowerCase().includes(term) ||
          meal.description.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        break;
    }

    setFilteredMeals(result);
  }, [meals, filterCategory, searchTerm, sortOption, categories]);

  const validateForm = (meal) => {
    const errors = {};
    if (!meal.name) errors.name = "Name is required";
    if (!meal.description) errors.description = "Description is required";
    if (!meal.price || meal.price <= 0) errors.price = "Valid price is required";
    if (!meal.category_id) errors.category_id = "Category is required";
    if (!meal.chef_id) errors.chef_id = "Chef is required";
    return errors;
  };

  const handleAddMeal = async (e) => {
    e.preventDefault();
    const errors = validateForm(newMeal);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      // Convert chef_id to made_by for the backend
      const mealData = {
        ...newMeal,
        made_by: newMeal.chef_id,
        rating: newMeal.rating || 0,
        popularity: newMeal.popularity || 0
      };
      delete mealData.chef_id;

      const response = await axios.post("http://localhost:5000/api/meals", mealData);
      const newMealWithImage = {
        ...response.data,
        pic: `/pic/${response.data.pic}` // The backend returns just the filename
      };
      setMeals([...meals, newMealWithImage]);
      toast.success("Meal added successfully");
      setShowAddForm(false);
      setNewMeal({
        name: "",
        description: "",
        price: "",
        category_id: "",
        pic: "",
        chef_id: "",
        rating: "",
        popularity: "",
      });
    } catch (error) {
      console.error("Error adding meal:", error);
      toast.error("Failed to add meal");
    }
  };

  const handleEditClick = (meal) => {
    setEditMealId(meal.id);
    setEditMeal({
      ...meal,
      chef_id: meal.made_by // Convert made_by to chef_id for the form
    });
  };

  const handleUpdateMeal = async (e) => {
    e.preventDefault();
    console.log('Starting meal update...');
    
    const errors = validateForm(editMeal);
    if (Object.keys(errors).length > 0) {
      console.log('Form validation errors:', errors);
      setFormErrors(errors);
      return;
    }

    try {
      // Convert chef_id to made_by for the backend
      const mealData = {
        ...editMeal,
        made_by: editMeal.chef_id,
        rating: editMeal.rating || 0,
        popularity: editMeal.popularity || 0
      };
      delete mealData.chef_id;

      console.log('Sending update request:', {
        url: `http://localhost:5000/api/meals/${editMealId}`,
        data: mealData
      });

      const response = await axios.put(`http://localhost:5000/api/meals/${editMealId}`, mealData);
      console.log('Update response:', response.data);

      // Update the meals list with the new data
      setMeals(prevMeals => {
        const updatedMeals = prevMeals.map(m => {
          if (m.id === editMealId) {
            console.log('Updating meal in state:', {
              old: m,
              new: {
                ...editMeal,
                pic: `/pic/${editMeal.pic}`
              }
            });
            return {
              ...editMeal,
              pic: `/pic/${editMeal.pic}`
            };
          }
          return m;
        });
        console.log('Updated meals state:', updatedMeals);
        return updatedMeals;
      });

      toast.success("Meal updated successfully");
      setEditMealId(null);
      setEditMeal(null);
    } catch (error) {
      console.error("Error updating meal:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error(error.response?.data?.message || "Failed to update meal");
    }
  };

  const handleDeleteMeal = async (id) => {
    if (window.confirm("Are you sure you want to delete this meal?")) {
      try {
        await axios.delete(`http://localhost:5000/api/meals/${id}`);
        setMeals(meals.filter(m => m.id !== id));
        toast.success("Meal deleted successfully");
      } catch (error) {
        console.error("Error deleting meal:", error);
        toast.error("Failed to delete meal");
      }
    }
  };

  const handleImageUpload = async (e, isEdit = false) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    try {
      // Create FormData to send the file
      const formData = new FormData();
      formData.append('image', file);

      console.log('Uploading file:', {
        name: file.name,
        type: file.type,
        size: file.size
      });

      // Upload the image file
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Get the filename from the response
      const filename = response.data.filename;
      console.log('Upload successful:', filename);

      if (isEdit) {
        setEditMeal(prev => ({
          ...prev,
          pic: filename
        }));
      } else {
        setNewMeal(prev => ({
          ...prev,
          pic: filename
        }));
      }
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to upload image';
      toast.error(`Upload failed: ${errorMessage}`);
    }
  };

  return (
    <div className="p-6 bg-green-khzy">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FaUtensils />}
          label="Total Meals"
          value={stats.totalMeals}
        />
        <StatCard
          icon={<FaDollarSign />}
          label="Average Price"
          value={`$${stats.averagePrice.toFixed(2)}`}
        />
        <StatCard
          icon={<FaStar />}
          label="Highest Rated"
          value={stats.highestRated?.name || "N/A"}
          subValue={`${stats.highestRated?.rating || 0} stars`}
        />
        <StatCard
          icon={<FaChartLine />}
          label="Most Popular"
          value={stats.mostPopular?.name || "N/A"}
          subValue={`${stats.mostPopular?.popularity || 0} orders`}
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
              placeholder="Search meals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 p-2 bg-transparent text-white border border-yellow-gold rounded w-full transition-all duration-300 focus:ring-2 focus:ring-yellow-gold1 focus:border-transparent hover:border-yellow-500"
            />
          </div>

          {/* Category Filter */}
          <div className="relative group w-full md:w-auto">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <FaFilter className="text-yellow-gold1 group-hover:text-yellow-500 transition-colors duration-300" />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 p-2 bg-transparent text-yellow-gold border border-yellow-gold rounded w-full transition-all duration-300 focus:ring-2 focus:ring-yellow-gold1 focus:border-transparent hover:border-yellow-500"
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
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
              <option value="name">Sort by Name</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>

          {/* Add Meal Button */}
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center justify-center bg-yellow-gold1 text-green-ziti px-4 py-2 rounded-md transform hover:scale-105 hover:bg-yellow-500 transition-all duration-300 shadow hover:shadow-lg"
          >
            <FaPlus className="mr-2" />
            Add Meal
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-green-ziti p-6 rounded-lg w-full max-w-2xl">
              <h2 className="text-2xl text-yellow-gold1 mb-4">Add New Meal</h2>
              <form onSubmit={handleAddMeal} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-yellow-gold1 mb-2">Name</label>
                    <input
                      type="text"
                      value={newMeal.name}
                      onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                      className="w-full p-2 bg-transparent text-white border border-yellow-gold rounded"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-yellow-gold1 mb-2">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newMeal.price}
                      onChange={(e) => setNewMeal({ ...newMeal, price: e.target.value })}
                      className="w-full p-2 bg-transparent text-white border border-yellow-gold rounded"
                    />
                    {formErrors.price && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-yellow-gold1 mb-2">Category</label>
                    <select
                      value={newMeal.category_id}
                      onChange={(e) => setNewMeal({ ...newMeal, category_id: e.target.value })}
                      className="w-full p-2 bg-transparent text-white border border-yellow-gold rounded"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.category_id && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.category_id}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-yellow-gold1 mb-2">Image</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex items-center justify-center p-2 bg-yellow-gold1 text-green-ziti rounded cursor-pointer hover:bg-yellow-500 transition-colors duration-300"
                      >
                        <FaImage className="mr-2" />
                        Upload Image
                      </label>
                      {newMeal.pic && (
                        <span className="text-yellow-gold1">Image uploaded</span>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-yellow-gold1 mb-2">Description</label>
                  <textarea
                    value={newMeal.description}
                    onChange={(e) => setNewMeal({ ...newMeal, description: e.target.value })}
                    className="w-full p-2 bg-transparent text-white border border-yellow-gold rounded"
                    rows="3"
                  />
                  {formErrors.description && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-gold1 text-green-ziti rounded hover:bg-yellow-500 transition-colors duration-300"
                  >
                    Add Meal
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Form */}
      <AnimatePresence>
        {editMealId && editMeal && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-green-ziti p-6 rounded-lg w-full max-w-2xl">
              <h2 className="text-2xl text-yellow-gold1 mb-4">Edit Meal</h2>
              <form onSubmit={handleUpdateMeal} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-yellow-gold1 mb-2">Name</label>
                    <input
                      type="text"
                      value={editMeal.name}
                      onChange={(e) => setEditMeal({ ...editMeal, name: e.target.value })}
                      className="w-full p-2 bg-transparent text-white border border-yellow-gold rounded"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-yellow-gold1 mb-2">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editMeal.price}
                      onChange={(e) => setEditMeal({ ...editMeal, price: e.target.value })}
                      className="w-full p-2 bg-transparent text-white border border-yellow-gold rounded"
                    />
                    {formErrors.price && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-yellow-gold1 mb-2">Category</label>
                    <select
                      value={editMeal.category_id}
                      onChange={(e) => setEditMeal({ ...editMeal, category_id: e.target.value })}
                      className="w-full p-2 bg-transparent text-white border border-yellow-gold rounded"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.category_id && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.category_id}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-yellow-gold1 mb-2">Image</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, true)}
                        className="hidden"
                        id="edit-image-upload"
                      />
                      <label
                        htmlFor="edit-image-upload"
                        className="flex items-center justify-center p-2 bg-yellow-gold1 text-green-ziti rounded cursor-pointer hover:bg-yellow-500 transition-colors duration-300"
                      >
                        <FaImage className="mr-2" />
                        Change Image
                      </label>
                      {editMeal.pic && (
                        <span className="text-yellow-gold1">Image selected</span>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-yellow-gold1 mb-2">Description</label>
                  <textarea
                    value={editMeal.description}
                    onChange={(e) => setEditMeal({ ...editMeal, description: e.target.value })}
                    className="w-full p-2 bg-transparent text-white border border-yellow-gold rounded"
                    rows="3"
                  />
                  {formErrors.description && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditMealId(null);
                      setEditMeal(null);
                    }}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-gold1 text-green-ziti rounded hover:bg-yellow-500 transition-colors duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Meals Grid */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-gold1 mx-auto"></div>
          <p className="text-yellow-gold1 mt-4">Loading meals...</p>
        </div>
      ) : filteredMeals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-ziti rounded-lg shadow-lg overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-square">
                <img
                  src={meal.pic}
                  alt={meal.name}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  onError={(e) => {
                    console.error('Image failed to load:', {
                      mealName: meal.name,
                      picPath: meal.pic,
                      fullUrl: e.target.src,
                      timestamp: new Date().toISOString()
                    });
                    e.target.onerror = null;
                    e.target.src = '/pic/placeholder.jpg';
                  }}
                />
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => handleEditClick(meal)}
                    className="p-2 bg-yellow-gold1 text-green-ziti rounded-full hover:bg-yellow-500 transition-colors duration-300"
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    onClick={() => handleDeleteMeal(meal.id)}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-yellow-gold1 mb-2">{meal.name}</h3>
                <p className="text-gray-300 mb-2 flex-grow">{meal.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-yellow-gold1 font-bold">${meal.price}</span>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-yellow-gold1">{meal.rating}</span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  Popularity: {meal.popularity}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-green-ziti rounded-lg">
          <p className="text-yellow-gold1 text-xl">No meals found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, label, value, subValue }) => (
  <div className="bg-green-ziti rounded-lg p-4 shadow-lg">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-yellow-gold1 text-2xl font-bold">{value}</p>
        {subValue && <p className="text-gray-300 text-sm">{subValue}</p>}
      </div>
      <div className="text-2xl text-yellow-gold1">{icon}</div>
    </div>
  </div>
);

export default AdminMenu;
