import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  X,
  TrendingUp,
  FileText,
  MessageSquare,
  Shield,
  Wallet,
} from "lucide-react";

const AdminSidebar = ({ onToggleSidebar, sidebarOpen }) => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      icon: BarChart,
    },
    {
      path: "/admin/sellers",
      name: "Sellers",
      icon: Users,
    },
    {
      path: "/admin/orders",
      name: "Orders",
      icon: ShoppingCart,
    },
    {
      path: "/admin/PaymentMethod",
      name: "Payment Method",
      icon: Wallet,
    },
    {
      path: "/admin/reports",
      name: "Reports",
      icon: FileText,
    },
    {
      path: "/admin/messages",
      name: "Messages",
      icon: MessageSquare,
    },
    {
      path: "/admin/settings",
      name: "Settings",
      icon: Settings,
    },
  ];

  const isActiveRoute = (path) => {
    if (path === "/admin/dashboard" && location.pathname === "/admin") {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:translate-x-0 border-r border-slate-700/50`}
    >
      {/* Sidebar Header */}
      <motion.div
        className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-indigo-900 to-purple-900 border-b border-indigo-800/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-2">
          <motion.div
            className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg flex items-center justify-center"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Shield className="w-5 h-5 text-white" />
          </motion.div>
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        </div>
        <motion.button
          onClick={onToggleSidebar}
          className="lg:hidden text-white hover:text-indigo-200 p-1 rounded-md hover:bg-indigo-800/50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Navigation Menu */}
      <nav className="mt-8 px-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = isActiveRoute(item.path);

            return (
              <motion.div
                key={item.path}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? "text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-600/25"
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                  }`}
                  onClick={onToggleSidebar}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 to-purple-400" />
                  )}

                  <motion.div
                    className="relative z-10"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className="w-5 h-5 mr-3" />
                  </motion.div>

                  <span className="font-medium relative z-10">{item.name}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <motion.div
        className="absolute bottom-6 left-4 right-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <motion.button
          className="flex items-center w-full px-4 py-3 text-slate-300 hover:text-white hover:bg-red-600/20 rounded-xl transition-all duration-300 group border border-slate-700/50 hover:border-red-500/50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <LogOut className="w-5 h-5 mr-3 group-hover:text-red-400" />
          </motion.div>
          <span className="font-medium group-hover:text-red-400">Logout</span>
        </motion.button>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="absolute bottom-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
    </div>
  );
};

export default AdminSidebar;
