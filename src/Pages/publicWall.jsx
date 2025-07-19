import React, { useEffect, useState } from "react";
import "../styles/PublicWall.css";
import CapsuleCard from "../Components/CapsuleCard";

function PublicWall() {
  const [capsules, setCapsules] = useState([]);

  useEffect(() => {
    // TODO: replace with real API call
    setCapsules([
      {
        id: 1,
        title: "Hello Future",
        message: "Stay strong!",
        mood: "Hopeful",
      },
      {
        id: 2,
        title: "Don’t forget",
        message: "Learn React well",
        mood: "Motivated",
      },
      {
        id: 2,
        title: "Laravel 12",
        message: "new update",
        mood: "excited",
      },
    ]);
  }, []);

  return (
    <div className="wall-container">
      <h2>Public Wall</h2>
      <div className="capsule-grid">
        {capsules.map((c) => (
          <CapsuleCard key={c.id} capsule={c} />
        ))}
      </div>
    </div>
  );
}

export default PublicWall;
