import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://127.0.0.1:8000/api/register", {
      name: userName,
      email: email,
      password: password,
    });

    const { token } = response.data;
    localStorage.setItem("token", token);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="page-wrapper">
        <div className="card-container">
          <label>Name</label>
          <input
            type="name"
            placeholder="name"
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

          <div>
            <div>
              <label for="password">Password</label>
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
          <p className="sign_up">
            have an account? <a href="./login">Login</a>
          </p>
        </div>
      </div>
    </form>
  );
}
export default Register;
