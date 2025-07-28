"use client"

import { createContext, useContext, useState } from "react"

const BookingContext = createContext()

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}

// Mock data
const mockMovies = [
    {
      id: "1",
      title: "Avengers: Endgame",
      poster: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg", // 400x600 approx
      genre: ["Action", "Adventure", "Drama"],
      language: "English",
      duration: "3h 1m",
      rating: 8.4,
      description: "After the devastating events of Avengers: Infinity War, the universe is in ruins.",
      cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth"],
    },
    {
        id: "2",
        title: "Spider-Man: No Way Home",
        poster: "/spider.jpeg", 
        genre: ["Action", "Adventure", "Sci-Fi"],
        language: "English",
        duration: "2h 28m",
        rating: 8.2,
        description: "Spider-Man seeks help from Doctor Strange to restore his secret identity.",
        cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Jacob Batalon"],
      },
      {
        id: "3",
        title: "The Batman",
        poster: "/Batman.jpeg",
        genre: ["Action", "Crime", "Drama"],
        language: "English",
        duration: "2h 56m",
        rating: 7.8,
        description: "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues.",
        cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano", "Jeffrey Wright"],
      },
  ]
  

const mockTheaters = [
  {
    id: "1",
    name: "PVR Cinemas",
    location: "Mumbai",
    screens: [
      {
        id: "1",
        name: "Screen 1",
        seats: [],
      },
    ],
  },
]

export const BookingProvider = ({ children }) => {
  const [selectedSeats, setSelectedSeats] = useState([])
  const [bookings, setBookings] = useState([])
  const [currentBooking, setCurrentBooking] = useState(null)

  const addToCart = (seat) => {
    setSelectedSeats((prev) => [...prev, { ...seat, status: "selected" }])
  }

  const removeFromCart = (seatId) => {
    setSelectedSeats((prev) => prev.filter((seat) => seat.id !== seatId))
  }

  const clearCart = () => {
    setSelectedSeats([])
  }

  const createBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now().toString(),
      bookingDate: new Date().toISOString(),
      status: "confirmed",
    }
    setBookings((prev) => [...prev, newBooking])
    clearCart()
  }

  return (
    <BookingContext.Provider
      value={{
        movies: mockMovies,
        theaters: mockTheaters,
        shows: [],
        bookings,
        selectedSeats,
        currentBooking,
        addToCart,
        removeFromCart,
        clearCart,
        createBooking,
        setCurrentBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}
