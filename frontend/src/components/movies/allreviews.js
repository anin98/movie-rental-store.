import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './moviegrid.css';

import { useNavigate } from 'react-router-dom';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import TopNav from './topbar';
config.autoAddCss = false;

function AllReviews() {
  let navigate = useNavigate();
 
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [sortBy, setSortBy] = useState('popularity');
  

  // Add async keyword to make function asynchronous
  
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:8000/movies/`);
      setMovies(response.data);
    }
    fetchData();
  }, []);
 
    
  useEffect(() => {
    async function fetchData() {
      const reviewsResponse = await axios.get(`http://localhost:8000/reviews/`);
      const reviewsData = reviewsResponse.data.reduce((acc, reviews) => {
        if (!acc[reviews.movie]) {
          acc[reviews.movie] = [];
        }
        acc[reviews.movie].push(reviews);
        return acc;
      }, {});
      setReviews(reviewsData);
    }
    fetchData();
  }, []);
  
  return (
    <div>
      <TopNav />
      <div className="movie-grid-container">
        <div className="movie-grid">
          {movies.map((movie) => (
            <div className="movie-tile" key={movie.id}>
              <div className="movie-details">
                <img className="movie-image" src={`http://localhost:8000${movie.image}`} alt={movie.title} />
                <div className="movie-info">
                  <h2>{movie.title}</h2>
                  <p>Genre : {movie.genre}</p>
                  <p>{movie.description}</p>
                  <p className="movie-release-date">Release Date : {movie.release} </p>
                </div>
              </div>
              <div className="movie-reviews">
                <h2>Reviews for {movie.title}</h2>
                {reviews[movie.id] && reviews[movie.id].map((review) => (
                  <div className="review-tile" key={review.id}>
                    <p>Author: {review.author}</p>
                    <p>
                      Stars: {Array.from(Array(parseInt(review.stars)), (e, i) => (
                      <FontAwesomeIcon icon={i + 1 <= review.stars ? faStar : faStarHalf} key={i} />
                    ))}
                    </p>
                    <p>Comment: {review.comment}</p>
                  </div>
                ))}
                {!reviews[movie.id] && <p>No reviews yet</p>}
              </div>
            </div>
          ))}
        </div>
        {/* <div className="sort-container">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="popularity">Popularity</option>
            <option value="rating">Rating</option>
            <option value="release_date">Release Date</option>
          </select>
        </div> */}
      </div>
      
    </div>
  );
                      }
 export default AllReviews;  