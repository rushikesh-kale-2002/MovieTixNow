"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Nav, Button, Form, Badge, Alert } from "react-bootstrap"
import { User, Calendar, CreditCard, Settings, Ticket } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useBooking } from "../contexts/BookingContext"

const UserProfilePage = () => {
  const { user, logout } = useAuth()
  const { bookings } = useBooking()
  const [activeTab, setActiveTab] = useState("bookings")
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+91 9876543210",
    dateOfBirth: "1990-01-01",
  })

  if (!user) {
    return (
      <Container className="py-5 page-with-navbar-padding">
        <Alert variant="warning" className="text-center">
          <h4>Please login to view your profile</h4>
        </Alert>
      </Container>
    )
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    // Handle profile update
    console.log("Profile updated:", profileData)
  }

  return (
    <Container className="py-4 page-with-navbar-padding">
      <Row>
        <Col md={3} className="mb-4">
          <Card>
            <Card.Body className="text-center">
              <img
                src={user.avatar || "/placeholder.svg?height=100&width=100&query=user+avatar"}
                alt={user.name}
                className="rounded-circle mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <h5 className="mb-1">{user.name}</h5>
              <p className="text-muted small mb-3">{user.email}</p>
              <Badge bg="primary" className="mb-3">
                {user.role}
              </Badge>

              <Nav variant="pills" className="flex-column">
                <Nav.Item className="mb-2">
                  <Nav.Link
                    active={activeTab === "bookings"}
                    onClick={() => setActiveTab("bookings")}
                    className="d-flex align-items-center"
                  >
                    <Ticket size={18} className="me-2" />
                    My Bookings
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-2">
                  <Nav.Link
                    active={activeTab === "profile"}
                    onClick={() => setActiveTab("profile")}
                    className="d-flex align-items-center"
                  >
                    <User size={18} className="me-2" />
                    Profile
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-2">
                  <Nav.Link
                    active={activeTab === "payments"}
                    onClick={() => setActiveTab("payments")}
                    className="d-flex align-items-center"
                  >
                    <CreditCard size={18} className="me-2" />
                    Payment Methods
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "settings"}
                    onClick={() => setActiveTab("settings")}
                    className="d-flex align-items-center"
                  >
                    <Settings size={18} className="me-2" />
                    Settings
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          {activeTab === "bookings" && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">My Bookings</h5>
              </Card.Header>
              <Card.Body>
                {bookings.length === 0 ? (
                  <div className="text-center py-5">
                    <Ticket size={48} className="text-muted mb-3" />
                    <h5>No bookings yet</h5>
                    <p className="text-muted">Start booking your favorite movies!</p>
                    <Button variant="primary" href="/">
                      Browse Movies
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookings.map((booking) => (
                      <Card key={booking.id} className="mb-3">
                        <Card.Body>
                          <Row>
                            <Col md={8}>
                              <h6 className="mb-2">Avengers: Endgame</h6>
                              <p className="text-muted small mb-1">PVR Cinemas - Phoenix Mall | Screen 1</p>
                              <p className="text-muted small mb-2">
                                <Calendar size={14} className="me-1" />
                                {new Date(booking.bookingDate).toLocaleDateString()} | 8:30 PM
                              </p>
                              <div className="d-flex gap-1 mb-2">
                                {booking.seats.map((seat) => (
                                  <Badge key={seat.id} bg="primary">
                                    {seat.row}
                                    {seat.number}
                                  </Badge>
                                ))}
                              </div>
                            </Col>
                            <Col md={4} className="text-end">
                              <h6 className="text-success">₹{booking.totalAmount}</h6>
                              <Badge bg={booking.status === "confirmed" ? "success" : "danger"} className="mb-2">
                                {booking.status}
                              </Badge>
                              <div>
                                <Button variant="outline-primary" size="sm">
                                  Download Ticket
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          )}

          {activeTab === "profile" && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">Profile Information</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleProfileUpdate}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button type="submit" variant="primary">
                    Update Profile
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}

          {activeTab === "payments" && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">Payment Methods</h5>
              </Card.Header>
              <Card.Body>
                <div className="text-center py-5">
                  <CreditCard size={48} className="text-muted mb-3" />
                  <h5>No saved payment methods</h5>
                  <p className="text-muted">Add a payment method for faster checkout</p>
                  <Button variant="primary">Add Payment Method</Button>
                </div>
              </Card.Body>
            </Card>
          )}

          {activeTab === "settings" && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">Account Settings</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                  <div>
                    <h6 className="mb-1">Email Notifications</h6>
                    <small className="text-muted">Receive booking confirmations and updates</small>
                  </div>
                  <Form.Check type="switch" defaultChecked />
                </div>
                <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                  <div>
                    <h6 className="mb-1">SMS Notifications</h6>
                    <small className="text-muted">Receive SMS alerts for bookings</small>
                  </div>
                  <Form.Check type="switch" defaultChecked />
                </div>
                <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                  <div>
                    <h6 className="mb-1">Marketing Emails</h6>
                    <small className="text-muted">Receive promotional offers and updates</small>
                  </div>
                  <Form.Check type="switch" />
                </div>
                <div className="pt-3">
                  <Button variant="danger" onClick={logout}>
                    Logout
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default UserProfilePage
