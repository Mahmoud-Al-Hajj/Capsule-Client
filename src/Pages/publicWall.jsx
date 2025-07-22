import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PublicWall.css";
import CapsuleCard from "../Components/CapsuleCard";

function PublicWall() {
  const token = localStorage.getItem("token");
  const [capsules, setCapsules] = useState([]);
  const [country, setCountry] = useState("");
  const [mood, setMood] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCapsules = () => {
    setLoading(true);

    const params = {};
    if (country && country !== "All") params.country = country;
    if (mood && mood !== "All") params.mood = mood;
    if (fromDate) params.from_date = fromDate;
    if (toDate) params.to_date = toDate;
    //If "All" is selected, that key (e.g. country or mood) is not sent in the API request.

    axios
      .get("http://127.0.0.1:8000/api/user/public_wall", {
        headers: { Authorization: `Bearer ${token}` },
        params: params,
      })
      .then((response) => {
        setCapsules(response.data.payload);
      })
      .catch((error) => {
        console.error("Error fetching capsules", error);
        setCapsules([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCapsules();
  }, []);

  return (
    <div className="all">
      <div className="public-wall">
        <h1 className="public-wall-title">Public Capsules</h1>

        <div className="filters">
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option>All</option>
            <option>Lebanon</option>
            <option>USA</option>
            <option>Germany</option>
            <option>Canada</option>
            <option>UK</option>
            <option>India</option>
            <option>Spain</option>
            <option>France</option>
            <option>Italy</option>
          </select>

          <select value={mood} onChange={(e) => setMood(e.target.value)}>
            <option>All</option>
            <option>Happy</option>
            <option>Sad</option>
            <option>Excited</option>
            <option>Nostalgic</option>
            <option>anxious</option>
            <option>angry</option>
            <option>calm</option>
            <option>confused</option>
            <option>depressed</option>
            <option>excited</option>
            <option>frustrated</option>
          </select>
          <div className="date-filters">
            <p>From Date</p>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              placeholder="From date"
            />
            <p>To Date</p>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              placeholder="To date"
            />
          </div>
          <button onClick={fetchCapsules}>Apply Filters</button>
        </div>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <div className="loading"></div>
          </div>
        ) : (
          <div className="capsules-container">
            {capsules.map((capsule) => (
              <CapsuleCard
                key={capsule.id}
                title={capsule.title}
                message={capsule.message}
                mood={capsule.mood}
                country={capsule.country}
                reveal_at={capsule.reveal_at}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PublicWall;
