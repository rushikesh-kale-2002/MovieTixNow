"use client"

import { useState, useEffect } from "react"
import dataService from "../services/dataService"

const ManageTheaters = () => {
  const [theaters, setTheaters] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [theaterToDelete, setTheaterToDelete] = useState(null)

  useEffect(() => {
    setTheaters(dataService.getTheaters())
  }, [])

  const handleStatusChange = (id, status) => {
    const updated = dataService.updateTheaterStatus(id, status)
    if (updated) {
      setTheaters((prev) => prev.map((t) => (t.id === id ? updated : t)))
    }
  }

  const handleDeleteRequest = (theater) => {
    setTheaterToDelete(theater)
    setShowModal(true)
  }

  const confirmDelete = () => {
    if (theaterToDelete) {
      dataService.deleteTheater(theaterToDelete.id)
      setTheaters((prev) => prev.filter((t) => t.id !== theaterToDelete.id))
      setTheaterToDelete(null)
      setShowModal(false)
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      approved: "bg-success",
      pending: "bg-warning",
      rejected: "bg-danger",
    }
    return badges[status] || "bg-secondary"
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Theaters</h2>
        <div className="d-flex gap-2">
          <span className="badge bg-success">Approved: {theaters.filter((t) => t.status === "approved").length}</span>
          <span className="badge bg-warning">Pending: {theaters.filter((t) => t.status === "pending").length}</span>
          <span className="badge bg-danger">Rejected: {theaters.filter((t) => t.status === "rejected").length}</span>
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
                  <tr key={theater.id}>
                    <td>
                      <strong>{theater.name}</strong>
                    </td>
                    <td>{theater.location}</td>
                    <td>{theater.capacity} seats</td>
                    <td>{new Date(theater.registrationDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(theater.status)}`}>
                        {theater.status.charAt(0).toUpperCase() + theater.status.slice(1)}
                      </span>
                    </td>
                    <td className="table-actions">
                      {theater.status === "pending" && (
                        <>
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() => handleStatusChange(theater.id, "approved")}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-sm btn-danger me-2"
                            onClick={() => handleStatusChange(theater.id, "rejected")}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {theater.status === "approved" && (
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleStatusChange(theater.id, "pending")}
                        >
                          Set Pending
                        </button>
                      )}
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteRequest(theater)}>
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
                  Are you sure you want to remove <strong>{theaterToDelete?.name}</strong>?
                </p>
                <p className="text-muted">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                  Remove Theater
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
