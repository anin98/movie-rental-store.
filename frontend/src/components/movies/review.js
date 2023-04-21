import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Rating from 'react-rating';
import { useNavigate } from 'react-router-dom';
import './reviewgrid.css'
import TopNav from './topbar';

function ReviewForm() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [stars, setStars] = useState(1);
  const [comment, setComment] = useState('');

  const history = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      setUser(decodedToken);
    }
    async function fetchData() {
      const response = await axios.get('http://localhost:8000/movies/');
      setMovies(response.data);
      setSelectedMovie(response.data[0].id);
    }
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      alert("You need to login first")
      history('/login'); // Redirect user to login page if not logged in
      return;
    }
  
    try{
      const data = {
        author: user.username,
        stars: stars,
        comment: comment,
        movie: selectedMovie,
      };
      await axios.post('http://localhost:8000/reviews/', data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setStars(1);
      setComment('');
      alert("Review Added!");
    } catch (error) {
      console.error(error);
      alert("Sorry, your review couldn't be added please try again.");
    }
  };
  return (
   
    <div className="review-form-container">
       <TopNav />
      <form onSubmit={handleSubmit}>
        <div>
          <div className="movie-label-container">
            <label htmlFor="movie-select">Movie:</label>
          </div>
          <select id="movie-select" value={selectedMovie} onChange={(event) => setSelectedMovie(event.target.value)}>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>{movie.title}</option>
            ))}
          </select>
        </div>
        <div>
          
          <label htmlFor="stars-input">Rating:</label>
          <Rating
            emptySymbol={<i className="far fa-star"></i>}
            fullSymbol={<i className="fas fa-star"></i>}
            fractions={2}
            onChange={(value) => setStars(value)}
            initialRating={stars}
          />
        </div>
        <div>
          <label htmlFor="comment-input">Comment:</label>
          <textarea id="comment-input" value={comment} onChange={(event) => setComment(event.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
  
 
}
  

export default ReviewForm;
