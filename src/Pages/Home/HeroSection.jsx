import React from "react";
import { motion } from "framer-motion";
import {
  Play,
  DollarSign,
  TrendingUp,
  Users,
  Star,
  Eye,
  Shield,
  Award,
  Target,
  CheckCircle,
  Clock,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8 },
};

const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleUp = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5 },
};

const HeroSection = () => {
  const handleLogoClick = () => {
    window.location.href = "/order";
  };
  return (
    <motion.section
      className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 overflow-hidden"
      initial="initial"
      animate="animate"
      variants={stagger}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={fadeInLeft}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Guarantee Badge */}
            <motion.div
              className="inline-flex items-center bg-green-100 text-green-800 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm"
              variants={scaleUp}
            >
              <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="font-semibold">১০০% মনি-ব্যাক গ্যারান্টি</span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
              মাত্র{" "}
              <span className="text-blue-600 relative">
                ১০ দিনে
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-1 bg-blue-600 opacity-30"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </span>
              <br />
              <span className="text-green-600">Facebook</span> থেকে
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                আয় শুরু করুন!
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
              গ্যারান্টি সহ কন্টেন্ট মনিটাইজেশন কোর্স। নতুন-পুরাতন সব আইডি ও
              পেজের জন্য।
            </p>

            {/* Key Points */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 px-2 sm:px-0"
              variants={stagger}
            >
              {[
                "১০ দিনে মনিটাইজেশন",
                "লক্ষ লক্ষ ভিউ গ্যারান্টি",
                "২৪/৭ সাপোর্ট",
                "লাইফটাইম এক্সেস",
              ].map((point, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-center text-sm sm:text-base text-gray-700"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500 flex-shrink-0" />
                  <span>{point}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Button */}
            <button onClick={handleLogoClick}>
              <div className="flex justify-center lg:justify-start mb-6 sm:mb-8 px-2 sm:px-0">
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-xl shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-300 min-w-[250px] sm:min-w-[300px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                  এখনই অর্ডার করুন
                </motion.button>
              </div>
            </button>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500"
              variants={fadeInUp}
            >
              <div className="flex items-center bg-white px-3 py-2 rounded-full shadow-sm">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-blue-500" />
                <span className="font-medium">৫০০০+ শিক্ষার্থী</span>
              </div>
              <div className="flex items-center bg-white px-3 py-2 rounded-full shadow-sm">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-yellow-500" />
                <span className="font-medium">৪.৯ রেটিং</span>
              </div>
              <div className="flex items-center bg-white px-3 py-2 rounded-full shadow-sm">
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-500" />
                <span className="font-medium">বাংলাদেশ</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual Content */}
          <motion.div
            variants={fadeInRight}
            className="relative order-1 lg:order-2"
          >
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 opacity-20 rounded-3xl transform rotate-3 scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 opacity-10 rounded-3xl transform -rotate-2 scale-110"></div>

            {/* Main Content Box */}
            <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl">
              {/* Feature Cards Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                {[
                  {
                    icon: DollarSign,
                    label: "মনিটাইজেশন",
                    color: "bg-green-500",
                    subtitle: "১০ দিনে",
                  },
                  {
                    icon: TrendingUp,
                    label: "ভিউ বৃদ্ধি",
                    color: "bg-blue-500",
                    subtitle: "লক্ষ লক্ষ",
                  },
                  {
                    icon: Shield,
                    label: "নিরাপদ পদ্ধতি",
                    color: "bg-purple-500",
                    subtitle: "১০০%",
                  },
                  {
                    icon: Target,
                    label: "নিশ্চিত ফলাফল",
                    color: "bg-red-500",
                    subtitle: "গ্যারান্টি",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`${item.color} text-white p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl text-center shadow-lg relative overflow-hidden`}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-white opacity-10 rounded-full transform scale-150 -translate-y-1/2 -translate-x-1/2"></div>

                    <item.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mx-auto mb-1 sm:mb-2 relative z-10" />
                    <p className="text-xs sm:text-sm md:text-base font-bold relative z-10">
                      {item.label}
                    </p>
                    <p className="text-xs opacity-90 relative z-10">
                      {item.subtitle}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Special Offer Banner */}
              <motion.div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center text-white shadow-lg"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2" />
                <p className="font-bold text-sm sm:text-base mb-1">
                  সীমিত সময়ের অফার!
                </p>
                <p className="text-xs sm:text-sm opacity-90">
                  মাত্র ৩,০০০ টাকা (৫,০০০ টাকার পরিবর্তে)
                </p>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-800 p-2 sm:p-3 rounded-full font-bold text-xs sm:text-sm shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ৪০% ছাড়!
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -left-2 bg-green-500 text-white p-2 sm:p-3 rounded-full font-bold text-xs sm:text-sm shadow-lg"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              ৫০০০+ সন্তুষ্ট
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Trust Indicators */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 lg:mt-16 px-2 sm:px-0"
          variants={stagger}
        >
          {[
            { text: "SSL নিরাপদ পেমেন্ট", icon: Shield },
            { text: "২৪/৭ সাপোর্ট", icon: Clock },
            { text: "লাইফটাইম আপডেট", icon: Globe },
            { text: "১০০% মানি-ব্যাক", icon: Award },
          ].map((trust, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center text-center sm:text-left bg-white p-3 rounded-lg shadow-sm"
            >
              <trust.icon className="w-5 h-5 mb-2 sm:mb-0 sm:mr-2 text-blue-600 flex-shrink-0" />
              <span className="text-gray-600 text-xs sm:text-sm font-medium">
                {trust.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
