import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Card, Container, Row, Col, Button, Spinner } from "react-bootstrap"
import { Star } from "lucide-react"

const BASE_IMAGE_URL = "http://localhost:8080" // replace with env var or backend URL

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("query")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const allGenres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Adventure", "Crime"]
  const status = searchParams.get("status")

  useEffect(() => {
    if (!query && query !== "") return

    setLoading(true)
    setError(null)
    console.log("Search query:", searchParams.get("query"));
    console.log("Search URL:", `/search?query=${searchParams.get("query")}`);
    axios
      .get(`/search?query=${encodeURIComponent(query)}${status ? `&status=${status}` : ""}`)
      .then((res) => {
        console.log("Received search results:", res.data);
        if (Array.isArray(res.data)) {
          setResults(res.data)
        } else {
          setResults([])
        }
      })
      .catch(() => {
        setError("Something went wrong while searching.")
        setResults([])
      })
      .finally(() => setLoading(false))
  }, [query, status])

  return (
    <Container className="mt-5 pt-4">
      <h2 className="mb-4">
        Search Results for: <strong>{query}</strong>
      </h2>
      {/* <Button
        variant="outline-success"
        onClick={() => navigate(`/search?query=${query}&status=TRENDING`)}
      >
        Trending
      </Button>
      <Button
        variant="outline-warning"
        onClick={() => navigate(`/search?query=${query}&status=UPCOMING`)}
      >
        Upcoming
      </Button> */}

      {/* Genre Buttons */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {allGenres.map((genre, index) => (
              <Button
                key={index}
                variant={query?.toLowerCase() === genre.toLowerCase() ? "primary" : "outline-primary"}
                size="sm"
                onClick={() => navigate(`/search?query=${genre}`)}
              >
                {genre}
              </Button>
            ))}
          </div>
        </Col>
      </Row>

      {loading && (
        <div className="d-flex align-items-center gap-2 mb-3">
          <Spinner animation="border" size="sm" />
          <span>Loading...</span>
        </div>
      )}

      {error && <div className="text-danger mb-3">{error}</div>}

      {!loading && Array.isArray(results) && results.length === 0 && (
        <div>No results found.</div>
      )}

      <Row>
        {Array.isArray(results) &&
          results.map((item, index) => {
            if (item.type === "movie" && item.movieDetails) {
              const movie = item.movieDetails

              return (
                <Col key={`movie-${index}`} lg={3} md={4} sm={6} className="mb-4">
                  <Card className="movie-card h-100">
                    <div className="position-relative">
                      <img
                        src={movie.posterUrl || "/placeholder.svg"}
                        alt={movie.title}
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-warning text-dark">
                          <Star size={12} className="me-1" />
                          {movie.rating}
                        </span>
                      </div>
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="h6 mb-2">{movie.title}</Card.Title>
                      <div className="mt-2">
                        {movie.genres?.map((genre, idx) => (
                          <span key={idx} className="badge bg-secondary me-1">
                            {genre.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                          </span>
                        ))}
                      </div>
                      <div className="small text-muted mb-3">
                        <span className="me-3">{movie.language}</span>{movie.duration}
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        className="mt-auto"
                        onClick={() => navigate(`/movie/${movie.id}`)}
                      >
                        Book Now
                      </Button>
                      <div className="position-absolute bottom-0 start-0 m-2">
                        <span className="badge bg-info text-dark">
                          {movie.status === "TRENDING" ? "Trending" : "Upcoming"}
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              )
            }

            // Theater rendering removed as per request:
            // if (item.type === "theater" && item.theaterDetails) { ... }

            return null
          })}
      </Row>
    </Container>
  )
}

export default SearchPage
