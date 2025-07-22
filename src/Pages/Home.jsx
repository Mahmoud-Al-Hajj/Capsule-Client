import React from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero">
        <h1>Preserve Your Memories for the Future</h1>
        <p>Store messages and photos to be opened years from now</p>
        <div className="cta-buttons">
          <Link to="/add" className="primary-btn">
            Create Time Capsule
          </Link>
          <Link to="/wall" className="secondary-btn">
            View Public Capsules
          </Link>
        </div>
      </div>

      <h2 className="section-title">Your Time Capsule Journey</h2>
      <div className="steps-container">
        <div className="step">
          <div className="step-number">1</div>
          <div className="step-content">
            <h3> Add Your Content</h3>
            <p>Upload photos and write messages</p>
          </div>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <div className="step-content">
            <h3>Set Unlock Date</h3>
            <p>Choose when your capsule becomes viewable</p>
          </div>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <div className="step-content">
            <h3>Save or Share</h3>
            <p>Keep it private or public, and share with friends</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
