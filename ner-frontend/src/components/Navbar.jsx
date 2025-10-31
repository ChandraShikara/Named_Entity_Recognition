import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-title">🧠 Named Entity Recognition</div>
      <ul className="nav-links">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === "/model-info" ? "active" : ""}>
          <Link to="/model-info">Model Info</Link>
        </li>
        <li className={location.pathname === "/applications" ? "active" : ""}>
          <Link to="/applications">Applications</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
