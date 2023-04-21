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

function MovieGrid() {
  let navigate = useNavigate();
 
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [avg, setAvg] = useState('');

  // Add async keyword to make function asynchronous
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (genre) {
        const response = await axios.get(`http://localhost:8000/movie/${genre}/`);
        setMovies(response.data);
      } else if (releaseDate) {
        const response = await axios.get(`http://localhost:8000/movies/release_date/${releaseDate}/`);
        setMovies(response.data);
      } else if (title) {
        const response = await axios.get(`http://localhost:8000/movies/${title}/`);
        setMovies([response.data]);
      } else {
        const response = await axios.get(`http://localhost:8000/movies/`, {
          params: {
            title,
            genre,
            release_date: releaseDate,
            ordering: sortBy,
          },
        });
        setMovies(response.data);
      }
    } catch (error) {
      console.log(error);
      setMovies([]);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:8000/movies/`);
      setMovies(response.data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function getAverages() {
      const num = movies.length;
      const averages = [];
      for (let i = 1; i <= num; i++) {
        const response = await axios.get(`http://localhost:8000/avg/${i}/`);
        averages.push(response.data.average_rating);
        
      }
      console.log(averages)
      setAvg(averages);
    }
    //path ('reviews/<int:pk>/', review_details),
    getAverages();
  }, [movies]);
 
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
  <div className="search-options">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
      <form className="search-form" onSubmit={handleSubmit}>
        <label className="search-label">Search by Title:</label>
        <input className="search-input" type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button className="search-go" type="submit">Go</button>
      </form>
      <form className="search-form" onSubmit={handleSubmit}>
        <label className="search-label">Search by Genre:</label>
        <input className="search-input" type="text" placeholder="Enter genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
        <button className="search-go" type="submit">Go</button>
      </form>
      <form className="search-form" onSubmit={handleSubmit}>
        <label className="search-label">Filter by Release Date:</label>
        <select className="search-select" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)}>
          <option key="" value="">Select a release date</option>
          {movies && [...new Set(movies.map(movie => movie.release))].map((date) => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
        <button className="search-go" type="submit">Go</button>
      </form>
    </div>
    </div>
        {/* </div> */}
      
      
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
                {reviews[movie.id] && (
                  <div className="review-tile" key={reviews[movie.id][reviews[movie.id].length-1].id}>
                    <p>Author: {reviews[movie.id][reviews[movie.id].length-1].author}</p>
                   
                    <p>Stars: {Array.isArray(avg) && avg.length > movie.id-1 && 
    (avg[movie.id-1] || avg[movie.id+1]) && 
    (avg[movie.id-1] % 1 !== 0 ? 
      <>
        {[...Array(parseInt(avg[movie.id-1]))].map((e, i) => (
          <FontAwesomeIcon icon={faStar} key={i} />
        ))}
        <FontAwesomeIcon icon={faStarHalf} />
      </>
      :
      <>
        {[...Array(parseInt(avg[movie.id-1]))].map((e, i) => (
          <FontAwesomeIcon icon={faStar} key={i} />
        ))}
      </>
    )
  }


                    </p>
              
  


                    <p>Comment: {reviews[movie.id][reviews[movie.id].length-1].comment}</p>
                  </div>
                )}
                {!reviews[movie.id] && <p>No reviews yet</p>}
                <button className="button" onClick={() => navigate("/allreviews")}>Check all reviews</button>
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
  export default MovieGrid;
  