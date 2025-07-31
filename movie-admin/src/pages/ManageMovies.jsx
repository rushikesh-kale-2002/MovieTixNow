"use client"

import { useState, useEffect } from "react"
import dataService from "../services/dataService"

const ManageMovies = () => {
  const [movies, setMovies] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingMovie, setEditingMovie] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    duration: "",
    poster: "",
  })

  useEffect(() => {
    setMovies(dataService.getMovies())
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingMovie) {
      const updated = dataService.updateMovie(editingMovie.id, formData)
      setMovies((prev) => prev.map((m) => (m.id === editingMovie.id ? updated : m)))
    } else {
      const newMovie = dataService.addMovie(formData)
      setMovies((prev) => [...prev, newMovie])
    }
    resetForm()
  }

  const handleEdit = (movie) => {
    setEditingMovie(movie)
    setFormData({
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      duration: movie.duration,
      poster: movie.poster,
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      const success = dataService.deleteMovie(id)
      if (success) {
        setMovies((prev) => prev.filter((m) => m.id !== id))
      } else {
        alert("Cannot delete movie with active shows")
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      genre: "",
      duration: "",
      poster: "",
    })
    setEditingMovie(null)
    setShowModal(false)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Movies</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New Movie
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Poster</th>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.id}>
                    <td>
                      <img
                        src={movie.poster || "/placeholder.svg"}
                        alt={movie.title}
                        className="poster-preview rounded"
                      />
                    </td>
                    <td>
                      <strong>{movie.title}</strong>
                      <br />
                      <small className="text-muted">{movie.description}</small>
                    </td>
                    <td>{movie.genre}</td>
                    <td>{movie.duration} min</td>
                    <td>
                      <span className={`badge ${movie.hasActiveShows ? "bg-success" : "bg-secondary"}`}>
                        {movie.hasActiveShows ? "Active Shows" : "No Shows"}
                      </span>
                    </td>
                    <td className="table-actions">
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(movie)}>
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(movie.id)}
                        disabled={movie.hasActiveShows}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingMovie ? "Edit Movie" : "Add New Movie"}</h5>
                <button type="button" className="btn-close" onClick={resetForm}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Genre</label>
                    <select
                      className="form-control"
                      name="genre"
                      value={formData.genre}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Genre</option>
                      <option value="Action">Action</option>
                      <option value="Comedy">Comedy</option>
                      <option value="Drama">Drama</option>
                      <option value="Horror">Horror</option>
                      <option value="Romance">Romance</option>
                      <option value="Sci-Fi">Sci-Fi</option>
                      <option value="Animation">Animation</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Duration (minutes)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Poster URL</label>
                    <input
                      type="url"
                      className="form-control"
                      name="poster"
                      value={formData.poster}
                      onChange={handleInputChange}
                      placeholder="https://example.com/poster.jpg"
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingMovie ? "Update Movie" : "Add Movie"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageMovies
