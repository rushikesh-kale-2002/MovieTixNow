"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Badge } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import { fetchTheaterById, fetchLayoutByTheaterId ,addLayout } from "../services/api"

const LayoutPage = () => {
  const { theaterId } = useParams()
  const navigate = useNavigate()
  const [theater, setTheater] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [alert, setAlert] = useState(null)
  const [layoutData, setLayoutData] = useState([]);

  
  const [rows, setRows] = useState(10)
  const [columns, setColumns] = useState(12)
  const [seats, setSeats] = useState([])

  
  const SEAT_TYPES = {
    EXECUTIVE: { label: "Executive", color: "#28a745" },
    PREMIUM: { label: "Premium", color: "#ffc107" },
    VIP: { label: "VIP", color: "#dc3545" },
    DISABLED: { label: "Disabled", color: "#6c757d" },
  }

  useEffect(() => {
    const loadLayout = async () => {
      const data = await fetchLayoutByTheaterId(theaterId);
      setLayoutData(data);
    };

    loadLayout();
  }, [theaterId]);


  const getMaxRow = (layout) => {
    const rowLabels = layout
  .map((s) => s.rowLabel)
  .filter(label => typeof label === 'string' && label.length > 0)
  .map(label => label.charCodeAt(0) - 65)
    return Math.max(...rowLabels) + 1
  }
  
  const getMaxColumn = (layout) => {
    return Math.max(...layout.map((s) => s.seatNumber))
  }



  useEffect(() => {
    const loadTheater = async () => {
      try {
        const theaterData = await fetchTheaterById(theaterId)
        setTheater(theaterData)
        if (layoutData?.length > 0) {
          setRows(getMaxRow(layoutData))
          setColumns(getMaxColumn(layoutData))
          setSeats(
            

            layoutData.map((seat) => ({
              id: `${seat.rowLabel}-${seat.seatNumber}`,
              rowLabel: seat.rowLabel,
              seatNumber: seat.seatNumber,
              type: seat.type,
            }))
          )
        } else {
          generateInitialLayout(10, 12)
        }
      } catch (error) {
        console.error("Error loading theater:", error)
        setAlert({ type: "danger", message: "Failed to load theater data" })
      } finally {
        setLoading(false)
      }
    }

    loadTheater()
  }, [theaterId])

  const generateRowLabel = (index) => {
    return String.fromCharCode(65 + index) // A, B, C, etc.
  }

  const generateInitialLayout = (numRows, numColumns) => {
    const newSeats = []
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numColumns; c++) {
        newSeats.push({
          id: `${r}-${c}`,
          row: generateRowLabel(r),
          number: c + 1,
          type: "EXECUTIVE",
          status: "AVAILABLE",
        })
      }
    }
    setSeats(newSeats)
  }

  const handleLayoutChange = (newRows, newColumns) => {
    setRows(newRows)
    setColumns(newColumns)
    generateInitialLayout(newRows, newColumns)
  }

  const toggleSeatType = (seatId) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) => {
        if (seat.id === seatId) {
          const types = Object.keys(SEAT_TYPES)
          const currentIndex = types.indexOf(seat.type)
          const nextIndex = (currentIndex + 1) % types.length
          const newType = types[nextIndex]

          return {
            ...seat,
            type: newType,
            
          }
        }
        return seat
      }),
    )
  }

  const handleSave = async () => {
    setSaving(true)
    setAlert(null)

    try {
      const layoutData = seats.map((seat) => ({
        rowLabel: seat.row,
        seatNumber: seat.number,
        type: seat.type,
        // status: seat.status,
      }))

      const result = await addLayout(theaterId, { layout: layoutData })
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

  const renderSeatGrid = () => {
    const seatsByRow = {}
    seats.forEach((seat) => {
      if (!seatsByRow[seat.row]) {
        seatsByRow[seat.row] = []
      }
      seatsByRow[seat.row].push(seat)
    })

    return (
      <div className="seat-layout-editor">
        <div className="screen-indicator mb-4">
          <div className="bg-dark text-white text-center py-2 rounded" style={{ maxWidth: "300px", margin: "0 auto" }}>
            <small>SCREEN</small>
          </div>
        </div>

        <div className="seating-area">
          {Object.keys(seatsByRow)
            .sort()
            .map((rowLabel) => (
              <div key={rowLabel} className="seat-row d-flex align-items-center justify-content-center mb-2">
                <div className="row-label me-3" style={{ minWidth: "30px", textAlign: "center", fontWeight: "bold" }}>
                  {rowLabel}
                </div>
                <div className="seats-container d-flex gap-1">
                  {seatsByRow[rowLabel]
                    .sort((a, b) => a.number - b.number)
                    .map((seat) => (
                      <button
                        key={seat.id}
                        className="seat-button border-0 rounded"
                        style={{
                          width: "35px",
                          height: "35px",
                          backgroundColor: SEAT_TYPES[seat.type].color,
                          color: seat.type === "PREMIUM" ? "#000" : "#fff",
                          fontSize: "12px",
                          cursor: "pointer",
                          opacity: seat.type === "DISABLED" ? 0.5 : 1,
                        }}
                        onClick={() => toggleSeatType(seat.id)}
                        title={`${seat.row}${seat.number} - ${SEAT_TYPES[seat.type].label}`}
                      >
                        {seat.number}
                      </button>
                    ))}
                </div>
                <div className="row-label ms-3" style={{ minWidth: "30px", textAlign: "center", fontWeight: "bold" }}>
                  {rowLabel}
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  }

  const getSeatCounts = () => {
    const counts = { EXECUTIVE: 0, PREMIUM: 0, VIP: 0, DISABLED: 0 }
    seats.forEach((seat) => {
      counts[seat.type]++
    })
    return counts
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

  const seatCounts = getSeatCounts()

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 >Configure Seat Layout - {theater?.name}</h1>
          <p className="text-muted">
            {theater?.address}, {theater?.city}
          </p>
          <Alert variant="info" className="mb-3">
            <strong>Note</strong> This layout defines seat types and positions.
          </Alert>
        </Col>
      </Row>

      {alert && (
        <Alert variant={alert.type} className="mb-4">
          {alert.message}
        </Alert>
      )}

      <Row>
        <Col lg={4}>
          <Card className="mb-4">
            <Card.Header>
              <h5>Layout Configuration</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Number of Rows</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="20"
                  value={rows}
                  onChange={(e) => handleLayoutChange(Number.parseInt(e.target.value) || 1, columns)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Seats per Row</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="30"
                  value={columns}
                  onChange={(e) => handleLayoutChange(rows, Number.parseInt(e.target.value) || 1)}
                />
              </Form.Group>

              <div className="mb-3">
                <h6>Seat Summary</h6>
                <div className="d-flex flex-wrap gap-2">
                  <Badge bg="success">Executive: {seatCounts.EXECUTIVE}</Badge>
                  <Badge bg="warning" text="dark">
                    Premium: {seatCounts.PREMIUM}
                  </Badge>
                  <Badge bg="danger">VIP: {seatCounts.VIP}</Badge>
                  <Badge bg="secondary">Disabled: {seatCounts.DISABLED}</Badge>
                </div>
                <small className="text-muted">Total: {seats.length} seats</small>
              </div>

              <div className="d-grid gap-2">
                <Button variant="primary" onClick={handleSave} disabled={saving} size="lg">
                 SAVE LAYOUT
                </Button>
                <Button variant="secondary" onClick={() => navigate("/owner/theaters")} disabled={saving}>
                  Back to Theaters
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Legend */}
          <Card>
            <Card.Header>
              <h6>Seat Type Legend</h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex flex-column gap-2">
                {Object.entries(SEAT_TYPES).map(([type, config]) => (
                  <div key={type} className="d-flex align-items-center gap-2">
                    <div
                      className="rounded"
                      style={{
                        width: "25px",
                        height: "25px",
                        backgroundColor: config.color,
                        opacity: type === "DISABLED" ? 0.5 : 1,
                      }}
                    ></div>
                    <div>
                      <div className="fw-bold">{config.label}</div>
                      <small className="text-muted">
                        {type === "DISABLED" ? "Not available for booking" : "Pricing set per show"}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <small className="text-muted">
                <strong>Instructions:</strong> Click on any seat to cycle through types: Executive → Premium → VIP →
                Disabled
              </small>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card>
            <Card.Header>
              <h5>Layout Preview</h5>
              <small className="text-muted">Click seats to change their type</small>
            </Card.Header>
            <Card.Body>{renderSeatGrid()}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LayoutPage
