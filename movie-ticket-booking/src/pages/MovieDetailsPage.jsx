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
    <Container className="movie-details-page py-4 page-with-navbar-padding">
      <Row>
        <Col lg={4} className="mb-4">
          <Card className="movie-poster-card">
            <Card.Img variant="top" src={movie.poster || "/placeholder.svg?height=600&width=400&query=movie+poster"} />
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
          <div className="movie-info">
            <h1 className="movie-title">{movie.title}</h1>

            <div className="movie-badges">
              <Badge bg="warning" text="dark" className="rating-badge">
                <Star size={16} className="me-1" />
                {movie.rating}/10
              </Badge>
              <Badge bg="info" className="duration-badge">
                <Clock size={16} className="me-1" />
                {movie.duration}
              </Badge>
              <Badge bg="success" className="language-badge">
                {movie.language}
              </Badge>
            </div>

            <div className="movie-genres">
              <h6 className="section-subtitle">Genres</h6>
              <div className="genre-tags">
                {movie.genre.map((g, index) => (
                  <Badge key={index} bg="light" text="dark" className="me-2 mb-2">
                    {g}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="movie-synopsis">
              <h6 className="section-subtitle">Synopsis</h6>
              <p className="synopsis-text">{movie.description}</p>
            </div>

            <div className="movie-cast">
              <h6 className="section-subtitle">Cast</h6>
              <Row>
                {movie.cast.map((actor, index) => (
                  <Col key={index} sm={6} md={4} className="mb-3">
                    <div className="cast-member">
                      <img
                        src={`/placeholder.svg?height=50&width=50&query=${actor.replace(" ", "+")}`}
                        alt={actor}
                        className="cast-avatar"
                      />
                      <div className="cast-info">
                        <div className="cast-name">{actor}</div>
                        <small className="cast-role">Actor</small>
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
      <Row className="reviews-section">
        <Col>
          <h3 className="reviews-title">
            <Users size={24} className="me-2" />
            User Reviews
          </h3>

          <Row>
            {reviews.map((review) => (
              <Col key={review.id} md={6} lg={4} className="mb-4">
                <Card className="review-card">
                  <Card.Body>
                    <div className="review-header">
                      <h6 className="reviewer-name">{review.user}</h6>
                      <div className="review-rating">
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
                    <p className="review-comment">{review.comment}</p>
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
