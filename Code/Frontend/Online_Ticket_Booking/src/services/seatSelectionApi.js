import axios from "axios";

const BASE = "http://localhost:8080";


export const fetchMovieDetails = async (movieId) => {
  const res = await axios.get(`${BASE}/user/movies/${movieId}`);
  return res.data;
};


export const fetchShowDetails = async (showId) => {
  const res = await axios.get(`${BASE}/shows/${showId}/details`);
  return res.data;
};


export const fetchSeatsForShow = async (showId, theaterId) => {
  const res = await axios.get(
    `${BASE}/seatselection/show/${showId}?theaterId=${theaterId}`
  );
  console.log(res.data)
  return res.data;
};


export const reserveSeats = async (payload) => {
  const token = localStorage.getItem("token")
  const res = await axios.post(`${BASE}/seatselection/reserve`, payload,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
  return res.data;
};
