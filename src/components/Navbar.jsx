import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white  ">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link onClick={() => setIsOpen(false)} to="/" className="text-2xl font-bold text-red-500">
          SPECTRE
        </Link>

        {/* Menu for larger screens */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link onClick={() => setIsOpen(false)} to="/" className="hover:text-red-500">
            Home
          </Link>
          {!!user.teamName && <Link onClick={() => setIsOpen(false)} to="/dashboard" className="hover:text-red-500">
            Dashboard
          </Link>}
          {!!!user.teamName && <Link onClick={() => setIsOpen(false)} to="/team" className="hover:text-red-500">
            Team
          </Link>}
          <Link onClick={() => setIsOpen(false)} to="/profile" className="hover:text-red-500">
            Profile
          </Link>
          {/* Logout button */}
          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
            >
              Logout
            </button>
          )}
        </div>

        {/* Hamburger icon for smaller screens */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <Link onClick={() => setIsOpen(false)}
            to="/"
            className="block px-4 py-2 hover:bg-gray-700 hover:text-red-500"
          >
            Home
          </Link>
          {!!user.teamName && <Link onClick={() => setIsOpen(false)}
            to="/dashboard"
            className="block px-4 py-2 hover:bg-gray-700 hover:text-red-500"
          >
            Dashboard
          </Link>}
          {!!!user.teamName && <Link onClick={() => setIsOpen(false)}
            to="/team"
            className="block px-4 py-2 hover:bg-gray-700 hover:text-red-500"
          >
            Team
          </Link>}
          <Link onClick={() => setIsOpen(false)}
            to="/profile"
            className="block px-4 py-2 hover:bg-gray-700 hover:text-red-500"
          >
            Proflie
          </Link>
          {/* Logout button for mobile */}
          {user && (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
