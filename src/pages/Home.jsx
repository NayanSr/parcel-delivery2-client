import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-md px-4">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            Parcel Delivery
          </Link>
        </div>
        <div className="flex-none gap-2">
          {user ? (
            <>
              <span className="text-sm">Hello, {user.name}</span>
              <button onClick={logout} className="btn btn-sm btn-error">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="hero min-h-[80vh]">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Parcel Delivery App</h1>
            <p className="py-6">
              Fast, reliable and secure parcel delivery service.
            </p>
            {!user && (
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
            )}
            {user && (
              <Link
                to={
                  user.role === "admin"
                    ? "/admin/dashboard"
                    : user.role === "rider"
                    ? "/rider/dashboard"
                    : "/user/dashboard"
                }
                className="btn btn-primary"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;