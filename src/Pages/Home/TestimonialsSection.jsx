import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

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

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "রহিম আহমেদ",
      role: "ইউটিউবার",
      comment: "মাত্র ৭ দিনেই আমার পেজ মনিটাইজ হয়ে গেছে! অসাধারণ কোর্স।",
      rating: 5,
      avatar: "👨‍💼",
    },
    {
      name: "ফাতেমা খাতুন",
      role: "কন্টেন্ট ক্রিয়েটর",
      comment: "এই কোর্সের পর আমার ভিডিওতে লক্ষ লক্ষ ভিউ আসছে।",
      rating: 5,
      avatar: "👩‍💻",
    },
    {
      name: "করিম উদ্দিন",
      role: "ডিজিটাল মার্কেটার",
      comment: "Facebook থেকে এখন মাসে ৫০,০০০ টাকা আয় করছি।",
      rating: 5,
      avatar: "👨‍🎓",
    },
    {
      name: "সালমা বেগম",
      role: "হাউজওয়াইফ",
      comment: "ঘর থেকে বসে এখন ভালো একটা আয় হচ্ছে। ধন্যবাদ!",
      rating: 5,
      avatar: "👩‍🦳",
    },
    {
      name: "নাসির হোসেন",
      role: "স্টুডেন্ট",
      comment: "পড়াশোনার পাশাপাশি মাসিক ৩০,০০০ টাকা আয় করছি।",
      rating: 5,
      avatar: "👨‍🎓",
    },
    {
      name: "রুমা আক্তার",
      role: "গৃহিণী",
      comment: "স্বামীর আয়ের চেয়ে বেশি আয় করছি Facebook থেকে।",
      rating: 5,
      avatar: "👩‍💼",
    },
  ];

  return (
    <motion.section
      className="py-20 px-4 bg-white"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={stagger}
    >
      <div className="container mx-auto">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            আমাদের <span className="text-blue-600">সফল শিক্ষার্থীরা</span> কি
            বলেন
          </h2>
          <p className="text-xl text-gray-600">
            হাজার হাজার মানুষ ইতিমধ্যে সফল হয়েছেন
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={stagger}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-blue-100"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic leading-relaxed">
                "{testimonial.comment}"
              </p>
              <div className="flex items-center">
                <div className="text-3xl mr-3">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-bold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-blue-600 font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="text-center mt-12" variants={fadeInUp}>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-green-800 mb-2">
              ৫০০০+ সন্তুষ্ট শিক্ষার্থী
            </h3>
            <p className="text-green-700">
              গড় রেটিং: <span className="font-bold">৪.৯/৫</span> ⭐⭐⭐⭐⭐
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
