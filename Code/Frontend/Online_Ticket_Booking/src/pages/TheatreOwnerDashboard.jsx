import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { fetchDashboardStats } from "../services/api"

const TheatreOwnerDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchDashboardStats()
        setStats(data)
      } catch (error) {
        console.error("Error loading stats:", error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

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
          <h1 className="mb-4">Theater Owner Dashboard</h1>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title className="text-muted">Pending Theaters</Card.Title>
              <Card.Text className="display-4 text-warning">{stats?.pendingTheaters ?? 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title className="text-muted">Approved Theaters</Card.Title>
              <Card.Text className="display-4 text-success">{stats?.approvedTheaters ?? 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title className="text-muted">Total Theaters</Card.Title>
              <Card.Text className="display-4 text-info">{stats?.totalTheaters ?? 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title className="text-muted">Total Revenue</Card.Title>
              <Card.Text className="display-6 text-primary">
                {formatCurrency(stats?.totalRevenue ?? 0)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Shows Stats */}
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title className="text-muted">Active Shows</Card.Title>
              <Card.Text className="display-4 text-success">{stats?.activeShows ?? 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title className="text-muted">Scheduled Shows</Card.Title>
              <Card.Text className="display-4 text-warning">{stats?.scheduledShows ?? 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title className="text-muted">Today's Revenue</Card.Title>
              <Card.Text className="display-4 text-info">{stats?.todaysRevenue ?? 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title className="text-muted">Today's Bookings</Card.Title>
              <Card.Text className="display-4 text-info">{stats?.todaysBookings ?? 0}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4>Quick Actions</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col lg={3} md={6} className="mb-3">
                  <Button variant="primary" size="lg" className="w-100" onClick={() => navigate("/owner/add-theater")}>
                    Add Theater
                  </Button>
                </Col>
                <Col lg={3} md={6} className="mb-3">
                  <Button variant="secondary" size="lg" className="w-100" onClick={() => navigate("/owner/theaters")}>
                    Manage Theaters
                  </Button>
                </Col>
                <Col lg={3} md={6} className="mb-3">
                  <Button variant="success" size="lg" className="w-100" onClick={() => navigate("/owner/theaters")}>
                    Add Show
                  </Button>
                </Col>
                <Col lg={3} md={6} className="mb-3">
                  <Button variant="info" size="lg" className="w-100" onClick={() => navigate("/dashboard/shows")}>
                    Manage Shows
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default TheatreOwnerDashboard
