"use client"

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"

const BookingContext = createContext()

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}


export const BookingProvider = ({ children }) => {
  const [selectedSeats, setSelectedSeats] = useState([])
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

 
  const addToCart = (seat) => {
    setSelectedSeats((prev) => [...prev, { ...seat, status: "selected" }])
  }
  useEffect(() => {
    axios.get("http://localhost:8080/user/movies")
      .then((res) => {
        setMovies(res.data)
      })
      .catch((err) => console.error("Error fetching movies", err))
      .finally(() => setLoading(false))
  }, [])
  const removeFromCart = (seatId) => {
    setSelectedSeats((prev) => prev.filter((seat) => seat.id !== seatId))
  }

  const clearCart = () => {
    setSelectedSeats([])
  }
  
  return (
    <BookingContext.Provider
      value={{
        movies,
        theaters: [], 
        shows: [],
        selectedSeats,
        addToCart,
        removeFromCart,
        clearCart,
        loading   
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}
