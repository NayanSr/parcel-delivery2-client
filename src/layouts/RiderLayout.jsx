import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RiderLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="rider-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-100 shadow-md px-4">
          <div className="flex-none lg:hidden">
            <label htmlFor="rider-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <Link to="/rider/dashboard" className="btn btn-ghost text-xl text-secondary font-bold">
              Rider Panel
            </Link>
          </div>
          <div className="flex-none gap-2">
            <span className="hidden sm:inline text-sm opacity-70">
              {user?.name} ({user?.role})
            </span>
            <button onClick={handleLogout} className="btn btn-sm btn-outline btn-error">
              Logout
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-6 bg-base-200 min-h-screen">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-40">
        <label htmlFor="rider-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-100 text-base-content">
          <li className="mb-4">
            <div className="text-xl font-bold text-secondary px-2">Rider Panel</div>
          </li>
          <li>
            <Link to="/rider/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/rider/assigned-parcels">Assigned Parcels</Link>
          </li>
          <li>
            <Link to="/rider/profile">Profile</Link>
          </li>
          <li className="mt-auto">
            <button onClick={handleLogout} className="text-error">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RiderLayout;