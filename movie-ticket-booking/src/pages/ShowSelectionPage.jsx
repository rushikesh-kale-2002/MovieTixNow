"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import { MapPin, Calendar, Clock } from "lucide-react"
import { useBooking } from "../contexts/BookingContext"

const ShowSelectionPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { movies } = useBooking()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [selectedLocation, setSelectedLocation] = useState("Mumbai")

  const movie = movies.find((m) => m.id === id)

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

  const locations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad"]
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date.toISOString().split("T")[0]
  })

  const theaters = [
    {
      id: "1",
      name: "PVR Cinemas - Phoenix Mall",
      location: "Lower Parel, Mumbai",
      shows: [
        { id: "1", time: "10:00 AM", price: 200, available: true },
        { id: "2", time: "1:30 PM", price: 250, available: true },
        { id: "3", time: "5:00 PM", price: 300, available: false },
        { id: "4", time: "8:30 PM", price: 350, available: true },
      ],
    },
    {
      id: "2",
      name: "INOX - R City Mall",
      location: "Ghatkopar, Mumbai",
      shows: [
        { id: "5", time: "11:00 AM", price: 180, available: true },
        { id: "6", time: "2:30 PM", price: 220, available: true },
        { id: "7", time: "6:00 PM", price: 280, available: true },
        { id: "8", time: "9:30 PM", price: 320, available: true },
      ],
    },
    {
      id: "3",
      name: "Cinepolis - Viviana Mall",
      location: "Thane, Mumbai",
      shows: [
        { id: "9", time: "12:00 PM", price: 190, available: true },
        { id: "10", time: "3:30 PM", price: 240, available: true },
        { id: "11", time: "7:00 PM", price: 290, available: true },
        { id: "12", time: "10:30 PM", price: 340, available: false },
      ],
    },
  ]

  const handleShowSelect = (theaterId, showId) => {
    navigate(`/movie/${id}/seats?theater=${theaterId}&show=${showId}`)
  }

  return (
    <Container className="py-4 page-with-navbar-padding">
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center mb-3">
            <img
              src={movie.poster || "/placeholder.svg"}
              alt={movie.title}
              style={{ width: "60px", height: "80px", objectFit: "cover" }}
              className="rounded me-3"
            />
            <div>
              <h2 className="mb-1">{movie.title}</h2>
              <p className="text-muted mb-0">
                {movie.genre.join(", ")} • {movie.duration}
              </p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={6} className="mb-3">
          <Form.Group>
            <Form.Label className="d-flex align-items-center">
              <MapPin size={18} className="me-2" />
              Select Location
            </Form.Label>
            <Form.Select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6} className="mb-3">
          <Form.Group>
            <Form.Label className="d-flex align-items-center">
              <Calendar size={18} className="me-2" />
              Select Date
            </Form.Label>
            <Form.Select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
              {dates.map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Theater List */}
      <Row>
        <Col>
          <h4 className="mb-4">Available Shows in {selectedLocation}</h4>

          {theaters.map((theater) => (
            <Card key={theater.id} className="mb-4">
              <Card.Body>
                <Row>
                  <Col md={4} className="mb-3 mb-md-0">
                    <h5 className="mb-1">{theater.name}</h5>
                    <p className="text-muted small mb-0">
                      <MapPin size={14} className="me-1" />
                      {theater.location}
                    </p>
                  </Col>

                  <Col md={8}>
                    <div className="d-flex flex-wrap gap-2">
                      {theater.shows.map((show) => (
                        <Button
                          key={show.id}
                          variant={show.available ? "outline-primary" : "outline-secondary"}
                          size="sm"
                          disabled={!show.available}
                          onClick={() => handleShowSelect(theater.id, show.id)}
                          className="d-flex flex-column align-items-center p-2"
                          style={{ minWidth: "80px" }}
                        >
                          <div className="d-flex align-items-center mb-1">
                            <Clock size={14} className="me-1" />
                            <small>{show.time}</small>
                          </div>
                          <small className="text-success fw-semibold">₹{show.price}</small>
                          {!show.available && <small className="text-danger">Sold Out</small>}
                        </Button>
                      ))}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}

          {theaters.length === 0 && (
            <Card>
              <Card.Body className="text-center py-5">
                <h5>No shows available</h5>
                <p className="text-muted">
                  No shows found for {movie.title} in {selectedLocation} on{" "}
                  {new Date(selectedDate).toLocaleDateString()}
                </p>
                <Button variant="primary" onClick={() => navigate(`/movie/${id}`)}>
                  Back to Movie Details
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default ShowSelectionPage
