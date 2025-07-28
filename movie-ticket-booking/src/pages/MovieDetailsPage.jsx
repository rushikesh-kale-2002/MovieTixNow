"use client"
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import { Play, Star, Clock, Users } from "lucide-react"
import { useBooking } from "../contexts/BookingContext"

const MovieDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { movies } = useBooking()

  const movie = movies.find((m) => m.id === id)

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
    )
  }

  const reviews = [
    { id: 1, user: "John D.", rating: 5, comment: "Amazing movie! Great visual effects and storyline." },
    { id: 2, user: "Sarah M.", rating: 4, comment: "Really enjoyed it. Worth watching in theaters." },
    { id: 3, user: "Mike R.", rating: 5, comment: "Best superhero movie ever made!" },
  ]

  return (
    <Container className="py-4">
      <Row>
        <Col lg={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src={movie.poster} />
            <Card.Body className="text-center">
              <Button
                variant="primary"
                size="lg"
                className="w-100 mb-3"
                onClick={() => navigate(`/movie/${movie.id}/shows`)}
              >
                Book Tickets
              </Button>
              <Button variant="outline-primary" className="w-100">
                <Play size={18} className="me-2" />
                Watch Trailer
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <div className="mb-4">
            <h1 className="display-5 fw-bold mb-3">{movie.title}</h1>

            <div className="d-flex flex-wrap gap-3 mb-4">
              <Badge bg="warning" text="dark" className="fs-6">
                <Star size={16} className="me-1" />
                {movie.rating}/10
              </Badge>
              <Badge bg="info" className="fs-6">
                <Clock size={16} className="me-1" />
                {movie.duration}
              </Badge>
              <Badge bg="success" className="fs-6">
                {movie.language}
              </Badge>
            </div>

            <div className="mb-4">
              <h6 className="text-muted mb-2">Genres</h6>
              <div className="d-flex flex-wrap gap-2">
                {movie.genre.map((g, index) => (
                  <Badge key={index} bg="light" text="dark">
                    {g}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h6 className="text-muted mb-2">Synopsis</h6>
              <p className="lead">{movie.description}</p>
            </div>

            <div className="mb-4">
              <h6 className="text-muted mb-2">Cast</h6>
              <Row>
                {movie.cast.map((actor, index) => (
                  <Col key={index} sm={6} md={4} className="mb-3">
                    <div className="d-flex align-items-center">
                      <img
                        src={`/placeholder.svg?height=50&width=50&query=${actor.replace(" ", "+")}`}
                        alt={actor}
                        className="rounded-circle me-3"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                      <div>
                        <div className="fw-semibold">{actor}</div>
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

      {/* Reviews Section */}
      <Row className="mt-5">
        <Col>
          <h3 className="mb-4">
            <Users size={24} className="me-2" />
            User Reviews
          </h3>

          <Row>
            {reviews.map((review) => (
              <Col key={review.id} md={6} lg={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">{review.user}</h6>
                      <div>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? "text-warning" : "text-muted"}
                            fill={i < review.rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="small text-muted mb-0">{review.comment}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <Button variant="outline-primary">Load More Reviews</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default MovieDetailsPage
