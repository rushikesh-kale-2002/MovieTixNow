import axios from "axios";
const token = localStorage.getItem("token")
const BASE_URL = "http://localhost:8080/api/admin"; 

class DataService {
  // Dashboard
  getDashboardStats() {
    return axios.get(`${BASE_URL}/dashboard-stats`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
  }

   // 🔹 Movies
  getMovies() {
    return axios.get(`${BASE_URL}/movies`).then(res => {
      if (Array.isArray(res.data)) {
        return res.data;
      } else if (res.data && Array.isArray(res.data.data)) {
        return res.data.data;
      } else if (res.data && Array.isArray(res.data.movies)) {
        return res.data.movies;
      }
      return [];
    });
  }

  addMovie(movie) {
    return axios.post(`${BASE_URL}/movies`, movie).then(res => res.data);
  }

  updateMovie(id, updatedMovie) {
    return axios.put(`${BASE_URL}/movies/${id}`, updatedMovie).then(res => res.data);
  }

  deleteMovie(id) {
    return axios.delete(`${BASE_URL}/movies/${id}`).then(res => res.data);
  }


  // Theaters
  getTheaters() {
    return axios.get(`${BASE_URL}/theaters`);
  }

  updateTheaterStatus(id, status) {
    return axios.post(`${BASE_URL}/theaters/${id}/status`, { status });
  }

  deleteTheater(id) {
    return axios.delete(`${BASE_URL}/theaters/${id}`);
  }

  // Users
  getUsers() {
    return axios.get(`${BASE_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
  }

  toggleUserStatus(id) {
    return axios.post(`${BASE_URL}/users/${id}/toggle-status`);
  }

  // Reports
  getReportData(startDate, endDate) {
    return axios.get(`${BASE_URL}/reports`, {
      params: { startDate, endDate },
    });
  }
}

export default new DataService();
