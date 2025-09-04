import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Copy,
  Mail,
  Phone,
  CreditCard,
  Hash,
  User,
  Calendar,
  Home,
  Share2,
} from "lucide-react";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Get order data from URL parameters
    const urlParams = new URLSearchParams(location.search);

    if (urlParams.has("orderNumber")) {
      const data = {
        orderNumber: urlParams.get("orderNumber"),
        customerName: urlParams.get("customerName"),
        customerEmail: urlParams.get("customerEmail"),
        customerPhone: urlParams.get("customerPhone"),
        paymentMethod: urlParams.get("paymentMethod"),
        transactionId: urlParams.get("transactionId"),
        orderAmount: urlParams.get("orderAmount") || "3000",
        createdAt: new Date().toISOString(),
      };
      setOrderData(data);
    } else {
      // If no order data, redirect to home
      navigate("/");
    }
  }, [location, navigate]);

  const copyText = (text, label) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showCopyNotification(label);
        })
        .catch(() => {
          fallbackCopyTextToClipboard(text, label);
        });
    } else {
      fallbackCopyTextToClipboard(text, label);
    }

    function fallbackCopyTextToClipboard(text, label) {
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
          showCopyNotification(label);
        }
      } catch (err) {
        console.error("Failed to copy");
      }
      document.body.removeChild(textArea);
    }
  };

  const showCopyNotification = (label) => {
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-xl z-50 flex items-center space-x-2 animate-bounce";
    notification.innerHTML = `
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
      </svg>
      <span class="font-medium">${label} কপি হয়েছে!</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      notification.style.transition = "transform 0.3s ease-in-out";
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 2000);
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-4 sm:py-8 px-3 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8 animate-pulse">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
              &#127881;
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            অর্ডার সফল হয়েছে!
          </h1>

          <p className="text-lg text-gray-600">
            আপনার কোর্স শীঘ্রই ইমেইলে পাবেন
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
            <h2 className="text-xl font-bold mb-2">অর্ডার বিবরণ</h2>
            <p className="text-green-100">Facebook Success Complete Course</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Order Number */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <Hash className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">অর্ডার নম্বর</p>
                  <p className="font-bold text-lg text-gray-900">
                    {orderData.orderNumber}
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyText(orderData.orderNumber, "অর্ডার নম্বর")}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">নাম</p>
                    <p className="font-medium text-gray-900">
                      {orderData.customerName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">ইমেইল</p>
                    <p className="font-medium text-gray-900 break-all">
                      {orderData.customerEmail}
                    </p>
                  </div>
                  <button
                    onClick={() => copyText(orderData.customerEmail, "ইমেইল")}
                    className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">ফোন</p>
                    <p className="font-medium text-gray-900">
                      {orderData.customerPhone}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      copyText(orderData.customerPhone, "ফোন নম্বর")
                    }
                    className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">অর্ডারের সময়</p>
                    <p className="font-medium text-gray-900">
                      {new Date().toLocaleString("bn-BD")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                পেমেন্ট তথ্য
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">পেমেন্ট পদ্ধতি</p>
                    <p className="font-medium text-gray-900">
                      {orderData.paymentMethod}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <Hash className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Transaction ID</p>
                    <p className="font-medium text-gray-900">
                      {orderData.transactionId}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      copyText(orderData.transactionId, "Transaction ID")
                    }
                    className="p-1 text-gray-500 hover:text-green-600 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Price Info */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg border border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">
                  মোট পরিমাণ
                </span>
                <span className="text-2xl font-bold text-green-600">
                  ৩,০০০ টাকা
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            পরবর্তী ধাপসমূহ
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">১</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">ইমেইল চেক করুন</h4>
                <p className="text-gray-600 text-sm">
                  ১০ মিনিটের মধ্যে আপনার ইমেইলে কোর্স অ্যাক্সেস লিংক পাবেন
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold">২</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">কোর্স শুরু করুন</h4>
                <p className="text-gray-600 text-sm">
                  লিংকে ক্লিক করে আপনার Facebook Success journey শুরু করুন
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold">৩</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">সাপোর্ট নিন</h4>
                <p className="text-gray-600 text-sm">
                  যেকোনো সমস্যায় ২৪/৭ কাস্টমার সাপোর্ট উপলব্ধ
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>হোম পেজে ফিরুন</span>
          </button>

          <button
            onClick={() => {
              const shareText = `আমি Facebook Success কোর্স কিনেছি! অর্ডার নম্বর: ${orderData.orderNumber}`;
              if (navigator.share) {
                navigator.share({
                  title: "Facebook Success Course",
                  text: shareText,
                });
              } else {
                copyText(shareText, "শেয়ার টেক্সট");
              }
            }}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
          >
            <Share2 className="w-5 h-5" />
            <span>শেয়ার করুন</span>
          </button>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-blue-800 font-medium mb-2">
            মনে রাখবেন: ১০ দিনে মনিটাইজেশন না হলে ১০০% ফেরত গ্যারান্টি!
          </p>
          <p className="text-blue-600 text-sm">
            আপনার সফলতার জন্য আমরা সবসময় পাশে আছি
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
