
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useBooking } from "../contexts/BookingContext";
import SeatLayout from "../components/layout/SeatLayout";
import "../styles/SeatLayout.css";

import {
  fetchMovieDetails,
  fetchShowDetails,
  fetchSeatsForShow,
  reserveSeats,
} from "../services/seatSelectionApi";

const SeatSelectionPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { selectedSeats, addToCart, removeFromCart } = useBooking();

  const theaterId = searchParams.get("theater");
  const showId = searchParams.get("show");

  const [seats, setSeats] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  const [reservationId, setReservationId] = useState(null);
  const [reservationExpiresAt, setReservationExpiresAt] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movie");
      }
    };
    if (id) loadMovie();
  }, [id]);

  useEffect(() => {
    const loadShowDetails = async () => {
      try {
        const data = await fetchShowDetails(showId);
        setShowDetails(data);
      } catch (err) {
        console.error("Failed to fetch show details:", err);
      }
    };
    if (showId) loadShowDetails();
  }, [showId]);

  useEffect(() => {
    const loadSeats = async () => {
      try {
        setLoading(true);
        console.log(showId, theaterId)
        const flat = await fetchSeatsForShow(showId, theaterId);

       
        console.log("Fetched seat data (flat):", flat);

       
        const grouped = flat.reduce((acc, s) => {
          if (!acc[s.row]) acc[s.row] = [];
          acc[s.row].push(s);
          return acc;
        }, {});

       
        const rows2D = Object.keys(grouped)
          .sort()
          .map((r) => grouped[r]);

        setSeats(rows2D);
      } catch (e) {
        console.error("Failed to fetch seats:", e);
        setError(e?.message || "Failed to load seats");
      } finally {
        setLoading(false);
      }
    };

    if (showId && theaterId) loadSeats();
  }, [showId, theaterId]);

  const handleSeatClick = (seat) => {
    if (seat.status === "booked" || seat.status === "unavailable" || seat.status === "reserved")
      return;

    const newSeats = seats.map((row) =>
      row.map((s) => {
        if (s.id === seat.id) {
          const newStatus = s.status === "selected" ? "available" : "selected";
          if (newStatus === "selected") {
            addToCart(s);
          } else {
            removeFromCart(s.id);
          }
          return { ...s, status: newStatus };
        }
        return s;
      })
    );
    setSeats(newSeats);
  };

  const handleProceedToPayment = async () => {
    const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const selectedSeatCount = selectedSeats.length;
    if (selectedSeatCount === 0) return;

    try {
      const payload = {
        showId: parseInt(showId),
        userId: 1, // TODO: replace with actual user ID from auth context
        showSeatIds: selectedSeats.map((s) => s.showSeatId),
        totalAmount,
      };

      console.log("Reservation Payload:", payload);

      const data = await reserveSeats(payload);

      console.log("Reservation Response:", data);

      setReservationId(data.reservationId);
      setReservationExpiresAt(data.expiresAt);

      const updated = seats.map((row) =>
        row.map((s) => (selectedSeats.find((sel) => sel.id === s.id) ? { ...s, status: "reserved" } : s))
      );
      setSeats(updated);

      navigate(`/checkout?reservation=${data.reservationId}`);
    } catch (e) {
      console.error("Reservation failed:", e);
      alert("Unable to reserve seats. Please try again.");
    }
  };

  if (loading)
    return (
      <Container className="py-5">
        <Alert variant="info">Loading seats…</Alert>
      </Container>
    );
  if (error)
    return (
      <Container className="py-5">
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  if (!movie)
    return (
      <Container className="py-5">
        <h2>Movie not found</h2>
      </Container>
    );

  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const selectedSeatCount = selectedSeats.length;

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center mb-3">
            <img
              src={movie.posterUrl || "/placeholder.svg"}
              alt={movie.title}
              style={{ width: "60px", height: "80px", objectFit: "cover" }}
              className="rounded me-3"
            />
            <div>
              <h2 className="mb-1">{movie.title}</h2>
              {showDetails ? (
                <p className="text-muted mb-0">
                  {showDetails.theaterName} - {showDetails.theaterAddress} |{" "}
                  {new Date(showDetails.showDate).toLocaleDateString()} @ {showDetails.startTime}
                </p>
              ) : (
                <p className="text-muted mb-0">Loading show info...</p>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={8} className="mb-4">
          <Card>
            <Card.Body>
              <SeatLayout seats={seats} onSeatClick={handleSeatClick} selectedSeats={selectedSeats} />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="sticky-top" style={{ top: "100px" }}>
            <Card.Header>
              <h5 className="mb-0">Booking Summary</h5>
            </Card.Header>
            <Card.Body>
              {selectedSeatCount === 0 ? (
                <Alert variant="info">Please select seats to continue</Alert>
              ) : (
                <>
                  <div className="mb-3">
                    <h6>Selected Seats ({selectedSeatCount})</h6>
                    <div className="d-flex flex-wrap gap-1">
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
                      <span>Tickets ({selectedSeatCount})</span>
                      <span>₹{totalAmount}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Convenience Fee</span>
                      <span>₹{Math.round(totalAmount * 0.1)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-bold">
                      <span>Total Amount</span>
                      <span>₹{totalAmount + Math.round(totalAmount * 0.1)}</span>
                    </div>
                  </div>

                  <Button
                    variant="warning"
                    size="lg"
                    className="w-100"
                    onClick={handleProceedToPayment}
                    disabled={selectedSeatCount === 0}
                  >
                    Proceed to Payment
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SeatSelectionPage;

