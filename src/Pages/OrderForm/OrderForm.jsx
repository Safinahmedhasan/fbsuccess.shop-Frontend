import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  CreditCard,
  CheckCircle,
  Shield,
  Clock,
  AlertCircle,
  X,
  Check,
  AlertTriangle,
} from "lucide-react";

// Custom Toast Notification Component
const Toast = ({ type, title, message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <Check className="w-6 h-6 text-green-600" />;
      case "error":
        return <AlertTriangle className="w-6 h-6 text-red-600" />;
      case "info":
        return <AlertCircle className="w-6 h-6 text-blue-600" />;
      default:
        return <AlertCircle className="w-6 h-6 text-gray-600" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "success":
        return "text-green-800";
      case "error":
        return "text-red-800";
      case "info":
        return "text-blue-800";
      default:
        return "text-gray-800";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div
        className={`max-w-md w-full ${getBgColor()} border rounded-lg p-4 shadow-lg`}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div className="ml-3 w-0 flex-1">
            <p className={`text-sm font-medium ${getTextColor()}`}>{title}</p>
            <p className={`mt-1 text-sm ${getTextColor()}`}>{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className={`rounded-md inline-flex ${getTextColor()} hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "",
    transactionNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoadingPayments, setIsLoadingPayments] = useState(true);
  const [paymentError, setPaymentError] = useState("");
  const [sellerCode, setSellerCode] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState({
    isVisible: false,
    type: "info",
    title: "",
    message: "",
  });

  // Function to show toast
  const showToast = (type, title, message) => {
    setToast({
      isVisible: true,
      type,
      title,
      message,
    });
  };

  // Function to hide toast
  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  // Extract seller code from URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get("ref");
    if (refCode) {
      setSellerCode(refCode);
    }
  }, []);

  // Fetch payment methods from API
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DataHost}/payment-methods/active`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data.success && data.paymentMethods.length > 0) {
          setPaymentMethods(data.paymentMethods);
          setFormData((prev) => ({
            ...prev,
            paymentMethod: data.paymentMethods[0]._id,
          }));
        } else {
          setPaymentError("কোনো সক্রিয় পেমেন্ট পদ্ধতি পাওয়া যায়নি");
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
        setPaymentError("পেমেন্ট পদ্ধতি লোড করতে সমস্যা হয়েছে");
      } finally {
        setIsLoadingPayments(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "নাম অবশ্যই দিতে হবে";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "নাম কমপক্ষে ২ অক্ষর হতে হবে";
    }

    if (!formData.email.trim()) {
      newErrors.email = "ইমেইল অবশ্যই দিতে হবে";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "সঠিক ইমেইল দিন";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "ফোন নম্বর অবশ্যই দিতে হবে";
    } else if (!/^01[3-9]\d{8}$/.test(formData.phone)) {
      newErrors.phone = "সঠিক বাংলাদেশী ফোন নম্বর দিন (যেমন: 01712345678)";
    }

    if (!formData.transactionNumber.trim()) {
      newErrors.transactionNumber = "Transaction ID অবশ্যই দিতে হবে";
    } else if (formData.transactionNumber.trim().length < 5) {
      newErrors.transactionNumber = "Transaction ID কমপক্ষে ৫ অক্ষর হতে হবে";
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "পেমেন্ট পদ্ধতি নির্বাচন করুন";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast(
        "error",
        "ফর্ম পূরণে ত্রুটি",
        "অনুগ্রহ করে সকল তথ্য সঠিকভাবে পূরণ করুন"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        paymentMethod: formData.paymentMethod,
        transactionId: formData.transactionNumber,
        sellerCode: sellerCode || null,
      };

      const response = await fetch(
        `${import.meta.env.VITE_DataHost}/orders/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (data.success) {
        const selectedPaymentMethod = paymentMethods.find(
          (p) => p._id === formData.paymentMethod
        );

        showToast(
          "success",
          "অর্ডার সফল হয়েছে! 🎉",
          `আপনার অর্ডার নম্বর: ${data.order.orderNumber}। কোর্স শীঘ্রই ইমেইলে পাবেন।`
        );

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          paymentMethod: paymentMethods.length > 0 ? paymentMethods[0]._id : "",
          transactionNumber: "",
        });
        setErrors({});
      } else {
        // Handle different error types
        if (data.message.includes("transaction ID already exists")) {
          showToast(
            "error",
            "Transaction ID ইতিমধ্যে ব্যবহৃত",
            "এই Transaction ID দিয়ে ইতিমধ্যে একটি অর্ডার রয়েছে। নতুন Transaction ID দিন।"
          );
        } else if (
          data.message.includes("Invalid or inactive payment method")
        ) {
          showToast(
            "error",
            "পেমেন্ট পদ্ধতি সমস্যা",
            "নির্বাচিত পেমেন্ট পদ্ধতি বর্তমানে সক্রিয় নেই। অন্য পদ্ধতি নির্বাচন করুন।"
          );
        } else {
          showToast(
            "error",
            "অর্ডার করতে সমস্যা",
            data.message || "অজানা ত্রুটি হয়েছে। আবার চেষ্টা করুন।"
          );
        }
      }
    } catch (error) {
      console.error("Error creating order:", error);
      showToast(
        "error",
        "নেটওয়ার্ক সমস্যা",
        "ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPayment = paymentMethods.find(
    (p) => p._id === formData.paymentMethod
  );

  if (isLoadingPayments) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-4 sm:py-8 px-3 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-screen">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-blue-200 rounded-full animate-spin">
                <div className="w-full h-full border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full animate-pulse shadow-lg">
                  <div className="w-full h-full bg-white rounded-full animate-ping opacity-20"></div>
                </div>
              </div>

              <div
                className="absolute -top-2 -left-2 w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: "200ms" }}
              ></div>
              <div
                className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "400ms" }}
              ></div>
              <div
                className="absolute -bottom-2 -right-2 w-3 h-3 bg-yellow-500 rounded-full animate-bounce"
                style={{ animationDelay: "600ms" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (paymentError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-4 sm:py-8 px-3 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-red-800 mb-2">
              পেমেন্ট পদ্ধতি লোড করতে সমস্যা
            </h3>
            <p className="text-red-600">{paymentError}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Toast Notification */}
      <Toast
        type={toast.type}
        title={toast.title}
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-4 sm:py-8 px-3 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-2xl p-6 sm:p-10 shadow-xl">
              <h1 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">
                Facebook Success কোর্স
              </h1>
              <p className="text-base sm:text-xl text-blue-100 mb-4">
                মাত্র ৩,০০০ টাকায় লাইফটাইম এক্সেস পান
              </p>
              <div className="flex justify-center items-center space-x-4 text-sm sm:text-base">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  ১০ দিনে রেজাল্ট
                </span>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  ১০০% মানি ব্যাক
                </span>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  ৪০% ছাড়
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 sm:p-8">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-green-800 text-lg sm:text-xl mb-2">
                      Facebook Success Complete Course
                    </h3>
                    <p className="text-sm sm:text-base text-green-700 mb-3">
                      ১০ দিনে মনিটাইজেশন গ্যারান্টি সহ কমপ্লিট ট্রেনিং
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center text-green-700 text-sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>৫০+ ভিডিও লেসন</span>
                      </div>
                      <div className="flex items-center text-green-700 text-sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>লাইভ সাপোর্ট সেশন</span>
                      </div>
                      <div className="flex items-center text-green-700 text-sm">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>বোনাস রিসোর্সেস</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center sm:text-right bg-white rounded-xl p-4 border-2 border-green-300">
                    <p className="text-gray-500 line-through text-lg sm:text-xl">
                      ৫,০০০ টাকা
                    </p>
                    <p className="text-3xl sm:text-4xl font-bold text-green-600">
                      ৩,০০০ টাকা
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      ৪০% ছাড় চলছে!
                    </p>
                    <div className="mt-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                      অফার শেষ হওয়ার আগে অর্ডার করুন
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-blue-600" />
                    ব্যক্তিগত তথ্য
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        পূর্ণ নাম *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 sm:py-4 text-sm sm:text-base border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                          errors.name
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="আপনার পূর্ণ নাম লিখুন"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        ইমেইল ঠিকানা *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 sm:py-4 text-sm sm:text-base border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                          errors.email
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="example@gmail.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                        মোবাইল নম্বর *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 sm:py-4 text-sm sm:text-base border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                          errors.phone
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="01XXXXXXXXX"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                    <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-blue-600" />
                    পেমেন্ট পদ্ধতি নির্বাচন করুন
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {paymentMethods.map((method) => (
                      <label
                        key={method._id}
                        className={`cursor-pointer p-4 sm:p-6 border-3 rounded-xl transition-all transform hover:scale-105 ${
                          formData.paymentMethod === method._id
                            ? "border-blue-500 bg-blue-50 shadow-lg"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method._id}
                          checked={formData.paymentMethod === method._id}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="flex items-center">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mr-4 overflow-hidden">
                            <img
                              src={method.image.url}
                              alt={method.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-gray-800 text-base sm:text-lg">
                              {method.name}
                            </p>
                            <p className="text-sm sm:text-base text-gray-600">
                              {method.number}
                            </p>
                          </div>
                          {formData.paymentMethod === method._id && (
                            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                          )}
                        </div>
                      </label>
                    ))}
                  </div>

                  {errors.paymentMethod && (
                    <p className="text-red-500 text-sm mb-4 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.paymentMethod}
                    </p>
                  )}

                  {selectedPayment && (
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 sm:p-6">
                      <h4 className="font-bold text-yellow-800 mb-3 text-base sm:text-lg flex items-center">
                        পেমেন্ট নির্দেশনা:
                      </h4>
                      <div className="space-y-4 text-yellow-700">
                        <p className="font-medium text-sm sm:text-base">
                          {selectedPayment.instructions}
                        </p>

                        <div className="bg-white border border-yellow-300 rounded-lg p-4">
                          <p className="text-sm font-medium text-yellow-800 mb-2">
                            পেমেন্ট নম্বর:
                          </p>
                          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3">
                            <span className="font-bold text-lg text-gray-800 select-all">
                              {selectedPayment.number}
                            </span>
                            <button
                              onClick={() => {
                                const button = event.target.closest("button");
                                const showSuccessMessage = () => {
                                  button.innerHTML = `
                                    <div class="flex items-center space-x-1">
                                      <svg class="w-4 h-4 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                      </svg>
                                      <span class="text-white font-medium">কপি হয়েছে!</span>
                                    </div>
                                  `;
                                  button.className =
                                    "bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-1 transform scale-105 shadow-lg";

                                  const notification =
                                    document.createElement("div");
                                  notification.className =
                                    "fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-xl z-50 flex items-center space-x-2 animate-bounce";
                                  notification.innerHTML = `
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span class="font-medium">নম্বর কপি হয়েছে! ${selectedPayment.number}</span>
                                  `;
                                  document.body.appendChild(notification);

                                  setTimeout(() => {
                                    notification.style.transform =
                                      "translateX(100%)";
                                    notification.style.transition =
                                      "transform 0.3s ease-in-out";
                                    setTimeout(() => {
                                      if (notification.parentNode) {
                                        document.body.removeChild(notification);
                                      }
                                    }, 300);
                                  }, 3000);

                                  setTimeout(() => {
                                    button.innerHTML = `
                                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                      </svg>
                                      <span>কপি</span>
                                    `;
                                    button.className =
                                      "bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 active:scale-95 transform";
                                  }, 2500);
                                };

                                if (
                                  navigator.clipboard &&
                                  window.isSecureContext
                                ) {
                                  navigator.clipboard
                                    .writeText(selectedPayment.number)
                                    .then(() => {
                                      showSuccessMessage();
                                    })
                                    .catch(() => {
                                      fallbackCopyTextToClipboard(
                                        selectedPayment.number
                                      );
                                    });
                                } else {
                                  fallbackCopyTextToClipboard(
                                    selectedPayment.number
                                  );
                                }

                                function fallbackCopyTextToClipboard(text) {
                                  const textArea =
                                    document.createElement("textarea");
                                  textArea.value = text;
                                  textArea.style.top = "0";
                                  textArea.style.left = "0";
                                  textArea.style.position = "fixed";
                                  textArea.style.opacity = "0";
                                  document.body.appendChild(textArea);
                                  textArea.focus();
                                  textArea.select();
                                  try {
                                    const successful =
                                      document.execCommand("copy");
                                    if (successful) {
                                      showSuccessMessage();
                                    }
                                  } catch (err) {
                                    console.error(
                                      "Fallback: Oops, unable to copy",
                                      err
                                    );
                                  }
                                  document.body.removeChild(textArea);
                                }
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 active:scale-95 transform"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                              <span>কপি</span>
                            </button>
                          </div>
                        </div>

                        <p className="text-xl sm:text-2xl font-bold text-green-600">
                          পরিমাণ: ৩,০০০ টাকা
                        </p>
                        <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mt-3">
                          <p className="text-sm sm:text-base font-medium text-yellow-800">
                            পেমেন্ট করার পর অবশ্যই Transaction ID দিন
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Transaction ID / Reference Number *
                  </label>
                  <input
                    type="text"
                    name="transactionNumber"
                    value={formData.transactionNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 sm:py-4 text-sm sm:text-base border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                      errors.transactionNumber
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="পেমেন্ট করার পর Transaction ID দিন"
                  />
                  {errors.transactionNumber && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.transactionNumber}
                    </p>
                  )}
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    পেমেন্ট করার পর যে Transaction ID পাবেন সেটি দিন
                  </p>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 sm:p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-3" />
                    <h4 className="font-bold text-blue-800 text-base sm:text-lg">
                      নিরাপত্তার নিশ্চয়তা
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base text-blue-700">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500 flex-shrink-0" />
                      <span>১০০% নিরাপদ পেমেন্ট সিস্টেম</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500 flex-shrink-0" />
                      <span>১০ দিনে মনিটাইজেশন না হলে ১০০% ফেরত</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500 flex-shrink-0" />
                      <span>২৪/৭ প্রিমিয়াম কাস্টমার সাপোর্ট</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500 flex-shrink-0" />
                      <span>লাইফটাইম এক্সেস ও ফ্রি আপডেট</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || paymentMethods.length === 0}
                    className={`w-full py-4 sm:py-6 px-6 sm:px-8 rounded-xl font-bold text-lg sm:text-xl text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl ${
                      isSubmitting || paymentMethods.length === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:shadow-2xl"
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <Clock className="w-5 h-5 sm:w-6 sm:h-6 mr-3 animate-spin" />
                        অর্ডার প্রসেস করা হচ্ছে...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span>এখনই অর্ডার কনফার্ম করুন - ৩,০০০ টাকা</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-center text-sm sm:text-base text-gray-500 mt-8 space-y-3 border-t pt-6">
                <p>অর্ডার সম্পূর্ণ হলে ১০ মিনিটের মধ্যে কোর্স ইমেইলে পাবেন</p>

                <div className="flex items-center justify-center space-x-4 sm:space-x-6 pt-3 flex-wrap gap-2">
                  <span className="text-green-600 font-medium flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    SSL Secure
                  </span>
                  <span className="text-blue-600 font-medium flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Instant Delivery
                  </span>
                  <span className="text-purple-600 font-medium flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    24/7 Support
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <p className="text-sm sm:text-base text-gray-600 mb-3">
                ইতিমধ্যে <span className="font-bold text-green-600">৫০০০+</span>{" "}
                স্টুডেন্ট এই কোর্স থেকে উপকৃত হয়েছেন
              </p>
              <div className="flex justify-center space-x-4 text-yellow-500 text-xl sm:text-2xl">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                ৪.৯/৫ রেটিং (১২০০+ রিভিউ)
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
