import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// সাময়িক Dashboard পেজ (Day 3 তে আলাদা Layout দিয়ে বানাব)
const UserDashboard = () => (
  <div className="p-10 text-center">
    <h1 className="text-3xl font-bold">User Dashboard</h1>
    <p className="mt-2">Day 3 তে সুন্দর Layout আসবে</p>
  </div>
);

const RiderDashboard = () => (
  <div className="p-10 text-center">
    <h1 className="text-3xl font-bold">Rider Dashboard</h1>
    <p className="mt-2">Day 3 তে সুন্দর Layout আসবে</p>
  </div>
);

const AdminDashboard = () => (
  <div className="p-10 text-center">
    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
    <p className="mt-2">Day 3 তে সুন্দর Layout আসবে</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rider/dashboard"
            element={
              <ProtectedRoute allowedRoles={["rider"]}>
                <RiderDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
