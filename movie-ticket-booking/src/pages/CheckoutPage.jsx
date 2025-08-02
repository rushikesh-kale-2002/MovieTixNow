"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { CreditCard, Smartphone, Wallet, CheckCircle } from "lucide-react"
import { useBooking } from "../contexts/BookingContext"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const CheckoutPage = () => {
  const { selectedSeats, createBooking, clearCart } = useBooking()
  const { user, setShowLoginModal } = useAuth()
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    upiId: "",
    walletProvider: "paytm",
  })

  if (!user) {
    return (
      <Container className="py-5 page-with-navbar-padding">
        <Alert variant="warning" className="text-center">
          <h4>Please login to continue</h4>
          <p>You need to be logged in to complete your booking.</p>
          <Button variant="primary" onClick={() => setShowLoginModal(true)}>
            Login Now
          </Button>
        </Alert>
      </Container>
    )
  }

  if (selectedSeats.length === 0) {
    return (
      <Container className="py-5 page-with-navbar-padding">
        <Alert variant="info" className="text-center">
          <h4>No seats selected</h4>
          <p>Please select seats to proceed with booking.</p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Browse Movies
          </Button>
        </Alert>
      </Container>
    )
  }

  const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
  const convenienceFee = Math.round(subtotal * 0.1)
  const totalAmount = subtotal + convenienceFee

  const handlePayment = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create booking
      createBooking({
        movieId: "1", // This should come from context
        showId: "1", // This should come from context
        seats: selectedSeats,
        totalAmount,
      })

      setBookingComplete(true)
    } catch (error) {
      console.error("Payment failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (bookingComplete) {
    return (
      <Container className="py-5 page-with-navbar-padding">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="text-center">
              <Card.Body className="py-5">
                <CheckCircle size={64} className="text-success mb-3" />
                <h2 className="text-success mb-3">Booking Confirmed!</h2>
                <p className="mb-4">
                  Your tickets have been booked successfully. You will receive a confirmation email shortly.
                </p>
                <div className="d-flex gap-3 justify-content-center">
                  <Button variant="primary" onClick={() => navigate("/profile")}>
                    View Bookings
                  </Button>
                  <Button variant="outline-primary" onClick={() => navigate("/")}>
                    Book More Tickets
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container className="py-4 page-with-navbar-padding">
      <Row>
        <Col lg={8} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Payment Details</h5>
            </Card.Header>
            <Card.Body>
              {/* Payment Method Selection */}
              <div className="mb-4">
                <h6 className="mb-3">Select Payment Method</h6>
                <div className="d-flex gap-3 mb-3 flex-wrap">
                  <Button
                    variant={paymentMethod === "card" ? "primary" : "outline-primary"}
                    onClick={() => setPaymentMethod("card")}
                    className="d-flex align-items-center"
                  >
                    <CreditCard size={18} className="me-2" />
                    Card
                  </Button>
                  <Button
                    variant={paymentMethod === "upi" ? "primary" : "outline-primary"}
                    onClick={() => setPaymentMethod("upi")}
                    className="d-flex align-items-center"
                  >
                    <Smartphone size={18} className="me-2" />
                    UPI
                  </Button>
                  <Button
                    variant={paymentMethod === "wallet" ? "primary" : "outline-primary"}
                    onClick={() => setPaymentMethod("wallet")}
                    className="d-flex align-items-center"
                  >
                    <Wallet size={18} className="me-2" />
                    Wallet
                  </Button>
                </div>
              </div>

              <Form onSubmit={handlePayment}>
                {paymentMethod === "card" && (
                  <>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Card Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Cardholder Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="John Doe"
                            value={formData.cardName}
                            onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Expiry Date</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>CVV</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}

                {paymentMethod === "upi" && (
                  <Form.Group className="mb-3">
                    <Form.Label>UPI ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="yourname@upi"
                      value={formData.upiId}
                      onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                      required
                    />
                  </Form.Group>
                )}

                {paymentMethod === "wallet" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Select Wallet</Form.Label>
                    <Form.Select
                      value={formData.walletProvider}
                      onChange={(e) => setFormData({ ...formData, walletProvider: e.target.value })}
                    >
                      <option value="paytm">Paytm</option>
                      <option value="phonepe">PhonePe</option>
                      <option value="googlepay">Google Pay</option>
                      <option value="amazonpay">Amazon Pay</option>
                    </Form.Select>
                  </Form.Group>
                )}

                <Button type="submit" variant="primary" size="lg" className="w-100" disabled={isProcessing}>
                  {isProcessing ? "Processing Payment..." : `Pay ₹${totalAmount}`}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="sticky-top" style={{ top: "100px" }}>
            <Card.Header>
              <h5 className="mb-0">Booking Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <h6>Movie Details</h6>
                <p className="mb-1 fw-semibold">Avengers: Endgame</p>
                <p className="text-muted small mb-0">
                  PVR Cinemas - Phoenix Mall
                  <br />
                  Today, 8:30 PM
                </p>
              </div>

              <div className="mb-3">
                <h6>Selected Seats ({selectedSeats.length})</h6>
                <div className="d-flex flex-wrap gap-1 mb-2">
                  {selectedSeats.map((seat) => (
                    <span key={seat.id} className="badge bg-primary">
                      {seat.row}
                      {seat.number}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Tickets ({selectedSeats.length})</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Convenience Fee</span>
                  <span>₹{convenienceFee}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total Amount</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              <Alert variant="info" className="small">
                <strong>Note:</strong> Tickets once booked cannot be cancelled or refunded.
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CheckoutPage
