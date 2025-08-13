import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock } from "lucide-react";

import { fetchMovieDetailsForShow, fetchMovieLocations, fetchTheatersAndShows } from "../services/showApi";

const ShowSelectionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [theaters, setTheaters] = useState([]);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split("T")[0];
  });

  useEffect(() => {
    fetchMovieDetailsForShow(id)
      .then(setMovie)
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    fetchMovieLocations(id)
      .then((data) => {
        setLocations(data);
        setSelectedLocation(data[0] || "");
      })
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!selectedLocation || !selectedDate) return;
    fetchTheatersAndShows(id, selectedDate, selectedLocation)
      .then(setTheaters)
      .catch(console.error);
  }, [id, selectedDate, selectedLocation]);

  const handleShowSelect = (theaterId, showId) => {
    navigate(`/movie/${id}/seats?theater=${theaterId}&show=${showId}`);
  };

  if (!movie) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Movie not found</h2>
          <Button variant="primary" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Movie Info */}
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
              <p className="text-muted mb-0">
                {(Array.isArray(movie.genres) ? movie.genres.join(", ") : movie.genres)} • {movie.duration}
              </p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Location & Date Filters */}
      <Row className="mb-4">
        <Col md={6} className="mb-3">
          <Form.Group>
            <Form.Label className="d-flex align-items-center">
              <MapPin size={18} className="me-2" />
              Select Location
            </Form.Label>
            <Form.Select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6} className="mb-3">
          <Form.Group>
            <Form.Label className="d-flex align-items-center">
              <Calendar size={18} className="me-2" />
              Select Date
            </Form.Label>
            <Form.Select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
              {dates.map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Show List */}
      <Row>
        <Col>
          <h4 className="mb-4">Available Shows in {selectedLocation}</h4>

          {theaters.map((theater) => (
            <Card key={theater.theaterId} className="mb-4">
              <Card.Body>
                <Row>
                  <Col md={4} className="mb-3 mb-md-0">
                    <h5 className="mb-1">{theater.theaterName}</h5>
                    <p className="text-muted small mb-0">
                      <MapPin size={15} className="me-1" />
                      {theater.theaterAddress}
                    </p>
                  </Col>

                  <Col md={8}>
                    <div className="d-flex flex-wrap gap-2">
                      {theater.shows.map((show) => (
                        <Button
                          key={show.showId}
                          variant={!show.isAvailable ? "outline-primary" : "outline-secondary"}
                          size="sm"
                          disabled={show.isAvailable}
                          onClick={() => handleShowSelect(theater.theaterId, show.showId)}
                          className="d-flex flex-column align-items-center p-2"
                          style={{ minWidth: "80px" }}
                        >
                          <div className="d-flex align-items-center mb-1">
                            <Clock size={14} className="me-1" />
                            <small className="fw-semibold text-success" style={{ fontSize: "1rem" }}>
                              {show.startTime}
                            </small>
                          </div>
                          {show.isAvailable && <small className="text-danger">Sold Out</small>}
                        </Button>
                      ))}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}

          {theaters.length === 0 && (
            <Card>
              <Card.Body className="text-center py-5">
                <h5>No shows available</h5>
                <p className="text-muted">
                  No shows found for {movie.title} in {selectedLocation} on{" "}
                  {new Date(selectedDate).toLocaleDateString()}
                </p>
                <Button variant="primary" onClick={() => navigate(`/movie/${id}`)}>
                  Back to Movie Details
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ShowSelectionPage;
