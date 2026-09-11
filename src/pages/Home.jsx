import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 gap-6 px-4">
      <h1 className="text-4xl font-bold text-primary">Parcel Delivery App</h1>
      <p className="text-lg opacity-70">Simple & Fast Delivery System</p>

      {user ? (
        <div className="card bg-base-100 shadow-xl p-6 text-center">
          <p className="mb-2">
            Welcome, <strong>{user.name}</strong> ({user.role})
          </p>
          <div className="flex gap-3 justify-center mt-4">
            {user.role === "admin" && (
              <Link to="/admin/dashboard" className="btn btn-primary">
                Go to Admin Dashboard
              </Link>
            )}
            {user.role === "rider" && (
              <Link to="/rider/dashboard" className="btn btn-primary">
                Go to Rider Dashboard
              </Link>
            )}
            {user.role === "user" && (
              <Link to="/user/dashboard" className="btn btn-primary">
                Go to User Dashboard
              </Link>
            )}
            <button onClick={logout} className="btn btn-outline">
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/register" className="btn btn-outline">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;