import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import Register from "./Register";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    <div>
      <nav className="w-full bg-gradient-to-r from-slate-900 to-slate-700 shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-8xl md:items-center md:flex md:px-8 ">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link to="/">
                <h2 className="font-serif text-2xl font-medium text-white">
                  EduFunds
                </h2>
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      {/* ... Your SVG paths ... */}
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      {/* ... Your SVG paths ... */}
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-20 md:flex md:space-x-20 md:space-y-0">
                <li className="text-white hover:text-indigo-200 text-base font-serif">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="text-white hover:text-indigo-200 text-base font-Noto Sans">
                  <NavLink to="/scholarship">Scholarship</NavLink>
                </li>
                <li className="text-white hover:text-indigo-200 text-base font-Noto Sans">
                  <NavLink to="/details">Details</NavLink>
                </li>
                <li className="text-white hover:text-indigo-200 text-base font-Noto Sans">
                  <NavLink to="/contact">Contact Us</NavLink>
                </li>
              </ul>

              <div className="mt-3 space-y-2 jsutify-between lg:hidden md:inline-block">
                <Link
                  to="/login"
                  className="inline-block w-full px-4 py-3 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                >
                  Sign-up
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden space-x-2 md:inline-block text-xs">
            <Link
              to="/user-login"
              className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 font-semibold"
              ele
            >
              User-Login
            </Link>
            <Link
              to="/admin-login"
              className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100 font-semibold"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
