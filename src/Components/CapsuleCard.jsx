import React from "react";
import "../styles/CapsuleCard.css";

function CapsuleCard({ capsule }) {
  return (
    <div className="capsule-card">
      <h3>{capsule.title}</h3>
      <p>{capsule.message}</p>
      <span className="mood">{capsule.mood}</span>
    </div>
  );
}

export default CapsuleCard;
