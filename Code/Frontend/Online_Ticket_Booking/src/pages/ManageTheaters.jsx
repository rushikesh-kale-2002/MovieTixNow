"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const ManageTheaters = () => {
  const [theaters, setTheaters] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [theaterToDelete, setTheaterToDelete] = useState(null)
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/theaters/admin/all",{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        setTheaters(res.data)
      } catch (error) {
        console.error("Failed to fetch theaters", error)
      }
    }
    fetchAll()
  }, [])

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:8080/api/theaters/${id}/status/${status.toUpperCase()}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
      setTheaters((prev) =>
        prev.map((t) => (t.theaterId === id ? { ...t, status: status.toUpperCase() } : t))
      )
    } catch (error) {
      console.error("Failed to update status", error)
    }
  }

  const handleDeleteRequest = (theater) => {
    setTheaterToDelete(theater)
    setShowModal(true)
  }

  const confirmDelete = async () => {
    if (!theaterToDelete) return

    setLoading(true)
    try {
      await axios.delete(`http://localhost:8080/api/theaters/admin/${theaterToDelete.theaterId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
      setTheaters((prev) => prev.filter((t) => t.theaterId !== theaterToDelete.theaterId))
      setTheaterToDelete(null)
      setShowModal(false)
    } catch (error) {
      console.error("Failed to delete theater", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      APPROVED: "bg-success",
      PENDING: "bg-warning",
      REJECTED: "bg-danger",
    }
    return badges[status] || "bg-secondary"
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Theaters</h2>
        <div className="d-flex gap-2">
          <span className="badge bg-success">Approved: {theaters.filter((t) => t.status === "APPROVED").length}</span>
          <span className="badge bg-warning">Pending: {theaters.filter((t) => t.status === "PENDING").length}</span>
          <span className="badge bg-danger">Rejected: {theaters.filter((t) => t.status === "REJECTED").length}</span>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Theater Name</th>
                  <th>Location</th>
                  <th>Capacity</th>
                  <th>Registration Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {theaters.map((theater) => (
                  <tr key={theater.theaterId}>
                    <td>
                      <strong>{theater.theaterName}</strong>
                    </td>
                    <td>{theater.theaterLocation}</td>
                    <td>{theater.screenCount} seats</td>
                    <td>{new Date(theater.createdAt || Date.now()).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(theater.status)}`}>
                        {theater.status.charAt(0) + theater.status.slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td className="table-actions">
                      {theater.status === "PENDING" && (
                        <>
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() => handleStatusChange(theater.theaterId, "APPROVED")}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-sm btn-danger me-2"
                            onClick={() => handleStatusChange(theater.theaterId, "REJECTED")}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {theater.status === "APPROVED" && (
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleStatusChange(theater.theaterId, "PENDING")}
                        >
                          Set Pending
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteRequest(theater)}
                        disabled={loading}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Removal</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to remove <strong>{theaterToDelete?.theaterName}</strong>?
                </p>
                <p className="text-muted">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                  disabled={loading}
                >
                  {loading ? "Removing..." : "Remove Theater"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageTheaters
