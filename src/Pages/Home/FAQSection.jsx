import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "সত্যিই কি ১০ দিনে মনিটাইজেশন সম্ভব?",
      answer:
        "হ্যাঁ, আমাদের প্রমাণিত পদ্ধতি অনুসরণ করলে ১০ দিনের মধ্যেই মনিটাইজেশন পাবেন। আমরা ১০০% গ্যারান্টি দিচ্ছি। আমাদের হাজার হাজার শিক্ষার্থী ইতিমধ্যে এই পদ্ধতিতে সফল হয়েছেন।",
    },
    {
      question: "নতুন পেজেও কি কাজ করবে?",
      answer:
        "অবশ্যই! আমাদের কোর্স নতুন এবং পুরাতন উভয় ধরনের পেজ ও আইডির জন্য কার্যকর। নতুন পেজের জন্য বিশেষ কৌশল এবং পুরাতন পেজের জন্য আলাদা পদ্ধতি শেখানো হয়েছে।",
    },
    {
      question: "কোর্স কতদিনের জন্য এক্সেস পাবো?",
      answer:
        "আপনি লাইফটাইম এক্সেস পাবেন এবং সাথে থাকবে ফ্রি আপডেট ও সাপোর্ট। Facebook এর নতুন আপডেট অনুযায়ী কোর্স আপডেট করা হয় এবং সেগুলো আপনি ফ্রিতে পাবেন।",
    },
    {
      question: "টাকা ফেরত পলিসি আছে কি?",
      answer:
        "হ্যাঁ, যদি ১০ দিনে মনিটাইজেশন না হয়, আমরা ১০০% টাকা ফেরত দিবো। কোন প্রশ্ন করা হবে না। আমরা আমাদের কোর্সের মান নিয়ে সম্পূর্ণ আত্মবিশ্বাসী।",
    },
    {
      question: "ভিডিও ভিউ বাড়ানোর Apps কিভাবে কাজ করে?",
      answer:
        "আমাদের বিশেষ Apps আপনার ভিডিওকে অর্গানিক উপায়ে লক্ষ লক্ষ মানুষের কাছে পৌঁছে দেয়। এটি Facebook এর নিয়ম মেনেই কাজ করে এবং আপনার পেজের কোনো ক্ষতি হয় না। Apps টি সম্পূর্ণ নিরাপদ এবং কার্যকর।",
    },
    {
      question: "কোর্সটি কি বাংলায়?",
      answer:
        "হ্যাঁ, সম্পূর্ণ কোর্স সহজ বাংলা ভাষায় তৈরি। প্রতিটি ধাপ বিস্তারিতভাবে বাংলায় ব্যাখ্যা করা হয়েছে। স্ক্রিনশট এবং ভিডিও টিউটোরিয়াল সহ সবকিছু বাংলায় পাবেন।",
    },
    {
      question: "সাপোর্ট কিভাবে পাবো?",
      answer:
        "২৪/৭ সাপোর্ট পাবেন। ফেসবুক গ্রুপে, WhatsApp এ এবং ইমেইলে যেকোনো সমস্যার সমাধান পাবেন। আমাদের এক্সপার্ট টিম সবসময় আপনাদের সাহায্য করার জন্য প্রস্তুত।",
    },
    {
      question: "পুরাতন পেজের জন্য আলাদা কিছু আছে?",
      answer:
        "হ্যাঁ, পুরাতন পেজের জন্য বিশেষ কৌশল রয়েছে যা প্রথম দিন থেকেই ভিউ জেনারেট করতে সাহায্য করবে। যারা মাস বছর ধরে কাজ করছেন তাদের পেজ দ্রুত মনিটাইজ করার বিশেষ পদ্ধতি আছে।",
    },
    {
      question: "Facebook এর নীতিমালা লঙ্ঘন হওয়ার সম্ভাবনা আছে কি?",
      answer:
        "একদমই না। আমাদের সব পদ্ধতি Facebook এর নীতিমালা অনুযায়ী তৈরি। আমরা শুধুমাত্র অর্গানিক এবং নিরাপদ পদ্ধতি শেখাই যাতে আপনার পেজ বা আইডির কোনো সমস্যা না হয়।",
    },
    {
      question: "কোর্স করার পর আয় কত হতে পারে?",
      answer:
        "এটি নির্ভর করে আপনার কাজের উপর। তবে আমাদের শিক্ষার্থীরা মাসে ২০,০০০ থেকে ১,০০,০০০ টাকা পর্যন্ত আয় করছেন। নিয়মিত কাজ করলে ভালো আয় সম্ভব।",
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
      <div className="container mx-auto max-w-3xl">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            প্রায়শই জিজ্ঞাসিত <span className="text-blue-600">প্রশ্ন</span>
          </h2>
          <p className="text-xl text-gray-600">
            আপনার সব প্রশ্নের উত্তর এখানে পাবেন
          </p>
        </motion.div>

        <motion.div className="space-y-4" variants={stagger}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center hover:bg-blue-50 transition-colors group"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <span className="font-semibold text-gray-800 pr-4 group-hover:text-blue-700">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openFAQ === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ArrowRight className="w-5 h-5 text-blue-600 transform rotate-90" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openFAQ === index ? "auto" : 0,
                  opacity: openFAQ === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed bg-blue-50 bg-opacity-50">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FAQSection;
