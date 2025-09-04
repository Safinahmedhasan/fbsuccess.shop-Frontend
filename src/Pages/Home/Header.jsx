import React from "react";
import { DollarSign, Facebook } from "lucide-react";

const Header = () => {
  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-4 px-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div onClick={handleLogoClick} className="cursor-pointer">
          <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200">
            <div className="bg-white p-2 rounded-full">
              <Facebook className="text-blue-600 text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Facebook Success</h1>
              <p className="text-xs text-blue-200">মনিটাইজেশন কোর্স</p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-2 bg-green-500 px-4 py-2 rounded-full hover:scale-105 transition-transform duration-200">
          <DollarSign className="text-white text-sm" />
          <span className="text-sm font-semibold">১০০% গ্যারান্টি</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
