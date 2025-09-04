import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Eye,
  MessageSquare,
  Heart,
  Share2,
  MoreHorizontal,
} from "lucide-react";

const AdminDashboard = () => {
  // Sample data
  const monthlyData = [
    { name: "Jan", revenue: 4000, users: 240 },
    { name: "Feb", revenue: 3000, users: 139 },
    { name: "Mar", revenue: 2000, users: 980 },
    { name: "Apr", revenue: 2780, users: 390 },
    { name: "May", revenue: 1890, users: 480 },
    { name: "Jun", revenue: 2390, users: 380 },
  ];

  const trafficData = [
    { name: "Desktop", value: 400, color: "#3B82F6" },
    { name: "Mobile", value: 300, color: "#10B981" },
    { name: "Tablet", value: 200, color: "#F59E0B" },
  ];

  const recentPosts = [
    {
      id: 1,
      content: "Just launched our new product line! 🚀",
      likes: 127,
      comments: 23,
      shares: 45,
      time: "2h ago",
    },
    {
      id: 2,
      content: "Behind the scenes of our latest campaign",
      likes: 89,
      comments: 12,
      shares: 28,
      time: "4h ago",
    },
    {
      id: 3,
      content: "Customer testimonial: 'Amazing service!' ⭐",
      likes: 156,
      comments: 34,
      shares: 67,
      time: "6h ago",
    },
  ];

  return (
    <div className="p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">12,345</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-green-500 text-sm font-medium">+12%</span>
            <span className="text-gray-500 text-sm ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-3xl font-bold text-gray-900">$54,321</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-green-500 text-sm font-medium">+8%</span>
            <span className="text-gray-500 text-sm ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Orders</p>
              <p className="text-3xl font-bold text-gray-900">1,234</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <ShoppingCart className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-red-500 text-sm font-medium">-3%</span>
            <span className="text-gray-500 text-sm ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Growth</p>
              <p className="text-3xl font-bold text-gray-900">23.5%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-green-500 text-sm font-medium">+15%</span>
            <span className="text-gray-500 text-sm ml-2">from last month</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Revenue Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Traffic Sources
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trafficData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
              >
                {trafficData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {trafficData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Posts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Posts
          </h3>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="border-b border-gray-100 pb-4 last:border-b-0"
              >
                <p className="text-gray-900 mb-3">{post.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {post.comments}
                    </div>
                    <div className="flex items-center">
                      <Share2 className="w-4 h-4 mr-1" />
                      {post.shares}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span>{post.time}</span>
                    <button className="ml-2 p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">New user registered</p>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
                <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Payment received</p>
                <p className="text-xs text-gray-500">Order #12345 - $299</p>
                <p className="text-xs text-gray-400 mt-1">15 minutes ago</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                <ShoppingCart className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">New order placed</p>
                <p className="text-xs text-gray-500">3 items - $150</p>
                <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <Eye className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Campaign viewed</p>
                <p className="text-xs text-gray-500">Summer Sale - 245 views</p>
                <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
