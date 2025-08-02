"use client"
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap"
import { Play, Star, Calendar, MapPin } from "lucide-react"
import { useBooking } from "../contexts/BookingContext"
import { useNavigate } from "react-router-dom"
import GenreSidebar from "../components/layout/GenreSidebar"

const HomePage = () => {
  const { movies } = useBooking()
  const navigate = useNavigate()

  const featuredMovies = movies.slice(0, 3)
  const trendingMovies = movies
  const upcomingMovies = [
    {
      id: "4",
      title: "Doctor Strange 2",
      poster: "/doctorstrange.jpeg?height=400&width=300",
      releaseDate: "2025-08-06",
    },
    {
      id: "5",
      title: "Thor: Love and Thunder",
      poster: "/thor.jpeg?height=400&width=300",
      releaseDate: "2025-08-08",
    },
  ]

  return (
    <div className="homepage-main-content">
      {/* Hero Section */}
      <section style={{ margin: 0, padding: 0 }}>
        <div className="compact-hero-section" style={{ marginTop: 0, paddingTop: "1.5rem" }}>
          <Container fluid>
            <div className="compact-hero-wrapper">
              <Carousel
                className="compact-hero-carousel"
                controls={true}
                indicators={true}
                interval={5000}
                fade={false}
              >
                {featuredMovies.map((movie) => (
                  <Carousel.Item key={movie.id}>
                    <Container>
                      <Row className="compact-hero-content align-items-center h-100">
                        <Col md={7} className="pe-md-3">
                          <h2 className="compact-hero-title">{movie.title}</h2>
                          <p className="compact-hero-description">{movie.description}</p>
                          <div className="d-flex flex-wrap gap-1 mb-3">
                            <span className="badge bg-warning text-dark compact-badge">
                              <Star size={12} className="me-1" />
                              {movie.rating}
                            </span>
                            <span className="badge bg-info compact-badge">{movie.duration}</span>
                            <span className="badge bg-success compact-badge">{movie.language}</span>
                          </div>
                          <div className="d-flex flex-wrap gap-2">
                            <Button
                              variant="danger"
                              size="sm"
                              className="compact-btn"
                              onClick={() => navigate(`/movie/${movie.id}`)}
                            >
                              Book Now
                            </Button>
                            <Button variant="outline-light" size="sm" className="compact-btn">
                              <Play size={14} className="me-1" />
                              Trailer
                            </Button>
                          </div>
                        </Col>
                        <Col md={5} className="text-center">
                          <div className="compact-poster-container">
                            <img
                              src={movie.poster || "/placeholder.svg"}
                              alt={movie.title}
                              className="compact-hero-poster"
                            />
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </Container>
        </div>
      </section>

      {/* Content Container */}
      <Container style={{ paddingTop: "2rem" }}>
        {/* Trending Movies */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Trending Movies</h2>
            <Button variant="outline-primary">View All</Button>
          </div>

          <Row>
            {trendingMovies.map((movie) => (
              <Col key={movie.id} lg={3} md={4} sm={6} className="mb-4">
                <Card className="movie-card h-100">
                  <div className="position-relative">
                    <Card.Img variant="top" src={movie.poster} className="movie-poster" />
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-warning text-dark">
                        <Star size={12} className="me-1" />
                        {movie.rating}
                      </span>
                    </div>
                  </div>

                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="h6 mb-2">{movie.title}</Card.Title>
                    <div className="mb-2">
                      {movie.genre.slice(0, 2).map((g, index) => (
                        <span key={index} className="badge bg-light text-dark me-1 small">
                          {g}
                        </span>
                      ))}
                    </div>
                    <div className="small text-muted mb-3">
                      <span className="me-3">{movie.language}</span>
                      <span>{movie.duration}</span>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      className="mt-auto"
                      onClick={() => navigate(`/movie/${movie.id}`)}
                    >
                      Book Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Upcoming Movies */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Coming Soon</h2>
            <Button variant="outline-primary">View All</Button>
          </div>

          <Row>
            {upcomingMovies.map((movie) => (
              <Col key={movie.id} lg={3} md={4} sm={6} className="mb-4">
                <Card className="movie-card h-100">
                  <div className="position-relative">
                    <Card.Img variant="top" src={movie.poster} className="movie-poster" />
                    <div className="position-absolute top-0 start-0 m-2">
                      <span className="badge bg-primary">
                        <Calendar size={12} className="me-1" />
                        Coming Soon
                      </span>
                    </div>
                  </div>

                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="h6 mb-2">{movie.title}</Card.Title>
                    <div className="small text-muted mb-3">
                      Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
                    </div>
                    <Button variant="outline-primary" size="sm" className="mt-auto">
                      Notify Me
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Location Selector */}
        <section className="mb-5">
          <Card className="bg-light">
            <Card.Body className="text-center py-5">
              <MapPin size={48} className="text-primary mb-3" />
              <h3 className="mb-3">Find Movies Near You</h3>
              <p className="text-muted mb-4">Select your city to see movies playing in theaters near you</p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Button variant="outline-primary">Mumbai</Button>
                <Button variant="outline-primary">Delhi</Button>
                <Button variant="outline-primary">Bangalore</Button>
                <Button variant="outline-primary">Chennai</Button>
                <Button variant="outline-primary">Hyderabad</Button>
                <Button variant="primary">View All Cities</Button>
              </div>
            </Card.Body>
          </Card>
        </section>
      </Container>
    </div>
  )
}

export default HomePage
