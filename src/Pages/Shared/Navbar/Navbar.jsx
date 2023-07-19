import { Link, useLocation } from "react-router-dom";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import UserContext from "../../../contexts/UserContext";
import { useContext } from "react";

const Navbar = () => {
  const { currentUser, logoutUser } = useContext(UserContext);
  const location = useLocation();
  const handleLogOut = () => {
    logoutUser();
  };

  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/blogs">Blogs</Link>
      </li>
      {currentUser ? (
        <li>
          <Link onClick={handleLogOut}>Sign Out</Link>
        </li>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-gradient-to-r from-accent to-primary">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={1}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl text-white">
          House Hunter
        </Link>
      </div>

      <div className="navbar-end">
        <div className="hidden lg:flex text-white">
          <ul className="menu menu-horizontal p-0">{menuItems}</ul>
        </div>

        <div>
          {(location.pathname === "/dashboard" ||
            location.pathname.startsWith("/dashboard/")) && (
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <MdOutlineDashboardCustomize className="text-2xl text-white" />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
