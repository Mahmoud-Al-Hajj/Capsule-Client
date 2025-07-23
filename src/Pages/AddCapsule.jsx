import React, { useState } from "react";
import "../styles/AddCapsule.css";
import axios from "axios";
import { useEffect } from "react";

function AddCapsule() {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [mood, setMood] = useState("");
  const [reveal_at, setReveal_at] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: title.trim(),
        user_id: userId,
        message: message.trim(),
        mood: mood.trim(),
        reveal_at: reveal_at,
        is_public: isPublic,
        ...(photo && { photo }),
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/add_capsule",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Success:", response.data);
      window.location.href = "/profile";
    } catch (error) {}
  };

  return (
    <div className="container">
      <h2 className="h22">Create Your Time Capsule</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Capsule Title
          <input
            type="text"
            name="title"
            placeholder="e.g. 'Letter to My Future Self'"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Your Message
          <textarea
            rows="5"
            cols="42"
            name="message"
            placeholder="Write your thoughts..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>

        <label>
          Current Mood
          <input
            type="text"
            name="mood"
            placeholder=" Happy, Hopeful, Nostalgic"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            required
          />
        </label>
        <label>
          Image (Optional)
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </label>
        <label className="labels">
          Reveal Date
          <input
            type="date"
            name="reveal_at"
            className="date-input"
            onChange={(e) => setReveal_at(e.target.value)}
            value={reveal_at}
            required
          />
          Is Public?
          <input
            type="checkbox"
            name="isPublic"
            className="custom-checkbox"
            onChange={(e) => setIsPublic(e.target.checked)}
            checked={isPublic}
          />
        </label>

        <button type="submit" className="seal-button">
          Create Capsule
        </button>
      </form>
    </div>
  );
}

export default AddCapsule;
