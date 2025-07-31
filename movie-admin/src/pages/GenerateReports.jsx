"use client"

import { useState } from "react"
import dataService from "../services/dataService"

const GenerateReports = () => {
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  })
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDateRange((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const data = dataService.getReportData(dateRange.startDate, dateRange.endDate)
      setReportData(data)
      setLoading(false)
    }, 1000)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Generate Reports</h2>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5>Select Date Range</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={dateRange.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={dateRange.endDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-4 d-flex align-items-end">
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Generating..." : "Generate Report"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {reportData && (
        <>
          {/* Summary Cards */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card card-stats info">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title text-muted mb-0">Total Bookings</h5>
                      <h3 className="mb-0">{reportData.totalBookings}</h3>
                    </div>
                    <div className="fs-1">🎫</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card card-stats success">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title text-muted mb-0">Revenue</h5>
                      <h3 className="mb-0">${reportData.revenue.toFixed(2)}</h3>
                    </div>
                    <div className="fs-1">💰</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card card-stats warning">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title text-muted mb-0">Occupancy Rate</h5>
                      <h3 className="mb-0">{reportData.occupancyRate}%</h3>
                    </div>
                    <div className="fs-1">📊</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card card-stats primary">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title text-muted mb-0">Avg. Revenue</h5>
                      <h3 className="mb-0">${(reportData.revenue / reportData.totalBookings).toFixed(2)}</h3>
                    </div>
                    <div className="fs-1">📈</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Reports */}
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>Top Booked Movies</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>Movie Title</th>
                          <th>Bookings</th>
                          <th>Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.topMovies.map((movie, index) => (
                          <tr key={index}>
                            <td>
                              <span className="badge bg-primary">#{index + 1}</span>
                            </td>
                            <td>{movie.title}</td>
                            <td>{movie.bookings}</td>
                            <td>
                              <div className="progress" style={{ height: "20px" }}>
                                <div
                                  className="progress-bar bg-success"
                                  style={{ width: `${(movie.bookings / reportData.totalBookings) * 100}%` }}
                                >
                                  {Math.round((movie.bookings / reportData.totalBookings) * 100)}%
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>Top Active Theaters</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>Theater Name</th>
                          <th>Bookings</th>
                          <th>Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.topTheaters.map((theater, index) => (
                          <tr key={index}>
                            <td>
                              <span className="badge bg-info">#{index + 1}</span>
                            </td>
                            <td>{theater.name}</td>
                            <td>{theater.bookings}</td>
                            <td>
                              <div className="progress" style={{ height: "20px" }}>
                                <div
                                  className="progress-bar bg-info"
                                  style={{ width: `${(theater.bookings / reportData.totalBookings) * 100}%` }}
                                >
                                  {Math.round((theater.bookings / reportData.totalBookings) * 100)}%
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="card mt-4">
            <div className="card-body">
              <h5>Export Options</h5>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-primary">📄 Export as PDF</button>
                <button className="btn btn-outline-success">📊 Export as Excel</button>
                <button className="btn btn-outline-info">📈 Export as CSV</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default GenerateReports
