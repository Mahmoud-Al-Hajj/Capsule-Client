import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name: userName,
        email: email,
        password: password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/login");
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="page-wrapper">
        <div className="card-container">
          {Object.keys(errors).map((field) =>
            errors[field].map((msg, index) => (
              <p key={`${field}-${index}`} className="error-text">
                {msg}
              </p>
            ))
          )}
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Register</button>
          <p className="sign_up">
            Have an account? <a href="./login">Login</a>
          </p>
        </div>
      </div>
    </form>
  );
}

export default Register;
