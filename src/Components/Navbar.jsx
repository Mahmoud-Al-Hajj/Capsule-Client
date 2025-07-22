import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("name"));
  }, []);
  const isLoggedIn = localStorage.getItem("token");

  if (!isLoggedIn) {
    return null;
  }

  const handleLogout = async () => {
    try {
      localStorage.clear();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Time Capsule
      </Link>
      <ul>
        <li>
          <Link to="/profile">{name} </Link>
        </li>
        <li>
          <Link to="/add">Add Capsule</Link>
        </li>
        <li>
          <Link to="/wall">Public Wall</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/logout" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
