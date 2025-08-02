"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./custom-overrides.css"

import { AuthProvider } from "./contexts/AuthContext"
import { BookingProvider } from "./contexts/BookingContext"
import { ThemeProvider } from "./contexts/ThemeContext"

import Layout from "./components/layout/Layout"

import HomePage from "./pages/HomePage"
import MovieDetailsPage from "./pages/MovieDetailsPage"
import ShowSelectionPage from "./pages/ShowSelectionPage"
import SeatSelectionPage from "./pages/SeatSelectionPage"
import CheckoutPage from "./pages/CheckoutPage"
import UserProfilePage from "./pages/UserProfilePage"
import AdminDashboard from "./pages/AdminDashboard"
import TheaterOwnerDashboard from "./pages/TheaterOwnerDashboard"

import { useState } from "react"

function App() {


  return (
    <ThemeProvider>
      <AuthProvider>
        <BookingProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movie/:id" element={<MovieDetailsPage />} />
                <Route path="/movie/:id/shows" element={<ShowSelectionPage />} />
                <Route path="/movie/:id/seats" element={<SeatSelectionPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/theater-dashboard" element={<TheaterOwnerDashboard />} />
              </Routes>
            </Layout>
          </Router>
        </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App