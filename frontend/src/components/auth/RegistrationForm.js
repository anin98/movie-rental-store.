import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import TopNav from "../movies/topbar";
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/register/", formData);
      console.log(res.data);
      // Redirect the user to the login page
      window.location.href = "/login/";
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TopNav></TopNav>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
        <br></br>
        <label>Username:</label>
        <input type="text" name="username" onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" onChange={handleChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" name="password2" onChange={handleChange} />
      </div>
      <div>
        <label>First Name:</label>
        <input type="text" name="first_name" onChange={handleChange} />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" name="last_name" onChange={handleChange} />
      </div>
      <button type="submit">Register</button>
      <button className="button" onClick={() => navigate("/login")}>Already have an accoun? Login</button>
    </form>
  );
};

export default RegistrationForm;
