import { createBrowserRouter } from "react-router-dom";
import Main from "../src/Pages/Main/Main";
import Home from "../src/Pages/Home/Home";
import OrderForm from "../src/Pages/OrderForm/OrderForm";
import AdminLogin from "../src/Pages/AdminLogin/AdminLogin";
import AdminMain from "../src/Pages/Admin/AdminMain/AdminMain";
import AdminDashboard from "../src/Pages/Admin/AdminDashboard/AdminDashboard";
import AdminOrders from "../src/Pages/Admin/AdminOrders/AdminOrders";
import AdminUsers from "../src/Pages/Admin/AdminUsers/AdminUsers";
import AdminProtectedRoute from "../src/Components/Navbar/AdminProtectedRoute/AdminProtectedRoute";
import PaymentMethod from "../src/Pages/Admin/PaymentMethod/PaymentMethod";
import SellerManagement from "../src/Pages/Admin/SellerManagement/SellerManagement";
import OrderSuccess from "../src/Pages/OrderForm/OrderSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/order",
        element: <OrderForm />,
      },
      {
        path: "/order-success",
        element: <OrderSuccess />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <AdminMain />
      </AdminProtectedRoute>
    ),
    children: [
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/users",
        element: <AdminUsers />,
      },
      {
        path: "/admin/orders",
        element: <AdminOrders />,
      },
      {
        path: "/admin/PaymentMethod",
        element: <PaymentMethod />,
      },
      {
        path: "/admin/sellers",
        element: <SellerManagement />,
      },
    ],
  },
]);
