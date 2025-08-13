import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Table, Button, Nav, Spinner, Badge, Modal, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { fetchOwnerShows, toggleShowStatus, deleteShow } from "../services/api"
import { Eye, Trash2, Play, Pause } from "lucide-react"

const TheatreManageShowsPage = () => {
  const [shows, setShows] = useState({ scheduled: [], active: [] })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("active")
  const [actionLoading, setActionLoading] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedShow, setSelectedShow] = useState(null)
  const [alert, setAlert] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadShows()
  }, [])

  const loadShows = async () => {
    try {
      setLoading(true)
      const data = await fetchOwnerShows() // Pass ownerId here
      console.log("Fetched shows from API:", data)

      const mapShow = (show) => ({
        id: show.showId,
        movieTitle: show.movieTitle,
        theaterName: show.theaterName,
        screenNumber: show.screenNumber,
        showDate: show.showDate,
        showTime: show.startTime || "00:00:00",
        seatPrices: show.seatTypePrices || {},
        bookedSeats: show.bookedSeats ?? 0,
        totalSeats: show.totalSeats ?? 0,
        revenue: show.revenue ?? 0,
        is_active: show.showStatus === "ACTIVE",
        showStatus: show.showStatus
      })

      const active = data.filter((show) => show.showStatus === "ACTIVE").map(mapShow)
      const scheduled = data.filter((show) => show.showStatus === "SCHEDULED").map(mapShow)

      setShows({ active, scheduled })
    } catch (error) {
      console.error("Error loading shows:", error)
      setAlert({ type: "danger", message: "Failed to load shows" })
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = async (show) => {
    setActionLoading(show.id)
    try {
      const newStatus = show.is_active ? "SCHEDULED" : "ACTIVE"
      await toggleShowStatus(show.id, newStatus)

      const updatedShow = { ...show, is_active: newStatus === "ACTIVE", showStatus: newStatus }

      setShows((prevShows) => {
        if (newStatus === "ACTIVE") {
          return {
            scheduled: prevShows.scheduled.filter((s) => s.id !== show.id),
            active: [...prevShows.active, updatedShow],
          }
        } else {
          return {
            active: prevShows.active.filter((s) => s.id !== show.id),
            scheduled: [...prevShows.scheduled, updatedShow],
          }
        }
      })

      setAlert({
        type: "success",
        message: `Show ${newStatus === "ACTIVE" ? "activated" : "deactivated"} successfully!`,
      })
    } catch (error) {
      setAlert({ type: "danger", message: error.message })
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteShow = async () => {
    if (!selectedShow) return

    setActionLoading(selectedShow.id)
    try {
      await deleteShow(selectedShow.id)

      setShows((prevShows) => ({
        scheduled: prevShows.scheduled.filter((s) => s.id !== selectedShow.id),
        active: prevShows.active.filter((s) => s.id !== selectedShow.id),
      }))

      setAlert({ type: "success", message: "Show deleted successfully!" })
      setShowModal(false)
      setSelectedShow(null)
    } catch (error) {
      setAlert({ type: "danger", message: error.message })
    } finally {
      setActionLoading(null)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getOccupancyPercentage = (bookedSeats, totalSeats) => {
    return totalSeats > 0 ? Math.round((bookedSeats / totalSeats) * 100) : 0
  }

  const getOccupancyBadgeVariant = (percentage) => {
    if (percentage >= 80) return "success"
    if (percentage >= 50) return "warning"
    return "danger"
  }

  const renderShowsTable = (showsList, isActive = false) => (
    <Table responsive striped hover>
      <thead>
        <tr>
          <th>Movie</th>
          <th>Theater</th>
          <th>Screen</th>
          <th>Date & Time</th>
          <th>Pricing</th>
          {isActive && <th>Occupancy</th>}
          {isActive && <th>Revenue</th>}
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {showsList.length === 0 ? (
          <tr>
            <td colSpan={isActive ? 9 : 7} className="text-center text-muted py-4">
              No {isActive ? "active" : "scheduled"} shows found
            </td>
          </tr>
        ) : (
          showsList.map((show) => {
            const occupancyPercentage = getOccupancyPercentage(show.bookedSeats, show.totalSeats)

            return (
              <tr key={show.id}>
                <td><div className="fw-bold">{show.movieTitle}</div></td>
                <td>{show.theaterName}</td>
                <td><Badge bg="secondary">Screen {show.screenNumber}</Badge></td>
                <td>
                  <div className="small">
                    <div className="fw-bold">{formatDate(show.showDate)}</div>
                    <div className="text-muted">{formatTime(show.showTime)}</div>
                  </div>
                </td>
                <td>
                  <div className="small">
                    {Object.entries(show.seatPrices).map(([type, price]) => (
                      <div key={type}>
                        {type.charAt(0)}: {formatCurrency(price)}
                      </div>
                    ))}
                  </div>
                </td>
                {isActive && (
                  <td>
                    <div className="small">
                      <Badge bg={getOccupancyBadgeVariant(occupancyPercentage)}>{occupancyPercentage}%</Badge>
                      <div className="text-muted mt-1">{show.bookedSeats}/{show.totalSeats}</div>
                    </div>
                  </td>
                )}
                {isActive && (
                  <td><div className="fw-bold text-success">{formatCurrency(show.revenue)}</div></td>
                )}
                <td>
                  <Badge bg={show.is_active ? "success" : "warning"}>
                    {show.is_active ? "Active" : "Scheduled"}
                  </Badge>
                </td>
                <td>
                  <div className="d-flex gap-1">
                    <Button
                      variant={show.is_active ? "outline-warning" : "outline-success"}
                      size="sm"
                      onClick={() => handleToggleStatus(show)}
                      disabled={actionLoading === show.id}
                      title={show.is_active ? "Deactivate Show" : "Activate Show"}
                    >
                      {actionLoading === show.id ? <Spinner size="sm" /> : show.is_active ? <Pause size={14} /> : <Play size={14} />}
                    </Button>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      onClick={() => navigate(`/owner/shows/${show.id}/details`)} 
                      title="View Details"
                    >
                      <Eye size={14} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        setSelectedShow(show)
                        setShowModal(true)
                      }}
                      title="Delete Show"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            )
          })
        )}
      </tbody>
    </Table>
  )

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    )
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1>My Shows</h1>
            <Button variant="primary" onClick={() => navigate("/owner/theaters/5/add-show")}>Schedule New Show</Button>
          </div>
        </Col>
      </Row>

      {alert && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert(null)} className="mb-4">
          {alert.message}
        </Alert>
      )}

      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title className="text-muted">Active Shows</Card.Title>
              <Card.Text className="display-6 text-success">{shows.active.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title className="text-muted">Scheduled Shows</Card.Title>
              <Card.Text className="display-6 text-warning">{shows.scheduled.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title className="text-muted">Revenue</Card.Title>
              <Card.Text className="display-6 text-primary">
                {formatCurrency(shows.active.reduce((sum, show) => sum + show.revenue, 0))}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title className="text-muted">Avg Occupancy</Card.Title>
              <Card.Text className="display-6 text-info">
                {shows.active.length > 0
                  ? Math.round(
                      shows.active.reduce((sum, show) => sum + getOccupancyPercentage(show.bookedSeats, show.totalSeats), 0) / shows.active.length
                    )
                  : 0}%
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab}>
                <Nav.Item>
                  <Nav.Link eventKey="active">Active Shows<Badge bg="success" className="ms-2">{shows.active.length}</Badge></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="scheduled">Scheduled Shows<Badge bg="warning" text="dark" className="ms-2">{shows.scheduled.length}</Badge></Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body className="p-0">
              {activeTab === "active" && renderShowsTable(shows.active, true)}
              {activeTab === "scheduled" && renderShowsTable(shows.scheduled, false)}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this show?</p>
          {selectedShow && (
            <div className="bg-light p-3 rounded">
              <strong>{selectedShow.movieTitle}</strong>
              <br />
              <small className="text-muted">
                {selectedShow.theaterName} - Screen {selectedShow.screenNumber}
                <br />
                {formatDate(selectedShow.showDate)} at {formatTime(selectedShow.showTime)}
              </small>
            </div>
          )}
          <p className="text-danger mt-3 mb-0">
            <small>This action cannot be undone.</small>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteShow} disabled={actionLoading === selectedShow?.id}>
            {actionLoading === selectedShow?.id ? <><Spinner size="sm" className="me-2" />Deleting...</> : "Delete Show"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default TheatreManageShowsPage
