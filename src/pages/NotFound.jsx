import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl mt-4">Page Not Found</p>
        <Link to="/" className="btn btn-primary mt-6">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;