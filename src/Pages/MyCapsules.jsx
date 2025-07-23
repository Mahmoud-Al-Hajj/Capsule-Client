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
  const is_public = localStorage.getItem("is_public");
  const [photo, setPhoto] = useState(null);

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
        setPhoto(response.data.payload.photo);
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
                {capsule.photo && (
                  <img
                    src={`http://127.0.0.1:8000${capsule.photo}`}
                    alt="Capsule"
                    className="capsule-photo"
                  />
                )}
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
                <p>
                  <strong>Visibility:</strong>
                  {capsule.is_public ? "Public" : "Private"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
