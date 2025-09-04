import React, { useState, useEffect } from "react";
import {
  Menu,
  Bell,
  Search,
  User,
  ChevronDown,
  Settings,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    // Get admin data from localStorage
    const storedAdminData = localStorage.getItem("adminData");
    if (storedAdminData) {
      setAdminData(JSON.parse(storedAdminData));
    }
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    // Remove tokens and data from localStorage
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");

    // Close dropdown
    setIsProfileOpen(false);

    // Redirect to login page
    navigate("/admin/login");
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "A";
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 w-full">
        {/* Left Section */}
        <div className="flex items-center min-w-0">
          {/* Mobile Menu Button */}
          <motion.button
            onClick={onToggleSidebar}
            className="lg:hidden mr-3 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-5 h-5" />
          </motion.button>

          {/* Title - Hidden on small screens when search is open */}
          <motion.h2
            className={`text-lg sm:text-xl font-semibold text-gray-800 truncate transition-all duration-300 ${
              isSearchOpen ? "hidden sm:block" : "block"
            }`}
            initial={{ opacity: 1 }}
            animate={{ opacity: isSearchOpen ? 0.7 : 1 }}
          >
            <span className="hidden sm:inline">Admin Dashboard</span>
            <span className="sm:hidden">Dashboard</span>
          </motion.h2>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-4 ml-4">
          {/* Search - Desktop Version */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 lg:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-sm"
            />
          </div>

          {/* Search - Mobile/Tablet Version */}
          <div className="md:hidden relative">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "200px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2"
                >
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    autoFocus
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={toggleSearch}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Notification Bell */}
          <motion.button
            className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5" />
            <motion.span
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </motion.span>
          </motion.button>

          {/* Profile Section */}
          <div className="relative">
            <motion.button
              onClick={toggleProfile}
              className="flex items-center space-x-2 p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-medium">
                  {getInitial(adminData?.name)}
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-sm font-medium text-gray-700 block">
                  {adminData?.name || "Admin"}
                </span>
                <span className="text-xs text-gray-500 block">
                  Administrator
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 hidden sm:block ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </motion.button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {adminData?.name || "Admin User"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {adminData?.email || "admin@example.com"}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </motion.button>

                  <motion.button
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </motion.button>

                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <motion.button
                      onClick={handleLogout}
                      whileHover={{ backgroundColor: "#fef2f2" }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-30"
            onClick={() => setIsSearchOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default AdminHeader;
