import React, { useState, useEffect } from "react";
import DataService from "../services/dataService";
import axios from "axios";

const GENRE_OPTIONS = [
  "ACTION",
  "COMEDY",
  "DRAMA",
  "THRILLER",
  "HORROR",
  "ROMANCE",
  "SCI_FI",
  "ADVENTURE",
  "CRIME",
];

const ManageMovies = () => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    language: "",
    genres: [],
    duration: 0,
    releaseDate: "",
    posterUrl: "",
    trailerUrl: "",
    rating: 0,
    cast: [{ name: "", photoUrl: "" }],
    status: "UPCOMING",
  });

  const fetchMovies = async () => {
    try {
      const movies = await DataService.getMovies();
      setMovies(movies);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error(err));
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      language: "",
      genres: [],
      duration: 0,
      releaseDate: "",
      posterUrl: "",
      trailerUrl: "",
      rating: 0,
      cast: [{ name: "", photoUrl: "" }],
      status: "UPCOMING",
    });
    setEditingMovie(null);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.language || !formData.releaseDate) {
      alert("Please fill all required fields.");
      return;
    }

    const payload = {
      ...formData,
      genres: formData.genres.map((g) => g.toUpperCase()),
    };

    try {
      if (editingMovie) {
        await DataService.updateMovie(editingMovie.movieId, payload);
      } else {
        await DataService.addMovie(payload);
      }
      fetchMovies();
      resetForm();
    } catch (error) {
      console.error("Error saving movie", error);
      alert("Failed to save movie. Try again.");
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setFormData({
      ...movie,
      genres: movie.genres || [],
      cast: movie.cast?.length ? movie.cast : [{ name: "", photoUrl: "" }],
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await DataService.deleteMovie(id);
        fetchMovies();
      } catch (error) {
        console.error("Failed to delete movie", error);
        alert("Error deleting movie");
      }
    }
  };

  const handleGenreChange = (genre) => {
    setFormData((prev) => {
      const updatedGenres = prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre];
      return { ...prev, genres: updatedGenres };
    });
  };

  const handleCastChange = (index, field, value) => {
    const updatedCast = [...formData.cast];
    updatedCast[index][field] = value;
    setFormData({ ...formData, cast: updatedCast });
  };

  const addCastMember = () => {
    setFormData({
      ...formData,
      cast: [...formData.cast, { name: "", photoUrl: "" }],
    });
  };

  const removeCastMember = (index) => {
    const updatedCast = formData.cast.filter((_, i) => i !== index);
    setFormData({ ...formData, cast: updatedCast });
  };

  return (
    <div className="p-6 bg-gradient-to-tr from-indigo-50 via-white to-pink-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-indigo-700 tracking-wide">
          Manage Movies
        </h2>
        <div className="flex items-center space-x-6">
          <span className="text-lg text-gray-700">
            Welcome,{" "}
            <strong className="text-indigo-600">
              {user?.fullName || user?.username || "Admin"}
            </strong>
            !
          </span>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow-md transition"
            onClick={() => setShowModal(true)}
          >
            + Add Movie
          </button>
        </div>
      </div>

      {/* Movie Table */}
      <div className="overflow-x-auto rounded-lg shadow-md border border-indigo-200 bg-white">
        <table className="min-w-full divide-y divide-indigo-200">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wide">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wide">
                Language
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wide">
                Release Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wide">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wide">
                Status
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-indigo-700 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-100">
            {movies.map((movie) => (
              <tr key={movie.movieId} className="hover:bg-indigo-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-indigo-900 font-semibold">
                  {movie.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{movie.language}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{movie.rating ?? "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      movie.status === "TRENDING"
                        ? "bg-green-200 text-green-800"
                        : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    {movie.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center space-x-4">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="text-indigo-600 hover:text-indigo-900 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie.movieId)}
                    className="text-red-600 hover:text-red-900 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 shadow-lg relative">
            <h3 className="text-2xl font-bold text-indigo-700 mb-6">
              {editingMovie ? "Edit Movie" : "Add Movie"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Title *"
                  className="border border-indigo-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Language *"
                  className="border border-indigo-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={formData.language}
                  onChange={(e) =>
                    setFormData({ ...formData, language: e.target.value })
                  }
                  required
                />
                <input
                  type="date"
                  className="border border-indigo-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={formData.releaseDate}
                  onChange={(e) =>
                    setFormData({ ...formData, releaseDate: e.target.value })
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Rating"
                  min={0}
                  max={10}
                  step={0.1}
                  className="border border-indigo-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: Number(e.target.value) })
                  }
                />
              </div>

              <textarea
                placeholder="Description"
                rows={3}
                className="w-full border border-indigo-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Poster URL"
                  className="border border-indigo-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={formData.posterUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, posterUrl: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Trailer URL"
                  className="border border-indigo-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={formData.trailerUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, trailerUrl: e.target.value })
                  }
                />
              </div>

              {/* Cast Section */}
              <div>
                <label className="block font-semibold mb-3 text-indigo-700">
                  Cast:
                </label>
                {formData.cast.map((member, index) => (
                  <div
                    key={index}
                    className="flex gap-3 mb-3 items-center flex-wrap"
                  >
                    <input
                      type="text"
                      placeholder="Name"
                      className="border border-indigo-300 rounded px-3 py-2 flex-grow min-w-[150px] focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      value={member.name}
                      onChange={(e) =>
                        handleCastChange(index, "name", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Photo URL"
                      className="border border-indigo-300 rounded px-3 py-2 flex-grow min-w-[150px] focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      value={member.photoUrl}
                      onChange={(e) =>
                        handleCastChange(index, "photoUrl", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => removeCastMember(index)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={formData.cast.length <= 1}
                      title={
                        formData.cast.length <= 1
                          ? "At least one cast member required"
                          : "Remove cast member"
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCastMember}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                >
                  + Add Cast Member
                </button>
              </div>

              {/* Genres Section */}
              <div>
                <label className="block font-semibold mb-3 text-indigo-700">
                  Genres:
                </label>
                <div className="flex flex-wrap gap-3">
                  {GENRE_OPTIONS.map((genre) => (
                    <label
                      key={genre}
                      className={`flex items-center gap-2 cursor-pointer select-none rounded px-3 py-1 transition
                        ${
                          formData.genres.includes(genre)
                            ? "bg-indigo-600 text-white"
                            : "bg-indigo-100 text-indigo-800 hover:bg-indigo-300"
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={formData.genres.includes(genre)}
                        onChange={() => handleGenreChange(genre)}
                      />
                      <span>{genre.replace("_", " ")}</span>
                    </label>
                  ))}
                </div>
              </div>

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="border border-indigo-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="UPCOMING">Upcoming</option>
                <option value="TRENDING">Trending</option>
              </select>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                  onClick={resetForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 shadow-lg transition"
                >
                  {editingMovie ? "Update Movie" : "Add Movie"}
                </button>
              </div>
            </form>

            {/* Close Modal button */}
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition text-2xl font-bold"
              aria-label="Close Modal"
              title="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMovies;
