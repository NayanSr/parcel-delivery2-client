import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import UserLayout from "./layouts/UserLayout";
import RiderLayout from "./layouts/RiderLayout";
import AdminLayout from "./layouts/AdminLayout";

import UserDashboard from "./pages/user/UserDashboard";
import RiderDashboard from "./pages/rider/RiderDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import BookParcel from "./pages/user/BookParcel";
import MyParcels from "./pages/user/MyParcels";
import AllParcels from "./pages/admin/AllParcels";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Routes */}
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="book-parcel" element={<BookParcel />} />
            <Route path="my-parcels" element={<MyParcels />} />
          </Route>

          {/* Rider Routes */}
          <Route
            path="/rider"
            element={
              <ProtectedRoute allowedRoles={["rider"]}>
                <RiderLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<RiderDashboard />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="all-parcels" element={<AllParcels />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
