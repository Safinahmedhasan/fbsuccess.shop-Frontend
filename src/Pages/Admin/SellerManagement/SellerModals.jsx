import React, { useState } from "react";
import {
  X,
  Save,
  User,
  Mail,
  Phone,
  Percent,
  Eye,
  Copy,
  Trash2,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SellerModals = ({
  showAddModal,
  showEditModal,
  showViewModal,
  showDeleteModal,
  selectedSeller,
  setShowAddModal,
  setShowEditModal,
  setShowViewModal,
  setShowDeleteModal,
  setSelectedSeller,
  fetchSellers,
  setSuccess,
  setError,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    commissionRate: 10,
    isActive: true,
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sellerStats, setSellerStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      commissionRate: 10,
      isActive: true,
    });
    setFormErrors({});
    setSelectedSeller(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Seller name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^01[3-9]\d{8}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid Bangladeshi phone number";
    }

    if (
      !formData.commissionRate ||
      formData.commissionRate < 0 ||
      formData.commissionRate > 100
    ) {
      errors.commissionRate = "Commission rate must be between 0 and 100";
    }

    return errors;
  };

  const handleAddSeller = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${import.meta.env.VITE_DataHost}/sellers/admin/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess("Seller added successfully!");
        setShowAddModal(false);
        resetForm();
        fetchSellers();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to add seller");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSeller = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${import.meta.env.VITE_DataHost}/sellers/admin/update/${
          selectedSeller._id
        }`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess("Seller updated successfully!");
        setShowEditModal(false);
        resetForm();
        fetchSellers();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to update seller");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSeller = async () => {
    setSubmitting(true);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${import.meta.env.VITE_DataHost}/sellers/admin/delete/${
          selectedSeller._id
        }`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess("Seller deleted successfully!");
        setShowDeleteModal(false);
        resetForm();
        fetchSellers();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to delete seller");
    } finally {
      setSubmitting(false);
    }
  };

  const fetchSellerStats = async (sellerId) => {
    setLoadingStats(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${import.meta.env.VITE_DataHost}/sellers/admin/stats/${sellerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setSellerStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to fetch seller stats");
    } finally {
      setLoadingStats(false);
    }
  };

  const copyText = (text, successMessage) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setSuccess(successMessage);
        })
        .catch(() => {
          fallbackCopyTextToClipboard(text);
        });
    } else {
      fallbackCopyTextToClipboard(text);
    }

    function fallbackCopyTextToClipboard(text) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand("copy");
        if (successful) {
          setSuccess(successMessage);
        }
      } catch (err) {
        setError("Failed to copy");
      }
      document.body.removeChild(textArea);
    }
  };

  const openEditModal = (seller) => {
    setFormData({
      name: seller.name,
      email: seller.email,
      phone: seller.phone,
      commissionRate: seller.commissionRate,
      isActive: seller.isActive,
    });
    setShowEditModal(true);
  };

  const openViewModal = async (seller) => {
    setShowViewModal(true);
    await fetchSellerStats(seller._id);
  };

  React.useEffect(() => {
    if (showEditModal && selectedSeller) {
      openEditModal(selectedSeller);
    }
  }, [showEditModal, selectedSeller]);

  React.useEffect(() => {
    if (showViewModal && selectedSeller) {
      openViewModal(selectedSeller);
    }
  }, [showViewModal, selectedSeller]);

  return (
    <>
      {/* Add Seller Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-screen overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Add New Seller
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div onSubmit={handleAddSeller} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <User className="w-4 h-4 inline mr-1" />
                      Seller Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                        formErrors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter seller name"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                        formErrors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="seller@example.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                        formErrors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="01XXXXXXXXX"
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Percent className="w-4 h-4 inline mr-1" />
                      Commission Rate (%)
                    </label>
                    <input
                      type="number"
                      name="commissionRate"
                      value={formData.commissionRate}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                        formErrors.commissionRate
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="10"
                    />
                    {formErrors.commissionRate && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.commissionRate}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddModal(false);
                        resetForm();
                      }}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddSeller}
                      disabled={submitting}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Add Seller</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Seller Modal */}
      <AnimatePresence>
        {showEditModal && selectedSeller && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-screen overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Edit Seller
                  </h3>
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div onSubmit={handleEditSeller} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <User className="w-4 h-4 inline mr-1" />
                      Seller Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                        formErrors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter seller name"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                        formErrors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="seller@example.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                        formErrors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="01XXXXXXXXX"
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Percent className="w-4 h-4 inline mr-1" />
                      Commission Rate (%)
                    </label>
                    <input
                      type="number"
                      name="commissionRate"
                      value={formData.commissionRate}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                        formErrors.commissionRate
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="10"
                    />
                    {formErrors.commissionRate && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.commissionRate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Active Seller
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditModal(false);
                        resetForm();
                      }}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditSeller}
                      disabled={submitting}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Update Seller</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Seller Modal */}
      <AnimatePresence>
        {showViewModal && selectedSeller && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Seller Details
                  </h3>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Seller Information
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">Name:</span>
                          <span className="text-sm font-medium text-gray-900 ml-2">
                            {selectedSeller.name}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">Email:</span>
                          <span className="text-sm font-medium text-gray-900 ml-2">
                            {selectedSeller.email}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">Phone:</span>
                          <span className="text-sm font-medium text-gray-900 ml-2">
                            {selectedSeller.phone}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Percent className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">
                            Commission:
                          </span>
                          <span className="text-sm font-medium text-gray-900 ml-2">
                            {selectedSeller.commissionRate}%
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Activity className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-600">Status:</span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ml-2 ${
                              selectedSeller.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {selectedSeller.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Seller Code & URL
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-gray-600">
                            Seller Code:
                          </span>
                          <div className="flex items-center mt-1">
                            <code className="bg-white px-2 py-1 rounded border text-sm font-mono">
                              {selectedSeller.sellerCode}
                            </code>
                            <button
                              onClick={() =>
                                copyText(
                                  selectedSeller.sellerCode,
                                  "Seller code copied!"
                                )
                              }
                              className="ml-2 p-1 text-blue-600 hover:text-blue-800"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">
                            Referral URL:
                          </span>
                          <div className="flex items-center mt-1">
                            <input
                              type="text"
                              value={selectedSeller.sellerUrl}
                              readOnly
                              className="flex-1 bg-white px-2 py-1 rounded border text-sm"
                            />
                            <button
                              onClick={() =>
                                copyText(
                                  selectedSeller.sellerUrl,
                                  "Seller URL copied!"
                                )
                              }
                              className="ml-2 p-1 text-blue-600 hover:text-blue-800"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {loadingStats ? (
                      <div className="flex items-center justify-center h-40">
                        <div className="w-8 h-8 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
                      </div>
                    ) : sellerStats ? (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Performance Stats
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                              {sellerStats.totalOrders}
                            </div>
                            <div className="text-xs text-gray-600">
                              Total Orders
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <TrendingUp className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                              {sellerStats.confirmedOrders}
                            </div>
                            <div className="text-xs text-gray-600">
                              Confirmed
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <DollarSign className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                              ৳{sellerStats.totalRevenue.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-600">
                              Total Revenue
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <Percent className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                              ৳{sellerStats.totalCommission.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-600">
                              Commission
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 p-3 bg-white rounded border">
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900">
                              {sellerStats.conversionRate}%
                            </div>
                            <div className="text-xs text-gray-600">
                              Conversion Rate
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-gray-600">No statistics available</p>
                      </div>
                    )}

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Account Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-gray-600">Created:</span>
                          <span className="text-gray-900 ml-2">
                            {new Date(
                              selectedSeller.createdAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-gray-600">Updated:</span>
                          <span className="text-gray-900 ml-2">
                            {new Date(
                              selectedSeller.updatedAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      setShowEditModal(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Seller Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedSeller && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Delete Seller
                    </h3>
                    <p className="text-sm text-gray-600">
                      This action cannot be undone
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700">
                    Are you sure you want to delete{" "}
                    <strong>{selectedSeller.name}</strong>?
                  </p>
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                      <p className="text-sm text-yellow-800">
                        This will permanently remove the seller and may affect
                        existing orders.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteSeller}
                    disabled={submitting}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SellerModals;
