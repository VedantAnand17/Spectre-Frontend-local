import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-red-500">404</h1>
        <h2 className="text-3xl md:text-5xl font-bold mt-4">Page Not Found</h2>
        <p className="mt-2 text-gray-400">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
