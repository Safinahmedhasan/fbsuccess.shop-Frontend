import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Award,
  Clock,
  Shield,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Globe,
} from "lucide-react";

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

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-800 text-white py-12 px-4"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={stagger}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <Facebook className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Facebook Success</h3>
                <p className="text-gray-400 text-sm">মনিটাইজেশন কোর্স</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Facebook থেকে সফলভাবে আয় করার জন্য সবচেয়ে কার্যকর কোর্স। ১০ দিনে
              মনিটাইজেশন গ্যারান্টি সহ।
            </p>
            <div className="flex space-x-3">
              <motion.a
                href="#"
                className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#"
                className="bg-green-600 p-2 rounded-full hover:bg-green-700 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <MessageCircle className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#"
                className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Phone className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">
              যোগাযোগ
            </h4>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex items-center hover:text-white transition-colors">
                <Mail className="w-4 h-4 mr-3 text-blue-400 flex-shrink-0" />
                <span>support@facebooksuccess.com</span>
              </div>

              <div className="flex items-center hover:text-white transition-colors">
                <MapPin className="w-4 h-4 mr-3 text-red-400 flex-shrink-0" />
                <span>ঢাকা, বাংলাদেশ</span>
              </div>
            </div>
          </motion.div>

          {/* Important Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">
              গুরুত্বপূর্ণ লিংক
            </h4>
            <div className="space-y-2 text-gray-300 text-sm">
              <a
                href="#"
                className="block hover:text-blue-400 transition-colors"
              >
                কোর্স সম্পর্কে
              </a>
              <a
                href="#"
                className="block hover:text-blue-400 transition-colors"
              >
                রিফান্ড পলিসি
              </a>
              <a
                href="#"
                className="block hover:text-blue-400 transition-colors"
              >
                প্রাইভেসি পলিসি
              </a>
              <a
                href="#"
                className="block hover:text-blue-400 transition-colors"
              >
                শর্তাবলী
              </a>
              <a
                href="#"
                className="block hover:text-blue-400 transition-colors"
              >
                সাপোর্ট
              </a>
              <a
                href="#"
                className="block hover:text-blue-400 transition-colors"
              >
                FAQ
              </a>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">
              বৈশিষ্ট্য
            </h4>
            <div className="space-y-2 text-gray-300 text-sm">
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                <span>১০০% মানি-ব্যাক গ্যারান্টি</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-400 flex-shrink-0" />
                <span>২৪/৭ সাপোর্ট সেবা</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-purple-400 flex-shrink-0" />
                <span>সম্পূর্ণ নিরাপদ পেমেন্ট</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2 text-yellow-400 flex-shrink-0" />
                <span>লাইফটাইম এক্সেস</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-700 mt-8 pt-8"
          variants={fadeInUp}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © ২০২৫ Facebook Success Course. সকল অধিকার সংরক্ষিত।
            </p>
            <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Refund
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
            </div>
          </div>

          <motion.div
            className="mt-6 text-center bg-gray-700 rounded-lg p-4"
            variants={fadeInUp}
          >
            <p className="text-yellow-400 text-sm font-semibold mb-1">
              ⚠️ গুরুত্বপূর্ণ সতর্কতা
            </p>
            <p className="text-gray-300 text-xs">
              কোর্সটি কেনার পর অন্য কাউকে শেয়ার করা সম্পূর্ণ নিষিদ্ধ। এটি আইনত
              দণ্ডনীয় অপরাধ।
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
