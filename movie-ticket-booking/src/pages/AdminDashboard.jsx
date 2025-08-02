"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Nav, Table, Button, Form, Modal, Badge } from "react-bootstrap"
import { Film, Users, Building, BarChart3, Plus, Edit, Trash2 } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

const AdminDashboard = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [showMovieModal, setShowMovieModal] = useState(false)
  const [movieForm, setMovieForm] = useState({
    title: "",
    genre: "",
    language: "",
    duration: "",
    description: "",
    poster: "",
  })

  if (user?.role !== "admin") {
    return (
      <Container className="py-5 page-with-navbar-padding">
        <div className="text-center">
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
        </div>
      </Container>
    )
  }

  const stats = [
    { title: "Total Movies", value: "156", icon: Film, color: "primary" },
    { title: "Active Users", value: "12,543", icon: Users, color: "success" },
    { title: "Theaters", value: "89", icon: Building, color: "info" },
    { title: "Total Bookings", value: "45,678", icon: BarChart3, color: "warning" },
  ]

  const movies = [
    { id: 1, title: "Avengers: Endgame", genre: "Action", language: "English", status: "Active" },
    { id: 2, title: "Spider-Man: No Way Home", genre: "Action", language: "English", status: "Active" },
    { id: 3, title: "The Batman", genre: "Action", language: "English", status: "Inactive" },
  ]

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Customer", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Theater Owner", status: "Active" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "Customer", status: "Inactive" },
  ]

  const handleAddMovie = (e) => {
    e.preventDefault()
    console.log("Adding movie:", movieForm)
    setShowMovieModal(false)
    setMovieForm({ title: "", genre: "", language: "", duration: "", description: "", poster: "" })
  }

  return (
    <Container fluid className="py-4 page-with-navbar-padding">
      <Row>
        <Col md={2} className="mb-4">
          <Card>
            <Card.Body>
              <h5 className="mb-3">Admin Panel</h5>
              <Nav variant="pills" className="flex-column">
                <Nav.Item className="mb-2">
                  <Nav.Link active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
                    <BarChart3 size={18} className="me-2" />
                    Overview
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-2">
                  <Nav.Link active={activeTab === "movies"} onClick={() => setActiveTab("movies")}>
                    <Film size={18} className="me-2" />
                    Movies
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-2">
                  <Nav.Link active={activeTab === "users"} onClick={() => setActiveTab("users")}>
                    <Users size={18} className="me-2" />
                    Users
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link active={activeTab === "theaters"} onClick={() => setActiveTab("theaters")}>
                    <Building size={18} className="me-2" />
                    Theaters
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>

        <Col md={10}>
          {activeTab === "overview" && (
            <>
              <Row className="mb-4">
                {stats.map((stat, index) => (
                  <Col key={index} md={3} className="mb-3">
                    <Card>
                      <Card.Body>
                        <div className="d-flex align-items-center">
                          <div className={`p-3 rounded bg-${stat.color} text-white me-3`}>
                            <stat.icon size={24} />
                          </div>
                          <div>
                            <h3 className="mb-0">{stat.value}</h3>
                            <p className="text-muted mb-0">{stat.title}</p>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Row>
                <Col md={6} className="mb-4">
                  <Card>
                    <Card.Header>
                      <h5 className="mb-0">Recent Bookings</h5>
                    </Card.Header>
                    <Card.Body>
                      <div className="text-center py-4">
                        <p className="text-muted">Recent booking analytics would go here</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} className="mb-4">
                  <Card>
                    <Card.Header>
                      <h5 className="mb-0">Revenue Overview</h5>
                    </Card.Header>
                    <Card.Body>
                      <div className="text-center py-4">
                        <p className="text-muted">Revenue charts would go here</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}

          {activeTab === "movies" && (
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Manage Movies</h5>
                <Button variant="primary" onClick={() => setShowMovieModal(true)}>
                  <Plus size={18} className="me-2" />
                  Add Movie
                </Button>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Genre</th>
                      <th>Language</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movies.map((movie) => (
                      <tr key={movie.id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre}</td>
                        <td>{movie.language}</td>
                        <td>
                          <Badge bg={movie.status === "Active" ? "success" : "secondary"}>{movie.status}</Badge>
                        </td>
                        <td>
                          <Button variant="outline-primary" size="sm" className="me-2">
                            <Edit size={14} />
                          </Button>
                          <Button variant="outline-danger" size="sm">
                            <Trash2 size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}

          {activeTab === "users" && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">Manage Users</h5>
              </Card.Header>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <Badge bg={user.status === "Active" ? "success" : "secondary"}>{user.status}</Badge>
                        </td>
                        <td>
                          <Button variant="outline-primary" size="sm" className="me-2">
                            <Edit size={14} />
                          </Button>
                          <Button variant="outline-danger" size="sm">
                            <Trash2 size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}

          {activeTab === "theaters" && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">Manage Theaters</h5>
              </Card.Header>
              <Card.Body>
                <div className="text-center py-5">
                  <Building size={48} className="text-muted mb-3" />
                  <h5>Theater Management</h5>
                  <p className="text-muted">Theater management functionality would go here</p>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* Add Movie Modal */}
      <Modal show={showMovieModal} onHide={() => setShowMovieModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddMovie}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Movie Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={movieForm.title}
                    onChange={(e) => setMovieForm({ ...movieForm, title: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Genre</Form.Label>
                  <Form.Control
                    type="text"
                    value={movieForm.genre}
                    onChange={(e) => setMovieForm({ ...movieForm, genre: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Language</Form.Label>
                  <Form.Control
                    type="text"
                    value={movieForm.language}
                    onChange={(e) => setMovieForm({ ...movieForm, language: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group>
                  <Form.Label>Duration</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="2h 30m"
                    value={movieForm.duration}
                    onChange={(e) => setMovieForm({ ...movieForm, duration: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={movieForm.description}
                onChange={(e) => setMovieForm({ ...movieForm, description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Poster URL</Form.Label>
              <Form.Control
                type="url"
                value={movieForm.poster}
                onChange={(e) => setMovieForm({ ...movieForm, poster: e.target.value })}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMovieModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddMovie}>
            Add Movie
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default AdminDashboard
