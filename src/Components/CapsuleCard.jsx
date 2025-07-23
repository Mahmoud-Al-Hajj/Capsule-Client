import React from "react";
import "../styles/CapsuleCard.css";

function CapsuleCard({ title, message, mood, country, reveal_at, photo }) {
  return (
    <div className="capsule-card">
      <div className="capsule-photo">
        {photo && (
          <img
            src={`http://127.0.0.1:8000${photo}`}
            alt="Capsule"
            className="capsule-photo"
          />
        )}
      </div>
      <h3>{title}</h3>
      <p>{message}</p>
      <p>
        <b>Mood:</b> {mood}
      </p>
      <p>
        <b>Country:</b> {country}
      </p>
      <p>
        <b>Reveal Date:</b> {reveal_at}
      </p>
    </div>
  );
}

export default CapsuleCard;
