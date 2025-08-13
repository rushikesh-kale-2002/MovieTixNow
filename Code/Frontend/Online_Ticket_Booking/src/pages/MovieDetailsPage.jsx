"use client";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert, Placeholder } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Star, Clock } from "lucide-react";
import axios from "axios";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/movies/details/${id}`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.status === 404 ? "Movie not found" : "Something went wrong");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5">
        <Row>
          <Col lg={4}>
            <Placeholder as={Card} animation="glow" className="w-100" style={{ height: "500px" }}>
              <Placeholder xs={12} style={{ height: "100%" }} />
            </Placeholder>
          </Col>
          <Col lg={8}>
            <Placeholder as="h1" animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={8} /> <Placeholder xs={4} />
            </Placeholder>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={12} />
              <Placeholder xs={10} />
              <Placeholder xs={8} />
            </Placeholder>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate("")}>
          Back to Home
        </Button>
      </Container>
    );
  }

  const { posterUrl, title, rating, duration,trailerUrl, language, genres, description, cast } = movie;

  return (
    <Container className="py-4">
      <Row>
        {/* Left Section - Poster */}
        <Col lg={4} className="mb-4">
          <Card>
            <Card.Img
              variant="top"
              src={posterUrl || "/placeholder.svg"}
              alt={title}
              style={{ objectFit: "cover", height: "100%" }}
            />
            <Card.Body className="text-center">
              <Button
                variant="primary"
                size="lg"
                className="w-100 mb-3"
                onClick={() => navigate(`/movie/${id}/shows`)}
              >
                Book Tickets
              </Button>
              <Button variant="outline-primary" className="w-100"
               onClick={() => window.open(trailerUrl, "_blank")}
              >
                <Play size={18} className="me-2" />
                Watch Trailer
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Section - Details */}
        <Col lg={8}>
          <div className="mb-4">
            <h1 className="display-5 fw-bold mb-3">{title}</h1>

            <div className="d-flex flex-wrap gap-3 mb-4">
              <Badge bg="warning" text="dark" className="fs-6">
                <Star size={16} className="me-1" />
                {rating ?? "N/A"}/10
              </Badge>
              <Badge bg="info" className="fs-6">
                <Clock size={16} className="me-1" />
                {duration}
              </Badge>
              <Badge bg="success" className="fs-6">
                {language}
              </Badge>
            </div>

          <div className="mb-4">
              <h6 className="text-muted mb-2">Genres</h6>
                 <div className="d-flex flex-wrap gap-2">
                     {genres?.map((g, idx) => (
                        <Badge key={idx} bg="light" text="dark">
                           {g}
                        </Badge>
                      ))}
                  </div>
          </div>

            <div className="mb-4">
              <h6 className="text-muted mb-2">Synopsis</h6>
              <p className="lead">{description}</p>
            </div>

            {/* ✅ Cast Section with Images */}
            <div className="mb-4">
              <h6 className="text-muted mb-2">Cast</h6>
              <Row>
                {cast?.map((actor, idx) => (
                  <Col key={idx} sm={6} md={4} className="mb-3">
                    <div className="d-flex align-items-center">
                      <img
                        src={actor.photoUrl || "/placeholder.svg"}
                        alt={actor.name}
                        className="rounded-circle me-3"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                      <div>
                        <div className="fw-semibold">{actor.name}</div>
                        <small className="text-muted">Actor</small>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailsPage;
