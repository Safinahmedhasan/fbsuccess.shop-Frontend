import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  Smartphone,
  Zap,
  Shield,
  Settings,
  BookOpen,
  CreditCard,
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

const FeaturesSection = () => {
  const features = [
    {
      icon: Award,
      title: "১০ দিনে মনিটাইজেশন গ্যারান্টি",
      description:
        "নতুন পুরাতন সব আইডি ও পেজের জন্য ১০০% গ্যারান্টিসহ কন্টেন্ট মনিটাইজেশন।",
      color: "from-green-400 to-green-600",
    },
    {
      icon: Smartphone,
      title: "ভিডিও ভিউ বাড়ানোর Apps",
      description:
        "আপনার ভিডিও লক্ষ লক্ষ মানুষের কাছে পৌঁছে দেওয়ার জন্য বিশেষ Apps পাবেন।",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Zap,
      title: "তাৎক্ষণিক ভিউ জেনারেশন",
      description:
        "পুরাতন পেজের ভিডিও প্রথম দিন থেকেই প্রচুর ভিউ জেনারেট করবে।",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      icon: Shield,
      title: "Facebook এর সকল নিয়ম",
      description: "আপনার পেজ বা আইডির কখনো সমস্যা হবে না, সব নিয়ম শিখুন।",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: Settings,
      title: "সমস্যা চেক ও সমাধান",
      description: "নিজেই আপনার পেজের সমস্যা চেক করুন এবং সমাধান করুন।",
      color: "from-red-400 to-red-600",
    },
    {
      icon: BookOpen,
      title: "A to Z নতুন পেজ খোলা",
      description: "শূন্য থেকে নতুন পেজ খোলা এবং সেটআপ করার সম্পূর্ণ গাইড।",
      color: "from-indigo-400 to-indigo-600",
    },
    {
      icon: CreditCard,
      title: "ডলার ব্যাংকে আনার পদ্ধতি",
      description:
        "Facebook থেকে আয় করা ডলার কিভাবে ব্যাংকে নিয়ে আসবেন তার সম্পূর্ণ প্রক্রিয়া।",
      color: "from-teal-400 to-teal-600",
    },
    {
      icon: Globe,
      title: "সম্পূর্ণ বাংলা কোর্স",
      description: "সবকিছু সহজ বাংলা ভাষায় বুঝিয়ে দেওয়া হয়েছে।",
      color: "from-pink-400 to-pink-600",
    },
  ];

  return (
    <motion.section
      className="py-20 px-4 bg-gray-50"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={stagger}
    >
      <div className="container mx-auto">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            আমাদের <span className="text-blue-600">কোর্সে</span> যা যা রয়েছে
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            প্রতিটি ফিচার আপনাকে Facebook এ সফল হতে সাহায্য করবে
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={stagger}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
            >
              <div
                className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
