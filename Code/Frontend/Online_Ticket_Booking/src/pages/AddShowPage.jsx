"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, InputGroup } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import { fetchTheaterById, fetchMoviesForShows, addShow } from "../services/api"

const AddShowPage = () => {
  const { theaterId } = useParams()
  const navigate = useNavigate()
  const [theater, setTheater] = useState(null)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [alert, setAlert] = useState(null)
  const [formData, setFormData] = useState({
    movieId: "",
    screenId: null,
    showDate: "",
    showTime: "",
    seatPrices: {},
    enabledSeatTypes: [],
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const [theaterData, moviesData] = await Promise.all([
          fetchTheaterById(theaterId),
          fetchMoviesForShows(),
        ])

        setTheater(theaterData)
        setMovies(moviesData)

        // Set default screenId (first one)
        setFormData((prev) => ({
          ...prev,
          screenId: theaterData?.screens?.[0]?.screenId ?? null,
        }))
      } catch (error) {
        console.error("Error loading data:", error)
        setAlert({ type: "danger", message: "Failed to load data" })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [theaterId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "screenId" ? Number.parseInt(value) || null : value,
    }))
  }

  const handlePriceChange = (seatType, value) => {
    setFormData((prev) => ({
      ...prev,
      seatPrices: {
        ...prev.seatPrices,
        [seatType]: Number.parseFloat(value) || 0,
      },
    }))
  }

  const handleSeatTypeToggle = (type) => {
    setFormData((prev) => {
      const enabled = prev.enabledSeatTypes.includes(type)
        ? prev.enabledSeatTypes.filter((t) => t !== type)
        : [...prev.enabledSeatTypes, type]
  
      const updatedPrices = { ...prev.seatPrices }
      if (!enabled.includes(type)) {
        delete updatedPrices[type]
      } else if (!updatedPrices[type]) {
        updatedPrices[type] = 0
      }
  
      return {
        ...prev,
        enabledSeatTypes: enabled,
        seatPrices: updatedPrices,
      }
    })
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setAlert(null)

    try {

        if (formData.enabledSeatTypes.length === 0) {
            setAlert({ type: "danger", message: "Please enable at least one seat type" })
            setSaving(false)
            return
          }

      const showData = {
        movieId: Number.parseInt(formData.movieId),
        screenId: formData.screenId,
        showDate: formData.showDate,
        showTime: formData.showTime,
        seatPrices: formData.seatPrices,
      }

      const result = await addShow(theaterId, showData)
      setAlert({ type: "success", message: result.message })

      setTimeout(() => {
        navigate("/owner/theaters")
      }, 2000)
    } catch (error) {
      setAlert({ type: "danger", message: error.message })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Container className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    )
  }

  const screenOptions = theater?.screens || []

  const seatTypes = [
    { key: "EXECUTIVE", label: "Executive", color: "#28a745", icon: "🟢" },
    { key: "PREMIUM", label: "Premium", color: "#ffc107", icon: "🟡" },
    { key: "VIP", label: "VIP", color: "#dc3545", icon: "🔴" },
  ]

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card>
            <Card.Header>
              <h2>Add Show - {theater?.theaterName}</h2>
              <p className="mb-0 text-muted">{theater?.theaterLocation}</p>
            </Card.Header>
            <Card.Body>
              {alert && (
                <Alert variant={alert.type} className="mb-3">
                  {alert.message}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Select Movie *</Form.Label>
                      <Form.Select name="movieId" value={formData.movieId} onChange={handleChange} required>
                        <option value="">Choose a movie...</option>
                        {movies.map((movie) => (
                          <option key={movie.id} value={movie.id}>
                            {/* {movie.title} ({movie.duration} min) */}
                            {movie.title}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Select Screen *</Form.Label>
                      <Form.Select name="screenId" value={formData.screenId || ""} onChange={handleChange} required>
                        {screenOptions.map(({ screenId, screenNumber }) => (
                          <option key={screenId} value={screenId}>
                          {screenNumber}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Show Date *</Form.Label>
                      <Form.Control
                        type="date"
                        name="showDate"
                        value={formData.showDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Show Time *</Form.Label>
                      <Form.Control
                        type="time"
                        name="showTime"
                        value={formData.showTime}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

              


<Card className="mb-4">
  <Card.Header>
    <h5 className="mb-0">Seat Pricing Configuration</h5>
    <small className="text-muted">Choose seat types and set custom prices</small>
  </Card.Header>
  <Card.Body>
   
    <div className="mb-3">
      <Form.Label>Enable Seat Types:</Form.Label>
      <div className="d-flex gap-3 flex-wrap">
        {seatTypes.map((seatType) => (
          <Form.Check
            key={seatType.key}
            type="checkbox"
            id={`checkbox-${seatType.key}`}
            label={`${seatType.icon} ${seatType.label}`}
            checked={formData.enabledSeatTypes.includes(seatType.key)}
            onChange={() => handleSeatTypeToggle(seatType.key)}
          />
        ))}
      </div>
    </div>

    
    <Row>
      {formData.enabledSeatTypes.map((seatTypeKey) => {
        const seatType = seatTypes.find((st) => st.key === seatTypeKey)
        return (
          <Col md={4} key={seatTypeKey} className="mb-3">
            <Form.Group>
              <Form.Label className="d-flex align-items-center gap-2">
                <span style={{ fontSize: "18px" }}>{seatType.icon}</span>
                <span>{seatType.label} Seats</span>
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>₹</InputGroup.Text>
                <Form.Control
                  type="number"
                  min="0"
                  step="10"
                  value={formData.seatPrices[seatType.key] || ""}
                  onChange={(e) => handlePriceChange(seatType.key, e.target.value)}
                  placeholder="0"
                  required
                />
              </InputGroup>
              <Form.Text className="text-muted">Price per {seatType.label.toLowerCase()} seat</Form.Text>
            </Form.Group>
          </Col>
        )
      })}
    </Row>

    {formData.enabledSeatTypes.length === 0 && (
      <div className="text-danger mt-2">At least one seat type must be enabled.</div>
    )}
  </Card.Body>
</Card>


                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" disabled={saving} size="lg">
                    {saving ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" className="me-2" />
                        Scheduling Show...
                      </>
                    ) : (
                      "Schedule Show with Custom Pricing"
                    )}
                  </Button>
                  <Button variant="secondary" onClick={() => navigate("/owner/theaters")} disabled={saving}>
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

export default AddShowPage
