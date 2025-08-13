import { Container, Row, Col } from "react-bootstrap";
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import appStore from "../../assets/appstore.png";  // add these icons
import googlePlay from "../../assets/googleplay.png";
import "../../styles/Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light pt-5 pb-3 mt-5">
      <Container>
        <Row className="mb-4">
          <Col md={3}>
            <p className="footer-desc">
              Your ultimate destination for movie ticket booking. Experience
              cinema like never before.
            </p>
            <div className="social-icons mt-3">
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
              <a href="#"><Youtube size={20} /></a>
              <a href="#"><Instagram size={20} /></a>
            </div>
          </Col>
          <Col md={2}>
            <h6>Movies</h6>
            <ul className="list-unstyled">
              <li><Link to="/movies/now-showing">Now Showing</Link></li>
              <li><Link to="/movies/coming-soon">Coming Soon</Link></li>
              <li><Link to="/movies/top-rated">Top Rated</Link></li>
              <li><Link to="/movies/genres">Genres</Link></li>
            </ul>
          </Col>
          <Col md={2}>
            <h6>Theaters</h6>
            <ul className="list-unstyled">
              <li><Link to="/theaters/search">Find Theaters</Link></li>
              <li><Link to="/theaters/premium">Premium</Link></li>
              <li><Link to="/theaters/imax">IMAX</Link></li>
              <li><Link to="/theaters/4dx">4DX</Link></li>
            </ul>
          </Col>
          <Col md={2}>
            <h6>Help</h6>
            <ul className="list-unstyled">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
              <li><Link to="/terms-of-use">Terms of Use</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>Mobile App</h6>
            <p>Get the MovieBook app for the best experience</p>
            <div>
              <img src={appStore} alt="App Store" className="store-badge" />
              <img src={googlePlay} alt="Google Play" className="store-badge" />
            </div>
          </Col>
        </Row>
        <hr className="border-secondary" />
        <Row>
          <Col className="text-center small">
            © 2024 MovieBook. All rights reserved. | Made with ❤️ for movie lovers
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
