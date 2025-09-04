import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
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

const PricingSection = () => {
  const handleLogoClick = () => {
    window.location.href = "/order";
  };

  return (
    <motion.section
      className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={stagger}
    >
      <div className="container mx-auto text-center">
        <motion.div variants={fadeInUp} className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            বিশেষ অফার!
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            সীমিত সময়ের জন্য মাত্র ৩,০০০ টাকায় সম্পূর্ণ কোর্স
          </p>
        </motion.div>

        <motion.div
          variants={scaleUp}
          className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6">
            <h3 className="text-2xl font-bold mb-2">Facebook Success কোর্স</h3>
            <p className="text-green-100">সম্পূর্ণ প্যাকেজ</p>
          </div>

          <div className="p-8">
            <div className="text-center mb-6">
              <span className="text-gray-400 line-through text-2xl">
                ৫,০০০ টাকা
              </span>
              <div className="text-4xl font-bold text-gray-800 mt-2">
                ৩,০০০ <span className="text-xl text-gray-600">টাকা</span>
              </div>
              <p className="text-green-600 font-semibold mt-2">৪০% ছাড়!</p>
            </div>

            <div className="space-y-3 mb-8 text-left">
              {[
                "১০ দিনে মনিটাইজেশন গ্যারান্টি",
                "ভিডিও ভিউ বৃদ্ধির Apps",
                "সব নিয়ম ও সমাধান",
                "লাইফটাইম সাপোর্ট",
                "১০০% মানি-ব্যাক গ্যারান্টি",
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <motion.button
              onClick={handleLogoClick}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CreditCard className="mr-2" />
              এখনই কিনুন
            </motion.button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              ⚠️ কোর্স নেওয়ার পরে অন্য কাউকে শেয়ার করবেন না
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PricingSection;
