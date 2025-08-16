"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const AddTheaterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    screens: 1,
  })
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)
  const navigate = useNavigate()

  const ownerId = 1 // Replace with actual logged-in owner id

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "screens" ? Number.parseInt(value) || 1 : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setAlert(null)

    try {
      const dto = {
        theaterName: formData.name,
        theaterAddress: formData.address,
        theaterLocation: formData.city,
        screenCount: formData.screens,
        ownerId: ownerId,
      }
      const token = localStorage.getItem("token")
      const res = await axios.post("http://localhost:8080/api/theaters/add", dto,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setAlert({ type: "success", message: res.data.message })

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate(`/owner/${res.data.theaterId}/layout`)
      }, 2000)
    } catch (error) {
      setAlert({
        type: "danger",
        message: error.response?.data?.message || error.message || "Failed to add theater",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header>
              <h2>Add New Theater</h2>
            </Card.Header>
            <Card.Body>
              {alert && (
                <Alert variant={alert.type} className="mb-3">
                  {alert.message}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Theater Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter theater name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address *</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Enter full address"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>City *</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Enter city"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Number of Screens *</Form.Label>
                  <Form.Control
                    type="number"
                    name="screens"
                    value={formData.screens}
                    onChange={handleChange}
                    min="1"
                    max="20"
                    required
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" disabled={loading} size="lg">
                    {loading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" className="me-2" />
                        Adding Theater...
                      </>
                    ) : (
                      "Add Theater"
                    )}
                  </Button>
                  <Button variant="secondary" onClick={() => navigate("/owner/dashboard")} disabled={loading}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AddTheaterPage
