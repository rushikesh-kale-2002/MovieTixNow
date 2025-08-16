import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Card, Button, Spinner, Alert, Row, Col } from "react-bootstrap"
import axios from "axios"
import '../styles/TicketPage.css'

const TicketPage = () => {
  const { bookingId } = useParams()
  console.log("Booking ID:", bookingId);

  const navigate = useNavigate()
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/bookings/${bookingId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        setTicket(response.data)
      } catch (err) {
        console.error("Error fetching ticket:", err)
        setError("Could not fetch ticket details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchTicket()
  }, [bookingId])

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate("/")}>Back to Home</Button>
      </Container>
    )
  }

  if (!ticket) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">No ticket details found.</Alert>
        <Button variant="primary" onClick={() => navigate("/")}>Browse Movies</Button>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
<Card className="ticket-card"
  style={{ backgroundColor: '#afada7ff' }} //f1c166ff
>
  <Card.Header className="text-center">
    <h4>BooKar</h4>
  </Card.Header>

  <div className="perforated-line"></div>

  <Card.Body className="ticket-body-centered">
    <div className="ticket-row">
      <span className="ticket-label">Booking ID:</span>
      <span className="ticket-value">{ticket.id}</span>
    </div>
    <div className="ticket-row">
      <span className="ticket-label">Payment ID:</span>
      <span className="ticket-value">{ticket.paymentId}</span>
    </div>
    <div className="ticket-row">
      <span className="ticket-label">User Name:</span>
      <span className="ticket-value">{ticket.username}</span>
    </div>
    <div className="ticket-row">
      <span className="ticket-label">Movie Name:</span>
      <span className="ticket-value">{ticket.movieName}</span>
    </div>
    <div className="ticket-row">
      <span className="ticket-label">Theatre Name:</span>
      <span className="ticket-value">{ticket.theatreName}</span>
    </div>
    <div className="ticket-row">
      <span className="ticket-label">Show Date:</span>
      <span className="ticket-value">{ticket.movieDate}</span>
    </div>
    <div className="ticket-row">
      <span className="ticket-label">Show Time:</span>
      <span className="ticket-value">{ticket.showTime}</span>
    </div>
    <div className="ticket-row">
      <span className="ticket-label">Seat Numbers:</span>
      <span className="ticket-value">{ticket.seatNumbers?.join(", ")}</span>
    </div>
  </Card.Body>
</Card>

<div className="button-container">
  <Button variant="primary" onClick={() => navigate("/")}>
    Book Another Ticket
  </Button>
</div>



        </Col>
      </Row>
    </Container>
  )
}

export default TicketPage