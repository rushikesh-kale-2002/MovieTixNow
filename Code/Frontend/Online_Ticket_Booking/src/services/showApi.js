// src/api/showApi.js
import axios from "axios";

const BASE = "http://localhost:8080";

// Fetch movie details
export const fetchMovieDetailsForShow = async (movieId) => {
  const response = await axios.get(`${BASE}/user/movies/${movieId}`);
  return response.data;
};

// Fetch locations for a movie
export const fetchMovieLocations = async (movieId) => {
  const response = await axios.get(`${BASE}/user/movies/${movieId}/locations`);
  return response.data;
};

// Fetch theaters & shows for a movie by date & location
export const fetchTheatersAndShows = async (movieId, date, location) => {
  const response = await axios.get(`${BASE}/shows/movie/${movieId}`, {
    params: { date, location },
  });
  return response.data;
};
