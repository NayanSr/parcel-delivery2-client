import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4">
      <h1 className="text-7xl font-bold text-primary">404</h1>
      <p className="text-2xl mt-4 mb-2">Page Not Found</p>
      <p className="opacity-60 mb-8 text-center">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;