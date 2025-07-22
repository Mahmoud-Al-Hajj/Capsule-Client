import React, { useState, useEffect } from "react";
import "../styles/MyCapsules.css";
import axios from "axios";

export default function MyCapsules() {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const storedUserId = localStorage.getItem("user_id");
  const storedName = localStorage.getItem("name");
  const storedEmail = localStorage.getItem("email");
  const RevealAt = localStorage.getItem("reveal_at");

  useEffect(() => {
    if (!storedUserId) return;

    axios
      .get(`http://127.0.0.1:8000/api/user/${storedUserId}/capsules`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCapsules(response.data.payload);
        setLoading(false);
      })

      .catch(console.error);
  }, [storedUserId, token]);

  const getTimeStatus = (revealDate) => {
    const now = new Date();
    const reveal = new Date(revealDate);

    if (reveal <= now) {
      return "revealed";
    } else {
      const diff = reveal - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      return days + " days left";
      //hide this specific capsule
    }
  };

  if (loading) {
    return <div className="loading"></div>;
  }
  return (
    <div>
      {loading ? (
        <div style={{ textAlign: "center", paddingTop: "50px" }}>
          <div className="loading"></div>
          <p>Loading your capsules...</p>
        </div>
      ) : (
        <div className="my-capsules-container">
          <div className="header">
            <h1>{storedName}'s Capsules</h1>
            <p>
              <b>Email:</b> {storedEmail}
            </p>
            <p>
              <b>Capsules:</b> {capsules.length}
            </p>
          </div>
          <div className="capsules-grid">
            {capsules.map((capsule) => (
              <div key={capsule.id} className="capsule-card">
                <h3>{capsule.title}</h3>
                <p>{capsule.message}</p>
                <p>
                  <strong>Mood:</strong> {capsule.mood}
                </p>
                <p>
                  <strong>Country:</strong> {capsule.country}
                </p>
                <p>
                  <strong>Status:</strong> {getTimeStatus(capsule.reveal_at)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
