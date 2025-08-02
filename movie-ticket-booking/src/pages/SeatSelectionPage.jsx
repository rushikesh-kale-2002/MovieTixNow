"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap"
import { useParams, useNavigate, useSearchParams } from "react-router-dom"
import { useBooking } from "../contexts/BookingContext"

const SeatSelectionPage = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { movies, selectedSeats, addToCart, removeFromCart } = useBooking()

  const theaterId = searchParams.get("theater")
  const showId = searchParams.get("show")

  const movie = movies.find((m) => m.id === id)

  // Mock seat layout
  const [seats, setSeats] = useState(() => {
    const seatLayout = []
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H"]

    rows.forEach((row, rowIndex) => {
      const rowSeats = []
      const seatsPerRow = rowIndex < 2 ? 8 : rowIndex < 5 ? 10 : 12

      for (let i = 1; i <= seatsPerRow; i++) {
        const seatType = rowIndex < 2 ? "vip" : rowIndex < 5 ? "premium" : "regular"
        const basePrice = seatType === "vip" ? 400 : seatType === "premium" ? 300 : 200
        const isBooked = Math.random() < 0.2 // 20% chance of being booked

        rowSeats.push({
          id: `${row}${i}`,
          row,
          number: i,
          type: seatType,
          price: basePrice,
          status: isBooked ? "booked" : "available",
        })
      }
      seatLayout.push(rowSeats)
    })

    return seatLayout
  })

  if (!movie) {
    return (
      <Container className="py-5 page-with-navbar-padding">
        <div className="text-center">
          <h2>Movie not found</h2>
          <Button variant="primary" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </Container>
    )
  }

  const handleSeatClick = (seat) => {
    if (seat.status === "booked") return

    const newSeats = seats.map((row) =>
      row.map((s) => {
        if (s.id === seat.id) {
          const newStatus = s.status === "selected" ? "available" : "selected"

          if (newStatus === "selected") {
            addToCart(s)
          } else {
            removeFromCart(s.id)
          }

          return { ...s, status: newStatus }
        }
        return s
      }),
    )

    setSeats(newSeats)
  }

  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
  const selectedSeatCount = selectedSeats.length

  const handleProceedToCheckout = () => {
    if (selectedSeatCount === 0) return
    navigate("/checkout")
  }

  return (
    <Container className="py-4 page-with-navbar-padding">
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center mb-3">
            <img
              src={movie.poster || "/placeholder.svg?height=80&width=60&query=movie+poster"}
              alt={movie.title}
              style={{ width: "60px", height: "80px", objectFit: "cover" }}
              className="rounded me-3"
            />
            <div>
              <h2 className="mb-1">{movie.title}</h2>
              <p className="text-muted mb-0">PVR Cinemas - Phoenix Mall | Today, 8:30 PM</p>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={8} className="mb-4">
          <Card>
            <Card.Body>
              <div className="text-center mb-4">
                <div
                  className="bg-light rounded mx-auto mb-3"
                  style={{
                    width: "200px",
                    height: "20px",
                    background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
                  }}
                >
                  <small className="text-muted">SCREEN</small>
                </div>
              </div>

              <div className="seat-layout">
                {seats.map((row, rowIndex) => (
                  <div key={rowIndex} className="d-flex justify-content-center align-items-center mb-2">
                    <div className="me-3 fw-bold" style={{ width: "20px" }}>
                      {row[0]?.row}
                    </div>
                    <div className="d-flex gap-1">
                      {row.map((seat, seatIndex) => (
                        <button
                          key={seat.id}
                          className={`seat ${seat.status}`}
                          onClick={() => handleSeatClick(seat)}
                          disabled={seat.status === "booked"}
                          title={`${seat.row}${seat.number} - ₹${seat.price} (${seat.type})`}
                        >
                          {seat.number}
                        </button>
                      ))}
                    </div>
                    <div className="ms-3 fw-bold" style={{ width: "20px" }}>
                      {row[0]?.row}
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-center gap-4 mt-4">
                <div className="d-flex align-items-center">
                  <div className="seat available me-2"></div>
                  <small>Available</small>
                </div>
                <div className="d-flex align-items-center">
                  <div className="seat selected me-2"></div>
                  <small>Selected</small>
                </div>
                <div className="d-flex align-items-center">
                  <div className="seat booked me-2"></div>
                  <small>Booked</small>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="sticky-top" style={{ top: "100px" }}>
            <Card.Header>
              <h5 className="mb-0">Booking Summary</h5>
            </Card.Header>
            <Card.Body>
              {selectedSeatCount === 0 ? (
                <Alert variant="info">Please select seats to continue</Alert>
              ) : (
                <>
                  <div className="mb-3">
                    <h6>Selected Seats ({selectedSeatCount})</h6>
                    <div className="d-flex flex-wrap gap-1">
                      {selectedSeats.map((seat) => (
                        <span key={seat.id} className="badge bg-primary">
                          {seat.row}
                          {seat.number}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Tickets ({selectedSeatCount})</span>
                      <span>₹{totalAmount}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Convenience Fee</span>
                      <span>₹{Math.round(totalAmount * 0.1)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-bold">
                      <span>Total Amount</span>
                      <span>₹{totalAmount + Math.round(totalAmount * 0.1)}</span>
                    </div>
                  </div>

                  <Button variant="primary" size="lg" className="w-100" onClick={handleProceedToCheckout}>
                    Proceed to Payment
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SeatSelectionPage
