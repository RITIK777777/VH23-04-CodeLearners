import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../Context/cart";
import Badge from '@mui/material/Badge';
import Sidebar from "./Sidebar";

// import '../index.css'
import Dashboard from './../../pages/user/Dashboard';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarDropdown"
      aria-controls="navbarDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <Link to="/" className="navbar-brand mt-10">
      EduScholar
    </Link>

    <div className="collapse navbar-collapse" id="navbarDropdown">
      <ul className=" w-45 navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            to="/categories"
            data-bs-toggle="dropdown"
          >
            Categories
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/categories">
                All Categories
              </Link>
            </li>
            {categories?.map((c) => (
              <li key={c.slug}>
                <Link className="dropdown-item" to={`/category/${c.slug}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/login"
                data-bs-toggle="dropdown"
              >
                Login
              </Link>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/login">
                  USER LOGIN
                </Link>
                <Link className="dropdown-item" to="/login">
                  ADMIN LOGIN
                </Link>
                <div className="dropdown-divider"></div>
                
              </div>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                style={{ border: "none" }}
              >
                {auth?.user?.name}
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    to="/dashboard"
                    className="dropdown-item"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleLogout}
                    to="/login"
                    className="dropdown-item"
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </li>
          </>
        )}
        <SearchInput/>
      </ul>
    </div>
    
  </div>
</nav>

      
    </>
  );
};

export default Header;
