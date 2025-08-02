"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Nav, Table, Button, Form, Modal, Badge } from "react-bootstrap"
import { Calendar, Users, Plus, Eye } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

const TheaterOwnerDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("shows")
  const [showAddShowModal, setShowAddShowModal] = useState(false)
  const [showForm, setShowForm] = useState({
    movieId: "",
    date: "",
    time: "",
    price: "",
    screen: "",
  })

  if (user?.role !== "theater-owner") {
    return (
      <Container className="py-5 page-with-navbar-padding">
        <div className="text-center">
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
        </div>
      </Container>
    )
  }

  const shows = [
    {
      id: 1,
      movie: "Avengers: Endgame",
      date: "2024-01-15",
      time: "8:30 PM",
      screen: "Screen 1",
      price: 300,
      bookings: 45,
      capacity: 100,
    },
    {
      id: 2,
      movie: "Spider-Man: No Way Home",
      date: "2024-01-15",
      time: "5:00 PM",
      screen: "Screen 2",
      price: 250,
      bookings: 78,
      capacity: 120,
    },
  ]

  const bookings = [
    {
      id: 1,
      customerName: "abc",
      movie: "Avengers: Endgame",
      seats: ["A1", "A2"],
      amount: 600,
      bookingDate: "2024-01-10",
      status: "Confirmed",
    },
    {
      id: 2,
      customerName: "abcd",
      movie: "Spider-Man: No Way Home",
      seats: ["B5", "B6", "B7"],
      amount: 750,
      bookingDate: "2024-01-12",
      status: "Confirmed",
    },
  ]

  const handleAddShow = (e) => {
    e.preventDefault()
    console.log("Adding show:", showForm)
    setShowAddShowModal(false)
    setShowForm({ movieId: "", date: "", time: "", price: "", screen: "" })
  }

  return (
    <Container fluid className="py-4 page-with-navbar-padding">
      <Row>
        <Col md={2} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="mb-3">Theater Panel</h5>
              <Nav variant="pills" className="flex-column">
                <Nav.Item className="mb-2">
                  <Nav.Link active={activeTab === "shows"} onClick={() => setActiveTab("shows")}>
                    <Calendar size={18} className="me-2" />
                    My Shows
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-2">
                  <Nav.Link active={activeTab === "bookings"} onClick={() => setActiveTab("bookings")}>
                    <Users size={18} className="me-2" />
                    Bookings
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>

        <Col md={10}>
          {activeTab === "shows" && (
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Manage Shows</h5>
                <Button variant="primary" onClick={() => setShowAddShowModal(true)}>
                  <Plus size={18} className="me-2" />
                  Add Show
                </Button>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Movie</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Screen</th>
                      <th>Price</th>
                      <th>Bookings</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shows.map((show) => (
                      <tr key={show.id}>
                        <td>{show.movie}</td>
                        <td>{new Date(show.date).toLocaleDateString()}</td>
                        <td>{show.time}</td>
                        <td>{show.screen}</td>
                        <td>₹{show.price}</td>
                        <td>
                          <span className="text-success">{show.bookings}</span>
                          <span className="text-muted">/{show.capacity}</span>
                        </td>
                        <td>
                          <Button variant="outline-primary" size="sm">
                            <Eye size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}

          {activeTab === "bookings" && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">Recent Bookings</h5>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Movie</th>
                      <th>Seats</th>
                      <th>Amount</th>
                      <th>Booking Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.customerName}</td>
                        <td>{booking.movie}</td>
                        <td>
                          {booking.seats.map((seat, index) => (
                            <Badge key={index} bg="primary" className="me-1">
                              {seat}
                            </Badge>
                          ))}
                        </td>
                        <td>₹{booking.amount}</td>
                        <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                        <td>
                          <Badge bg="success">{booking.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* Add Show Modal */}
      <Modal show={showAddShowModal} onHide={() => setShowAddShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Show</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddShow}>
            <Form.Group className="mb-3">
              <Form.Label>Select Movie</Form.Label>
              <Form.Select
                value={showForm.movieId}
                onChange={(e) => setShowForm({ ...showForm, movieId: e.target.value })}
                required
              >
                <option value="">Choose a movie...</option>
                <option value="1">Avengers: Endgame</option>
                <option value="2">Spider-Man: No Way Home</option>
                <option value="3">The Batman</option>
              </Form.Select>
            </Form.Group>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={showForm.date}
                    onChange={(e) => setShowForm({ ...showForm, date: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={showForm.time}
                    onChange={(e) => setShowForm({ ...showForm, time: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Screen</Form.Label>
                  <Form.Select
                    value={showForm.screen}
                    onChange={(e) => setShowForm({ ...showForm, screen: e.target.value })}
                    required
                  >
                    <option value="">Select screen...</option>
                    <option value="screen1">Screen 1</option>
                    <option value="screen2">Screen 2</option>
                    <option value="screen3">Screen 3</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Ticket Price (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    value={showForm.price}
                    onChange={(e) => setShowForm({ ...showForm, price: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddShow}>
            Add Show
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default TheaterOwnerDashboard
