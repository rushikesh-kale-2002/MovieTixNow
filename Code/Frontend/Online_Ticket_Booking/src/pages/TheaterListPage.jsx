"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Table, Button, Nav, Spinner, Badge } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const TheaterListPage = () => {
  const [theaters, setTheaters] = useState({ pending: [], approved: [] })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("approved")
  const navigate = useNavigate()

  const ownerId = 5 // Hardcoded or get from user context/session

  useEffect(() => {
    const loadTheaters = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`http://localhost:8080/api/theaters/owner/${ownerId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setTheaters(res.data)
      } catch (error) {
        console.error("Error loading theaters:", error)
      } finally {
        setLoading(false)
      }
    }
    loadTheaters()
  }, [])

  const renderTheaterTable = (theaterList, showActions = false) => (
    <Table responsive striped hover>
      <thead>
        <tr>
          <th>Theater Name</th>
          <th>City</th>
          <th>Screens</th>
          <th>Status</th>
          {showActions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {theaterList.length === 0 ? (
          <tr>
            <td colSpan={showActions ? 5 : 4} className="text-center text-muted">
              No theaters found
            </td>
          </tr>
        ) : (
          theaterList.map((theater) => (
            <tr key={theater.theaterId}>
              <td>{theater.theaterName}</td>
              <td>{theater.theaterLocation}</td>
              <td>{theater.screenCount}</td>
              <td>
                <Badge
                  bg={theater.status === "APPROVED" ? "success" : "warning"}
                  text={theater.status === "APPROVED" ? "white" : "dark"}
                >
                  {theater.status.charAt(0) + theater.status.slice(1).toLowerCase()}
                </Badge>
              </td>
              {showActions && (
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/owner/${theater.theaterId}/layout`)}
                    >
                      Manage Layout
                    </Button>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => navigate(`/owner/theaters/${theater.theaterId}/add-show`)}
                    >
                      Add Show
                    </Button>
                  </div>
                </td>
              )}
            </tr>
          ))
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
            <h1>My Theaters</h1>
            <Button variant="primary" onClick={() => navigate("/owner/add-theater")}>
              Add New Theater
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab}>
                <Nav.Item>
                  <Nav.Link eventKey="approved">
                    Approved Theaters
                    <Badge bg="success" className="ms-2">
                      {theaters.approved.length}
                    </Badge>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="pending">
                    Pending Approval
                    <Badge bg="warning" text="dark" className="ms-2">
                      {theaters.pending.length}
                    </Badge>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body className="p-0">
              {activeTab === "approved" && renderTheaterTable(theaters.approved, true)}
              {activeTab === "pending" && renderTheaterTable(theaters.pending, false)}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default TheaterListPage
