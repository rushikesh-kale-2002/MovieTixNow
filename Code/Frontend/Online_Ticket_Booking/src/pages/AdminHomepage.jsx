"use client"

import { useState, useEffect } from "react"
import dataService from "../services/dataService"

const AdminHomepage = () => {
  const [stats, setStats] = useState(null)

 useEffect(() => {
  dataService.getDashboardStats().then((response) => {
    setStats(response.data); 
  }).catch((err) => {
    console.error("Error fetching dashboard stats:", err);
  });
}, []);


  if (!stats) return <div>Loading...</div>

  const statCards = [
    {
      title: "Total Theaters",
      value: stats.totalTheaters ?? "N/A",
      icon: "🏛️",
      color: "primary",
    },
    {
      title: "Total Movies",
      value: stats.totalMovies ?? "N/A",
      icon: "🎬",
      color: "success",
    },
    {
      title: "Total Users",
      value: stats.totalUsers ?? "N/A",
      icon: "👥",
      color: "info",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings ?? "N/A",
      icon: "🎫",
      color: "warning",
    },
    {
      title: "Today's Revenue",
      value: `₹${(stats.todayRevenue ?? 0).toFixed(2)}`,
      icon: "💰",
      color: "success",
    },
    {
      title: "Occupancy Rate",
      value: `${stats.occupancyRate ?? 0}%`,
      icon: "📊",
      color: "info",
    },
  ]

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <span className="text-muted">Welcome to Movie Booking Admin Panel</span>
      </div>

      <div className="row">
        {statCards.map((card, index) => (
          <div key={index} className="col-md-4 col-lg-2 mb-4">
            <div className={`card card-stats ${card.color}`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title text-muted mb-0">{card.title}</h5>
                    <h3 className="mb-0">{card.value}</h3>
                  </div>
                  <div className="fs-1">{card.icon}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Recent Activity</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li className="mb-2">
                  <span className="badge bg-success me-2">New</span>
                  Theater "MovieMax Plaza" registered
                </li>
                <li className="mb-2">
                  <span className="badge bg-info me-2">Update</span>
                  Movie "Avengers: Endgame" updated
                </li>
                <li className="mb-2">
                  <span className="badge bg-warning me-2">Alert</span>
                  User "pratik patil" account blocked
                </li>
                <li className="mb-2">
                  <span className="badge bg-primary me-2">Booking</span>
                  150 new bookings today
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Quick Stats</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Theater Occupancy</span>
                  <span>{stats.occupancyRate ?? 0}%</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    style={{ width: `${stats.occupancyRate ?? 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Active Movies</span>
                  <span>85%</span>
                </div>
                <div className="progress">
                  <div className="progress-bar bg-info" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>User Satisfaction</span>
                  <span>92%</span>
                </div>
                <div className="progress">
                  <div className="progress-bar bg-warning" style={{ width: "92%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHomepage
