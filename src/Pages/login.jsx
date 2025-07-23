import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      console.log(response.data);

      const token = response.data.payload.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", response.data.payload.id);
      localStorage.setItem("name", response.data.payload.name);
      localStorage.setItem("email", email);

      setTimeout(() => {
        window.location.href = "/";
      }, 100);
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
          <label for="email" onclick>
            Email
          </label>
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
          <button type="submit">Log In</button>
          <p className="sign_up">
            Don't have an account? <a href="./register">Sign up</a>
          </p>
        </div>
      </div>
    </form>
  );
}
export default Login;
