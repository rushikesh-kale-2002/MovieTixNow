"use client"

import { useState, useEffect } from "react"
import dataService from "../services/dataService"

const ManageUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    setUsers(dataService.getUsers())
  }, [])

  const handleToggleStatus = (id) => {
    const updated = dataService.toggleUserStatus(id)
    if (updated) {
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)))
    }
  }

  const getStatusBadge = (status) => {
    return status === "active" ? "bg-success" : "bg-danger"
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Users</h2>
        <div className="d-flex gap-2">
          <span className="badge bg-success">Active: {users.filter((u) => u.status === "active").length}</span>
          <span className="badge bg-danger">Blocked: {users.filter((u) => u.status === "blocked").length}</span>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Registration Date</th>
                  <th>Total Bookings</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <strong>{user.name}</strong>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.registrationDate).toLocaleDateString()}</td>
                    <td>
                      <span className="badge bg-info">{user.totalBookings}</span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="table-actions">
                      <button
                        className={`btn btn-sm ${user.status === "active" ? "btn-danger" : "btn-success"}`}
                        onClick={() => handleToggleStatus(user.id)}
                      >
                        {user.status === "active" ? "Block User" : "Unblock User"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Total Users</h5>
              <h2 className="text-primary">{users.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Active Users</h5>
              <h2 className="text-success">{users.filter((u) => u.status === "active").length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Blocked Users</h5>
              <h2 className="text-danger">{users.filter((u) => u.status === "blocked").length}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageUsers
