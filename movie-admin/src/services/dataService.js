import { mockData } from "./mockData"

class DataService {
  constructor() {
    this.data = { ...mockData }
  }

  // Dashboard methods
  getDashboardStats() {
    return this.data.dashboardStats
  }

  // Movie methods
  getMovies() {
    return this.data.movies
  }

  addMovie(movie) {
    const newMovie = {
      ...movie,
      id: Math.max(...this.data.movies.map((m) => m.id)) + 1,
      hasActiveShows: false,
    }
    this.data.movies.push(newMovie)
    return newMovie
  }

  updateMovie(id, updatedMovie) {
    const index = this.data.movies.findIndex((m) => m.id === id)
    if (index !== -1) {
      this.data.movies[index] = { ...this.data.movies[index], ...updatedMovie }
      return this.data.movies[index]
    }
    return null
  }

  deleteMovie(id) {
    const movie = this.data.movies.find((m) => m.id === id)
    if (movie && !movie.hasActiveShows) {
      this.data.movies = this.data.movies.filter((m) => m.id !== id)
      return true
    }
    return false
  }

  // Theater methods
  getTheaters() {
    return this.data.theaters
  }

  updateTheaterStatus(id, status) {
    const theater = this.data.theaters.find((t) => t.id === id)
    if (theater) {
      theater.status = status
      return theater
    }
    return null
  }

  deleteTheater(id) {
    this.data.theaters = this.data.theaters.filter((t) => t.id !== id)
    return true
  }

  // User methods
  getUsers() {
    return this.data.users
  }

  toggleUserStatus(id) {
    const user = this.data.users.find((u) => u.id === id)
    if (user) {
      user.status = user.status === "active" ? "blocked" : "active"
      return user
    }
    return null
  }

  // Report methods
  getReportData(startDate, endDate) {
    // Simulate report generation
    return {
      totalBookings: 150,
      revenue: 3600.0,
      occupancyRate: 78,
      topMovies: [
        { title: "Avengers: Endgame", bookings: 45 },
        { title: "Joker", bookings: 38 },
        { title: "The Lion King", bookings: 32 },
      ],
      topTheaters: [
        { name: "Cineplex Downtown", bookings: 65 },
        { name: "Star Cinema", bookings: 52 },
        { name: "MovieMax Plaza", bookings: 33 },
      ],
    }
  }
}

export default new DataService()
