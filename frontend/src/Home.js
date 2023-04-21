import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import TopNav from './components/movies/topbar';
const Home = () => {
  const [username, setUsername] = useState('');
  let navigate = useNavigate()
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    console.log(accessToken)
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      setUsername(decodedToken.username);
    }
    if (!accessToken) {
      alert("You need to login first")
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <TopNav></TopNav>
      <br></br>
      <br>
      </br>
      <br></br>
      <h1>Welcome, {username}!</h1>
      <p>You are now logged in to our website.</p>
      <p>Explore our content and enjoy your stay!</p>
      <button className="button" onClick={() => {navigate("/movies")}}>Check out Movies</button><br></br>
    </div>
  );
};

export default Home;
