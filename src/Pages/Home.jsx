import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <h1>Time Capsule</h1>
      <div className="home-buttons">
        <Link to="/add">Add Capsule</Link>
        <Link to="/wall">Public Wall</Link>
      </div>
    </div>
  );
}

export default Home;
