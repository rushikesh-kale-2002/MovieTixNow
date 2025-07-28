"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { BookingProvider } from "./contexts/BookingContext"
import { ThemeProvider } from "./contexts/ThemeContext"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import HomePage from "./pages/HomePage"
import MovieDetailsPage from "./pages/MovieDetailsPage"
import ShowSelectionPage from "./pages/ShowSelectionPage"
import SeatSelectionPage from "./pages/SeatSelectionPage"
import CheckoutPage from "./pages/CheckoutPage"
import UserProfilePage from "./pages/UserProfilePage"
import AdminDashboard from "./pages/AdminDashboard"
import TheaterOwnerDashboard from "./pages/TheaterOwnerDashboard"
import LoginModal from "./components/auth/LoginModal"

function App() {
  // Changed from true to false - sidebar starts closed
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ThemeProvider>
      <AuthProvider>
        <BookingProvider>
          <Router>
            <div className="app">
              <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<HomePage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />} />
                  <Route path="/movie/:id" element={<MovieDetailsPage sidebarOpen={sidebarOpen} />} />
                  <Route path="/movie/:id/shows" element={<ShowSelectionPage sidebarOpen={sidebarOpen} />} />
                  <Route path="/movie/:id/seats" element={<SeatSelectionPage sidebarOpen={sidebarOpen} />} />
                  <Route path="/checkout" element={<CheckoutPage sidebarOpen={sidebarOpen} />} />
                  <Route path="/profile" element={<UserProfilePage sidebarOpen={sidebarOpen} />} />
                  <Route path="/admin" element={<AdminDashboard sidebarOpen={sidebarOpen} />} />
                  <Route path="/theater-owner" element={<TheaterOwnerDashboard sidebarOpen={sidebarOpen} />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer sidebarOpen={sidebarOpen} />
              <LoginModal />
            </div>
          </Router>
        </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
