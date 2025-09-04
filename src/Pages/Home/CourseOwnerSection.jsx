import React from "react";
import CourseOwner from "../../assets/CourseOwner.jpeg";

const CourseOwnerSection = () => {
  const expertise = [
    "Facebook Content Monetization Expert",
    "Digital Marketing Specialist",
    "Social Media Growth Strategist",
    "YouTube & Facebook Algorithm Expert",
    "Online Course Creator",
    "E-commerce Business Consultant",
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            আপনার <span className="text-blue-600">মেন্টর</span> সম্পর্কে জানুন
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Facebook মনিটাইজেশনের ক্ষেত্রে বাংলাদেশের অন্যতম সফল এক্সপার্ট
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Owner Info */}
          <div className="text-center lg:text-left">
            {/* Profile Image */}
            <div className="relative mb-8 mx-auto lg:mx-0 w-fit">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl border-4 border-white relative">
                <img
                  src={CourseOwner}
                  alt="Imran BP"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-800 px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                ⭐ Top Rated
              </div>
              <div className="absolute -bottom-2 -left-2 bg-blue-500 text-white p-2 rounded-full shadow-lg">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Name and Title */}
            <div className="mb-6">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Imran BP
              </h3>
              <p className="text-xl text-blue-600 font-semibold mb-4">
                Facebook Monetization Expert
              </p>
              <p className="text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                বাংলাদেশের হাজার হাজার মানুষকে Facebook থেকে আয় করার পথ
                দেখিয়েছেন। তার পদ্ধতি অনুসরণ করে অসংখ্য মানুষ আজ সফল।
              </p>
            </div>

            {/* Expertise List */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-gray-800 mb-4">
                বিশেষত্ব:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {expertise.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Content without Achievements */}
          <div className="space-y-8">
            {/* Success Story */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z"
                  />
                </svg>
                <h4 className="text-xl font-bold text-gray-800">
                  সাকসেস স্টোরি
                </h4>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                "আমি নিজে Facebook থেকে মাসিক ৫-৬ লক্ষ টাকা আয় করি। আমার শেখানো
                পদ্ধতি অনুসরণ করে আমার শিক্ষার্থীরাও মাসিক ৫০ হাজার থেকে ২ লক্ষ
                টাকা পর্যন্ত আয় করছেন।"
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>৫+ বছরের প্রমাণিত অভিজ্ঞতা</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="text-center mt-16 bg-blue-50 rounded-2xl p-8">
          <div className="text-4xl text-blue-600 mb-4">"</div>
          <p className="text-xl text-gray-700 italic max-w-4xl mx-auto leading-relaxed">
            আমার লক্ষ্য হলো বাংলাদেশের প্রতিটি মানুষকে ডিজিটাল মার্কেটিং এর
            মাধ্যমে স্বাবলম্বী করে তোলা। Facebook থেকে আয় করা কোনো জাদু নয়,
            সঠিক পদ্ধতি জানলেই সবাই পারবে।
          </p>
          <div className="text-4xl text-blue-600 mt-4 rotate-180">"</div>
          <p className="text-blue-600 font-semibold mt-4">- Imran BP</p>
        </div>
      </div>
    </section>
  );
};

export default CourseOwnerSection;
