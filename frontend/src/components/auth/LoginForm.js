import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import TopNav from "../movies/topbar";
function LoginForm() {
  let navigate=useNavigate(); 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login/", {
        username,
        email,
        password,
        confirmPassword
      });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      alert("Login successful!");
      {navigate("/Home")}
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <TopNav></TopNav>
        <br>
        </br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      <button className="button" onClick={() => navigate("/register")}>Didn't Sign up yet? Sign Up!</button>
    </form>
    
  );
}

export default LoginForm;
