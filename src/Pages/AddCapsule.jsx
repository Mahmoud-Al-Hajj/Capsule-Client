import React, { useState } from "react";
import "../styles/AddCapsule.css";

function AddCapsule() {
  const [capsule, setCapsule] = useState({ title: "", message: "", mood: "" });

  const handleChange = (e) => {
    setCapsule({ ...capsule, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(capsule);
    // TODO: POST to API
  };

  return (
    <div className="add-container">
      <h2>Create a Capsule</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Message"
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          name="mood"
          placeholder="Mood"
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddCapsule;
