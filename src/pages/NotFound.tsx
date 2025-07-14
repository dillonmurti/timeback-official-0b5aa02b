import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center relative">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl text-gray-600 absolute top-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline absolute top-24 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
