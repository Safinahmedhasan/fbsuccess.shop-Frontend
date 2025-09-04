import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Clock, Phone, MessageCircle } from "lucide-react";

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

const CTASection = () => {
  return (
    <motion.section
      className="py-20 px-4 bg-gradient-to-r from-green-400 via-green-500 to-green-600"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={stagger}
    >
      <div className="container mx-auto text-center">
        <motion.div variants={fadeInUp}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            আর দেরি না করে{" "}
            <span className="text-yellow-300">আজই শুরু করুন!</span>
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            হাজার হাজার মানুষ ইতিমধ্যে Facebook থেকে আয় শুরু করেছেন। আপনিও
            পারবেন!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <motion.button
              className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="mr-2" />
              এখনই অর্ডার করুন - ৩,০০০ টাকা
            </motion.button>

            <motion.button
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transition-all flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="mr-2" />
              কল করুন এখনই
            </motion.button>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8"
            variants={stagger}
          >
            <motion.div
              className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
            >
              <Shield className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
              <h3 className="font-bold text-white mb-2">১০০% নিরাপদ</h3>
              <p className="text-green-100 text-sm">SSL সিকিউর পেমেন্ট</p>
            </motion.div>

            <motion.div
              className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
            >
              <Clock className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
              <h3 className="font-bold text-white mb-2">২৪/৭ সাপোর্ট</h3>
              <p className="text-green-100 text-sm">যেকোনো সময় সাহায্য</p>
            </motion.div>

            <motion.div
              className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
            >
              <MessageCircle className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
              <h3 className="font-bold text-white mb-2">তাৎক্ষণিক ডেলিভারি</h3>
              <p className="text-green-100 text-sm">পেমেন্টের সাথে সাথেই</p>
            </motion.div>
          </motion.div>

          <motion.div
            className="bg-red-500 bg-opacity-90 rounded-xl p-6 max-w-2xl mx-auto"
            variants={fadeInUp}
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              ⏰ সীমিত সময়ের অফার!
            </h3>
            <p className="text-red-100 text-lg">
              মাত্র <span className="font-bold">১০০ জন</span> শিক্ষার্থীর জন্য
              এই বিশেষ মূল্য
            </p>
            <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-3">
              <p className="text-white font-semibold">
                বাকি আছে মাত্র:{" "}
                <span className="text-yellow-300 text-xl font-bold">২৩ জন</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CTASection;
