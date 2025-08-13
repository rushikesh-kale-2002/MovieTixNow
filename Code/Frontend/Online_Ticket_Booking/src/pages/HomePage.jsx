import { useEffect, useState } from "react"
import axios from "axios"
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap"
import { Play, Star, Calendar } from "lucide-react"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const [trendingRes, upcomingRes] = await Promise.all([
                    axios.get("http://localhost:8080/user/movies/status/TRENDING"),
                    axios.get("http://localhost:8080/user/movies/status/UPCOMING"),
                ]);
                setTrendingMovies(trendingRes.data.slice(0, 4));
                setUpcomingMovies(upcomingRes.data.slice(0, 4));
            } catch (err) {
                console.error("Error fetching movies", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);


    const featuredMovies = trendingMovies.slice(0, 3)


    if (loading) {
        return <div className="text-center mt-5">Loading...</div>
    }

    return (
        <div>
            {/* Hero Section */}
            <section className="hero-section">
                <Container>
                    <Carousel className="mb-4 custom-carousel">
                        {featuredMovies.map(movie => (
                            <Carousel.Item key={movie.movieId}>
                                <Row className="align-items-center">
                                    <Col md={6}>
                                        <h1 className="display-4 fw-bold mb-3">{movie.title}</h1>
                                        <p className="lead mb-4">{movie.description}</p>
                                        <div className="d-flex gap-3 mb-4">
                                            <span className="badge bg-warning text-dark">
                                                <Star size={14} className="me-1" />{movie.rating}
                                            </span>
                                            <span className="badge bg-info">{movie.duration}</span>
                                            <span className="badge bg-success">{movie.language}</span>
                                        </div>
                                        <div className="d-flex gap-3">
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                className="mt-auto"
                                                onClick={() => navigate(`/movie/${movie.movieId}`)}
                                            >
                                                Book Now
                                            </Button>
                                            <Button variant="outline-light" size="lg">
                                                <Play size={20} className="me-2" />Watch Trailer
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <img
                                            src={movie.posterUrl || "/placeholder.svg"}
                                            alt={movie.title}
                                            className="img-fluid rounded shadow-lg"
                                            style={{ height: "400px", width: "50%", objectFit: "cover", borderRadius: "15px" }}
                                        />
                                    </Col>
                                </Row>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Container>
            </section>

            <Container>
                {/* Quick Filters */}
                <Row className="mb-5">
                    <Col>
                        <div className="d-flex flex-wrap gap-2 justify-content-center">
                            <Button variant="outline-primary" size="sm" onClick={() => navigate(`/search?query=Action`)}>Action</Button>
                            <Button variant="outline-primary" size="sm" onClick={() => navigate(`/search?query=Comedy`)}>Comedy</Button>
                            <Button variant="outline-primary" size="sm" onClick={() => navigate(`/search?query=Drama`)}>Drama</Button>
                            <Button variant="outline-primary" size="sm" onClick={() => navigate(`/search?query=Horror`)}>Horror</Button>
                            <Button variant="outline-primary" size="sm" onClick={() => navigate(`/search?query=Sci-Fi`)}>Sci-Fi</Button>
                            <Button variant="outline-primary" size="sm" onClick={() => navigate(`/search?query=Adventure`)}>Adventure</Button>
                            <Button variant="outline-primary" size="sm" onClick={() => navigate(`/search?query=Crime`)}>Crime</Button>

                        </div>
                    </Col>
                </Row>

                {/* Trending Movies */}
                <section className="mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bold">Trending Movies</h2>
                        <Button variant="outline-primary" onClick={() => navigate("/search?query=&status=TRENDING")}>

                            View All
                        </Button>

                    </div>
                    <Row>
                        {trendingMovies.map(movie => (
                            <Col key={movie.movieId} lg={3} md={4} sm={6} className="mb-4">
                                <Card className="movie-card h-100">
                                    <div className="position-relative">
                                        <Card.Img variant="top" src={movie.posterUrl || "/placeholder.svg"} className="movie-poster" />
                                        <div className="position-absolute top-0 end-0 m-2">
                                            <span className="badge bg-warning text-dark">
                                                <Star size={12} className="me-1" />{movie.rating}
                                            </span>
                                        </div>
                                    </div>
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title className="h6 mb-2">{movie.title}</Card.Title>
                                        <div className="mb-2">
                                            {Array.isArray(movie.genres) && movie.genres.map((g, idx) => (
                                                <span key={idx} className="badge bg-secondary me-1">{g.name || g}</span>
                                            ))}
                                        </div>
                                        <div className="small text-muted mb-3">
                                            <span className="me-3">{movie.language}</span>{movie.duration}
                                        </div>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="mt-auto"
                                            onClick={() => navigate(`/movie/${movie.movieId}`)}
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
                        <Button variant="outline-primary" onClick={() => navigate("/search?query=&status=UPCOMING")}>

                            View All
                        </Button>

                    </div>
                    <Row>
                        {upcomingMovies.map(movie => (
                            <Col key={movie.movieId} lg={3} md={4} sm={6} className="mb-4">
                                <Card className="movie-card h-100">
                                    <div className="position-relative">
                                        <Card.Img variant="top" src={movie.posterUrl || "/placeholder.svg"} className="movie-poster" />
                                        <div className="position-absolute top-0 start-0 m-2">
                                            <span className="badge bg-primary">
                                                <Calendar size={12} className="me-1" />Coming Soon
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
            </Container>
        </div>
    )
}

export default HomePage
