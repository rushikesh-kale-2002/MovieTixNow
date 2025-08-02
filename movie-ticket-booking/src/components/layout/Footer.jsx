import { Container, Row, Col } from "react-bootstrap"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

const Footer = ({ sidebarOpen }) => {
  return (
    <footer className={`footer-custom ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Container>
        <Row>
          <Col md={3} className="mb-4">
            <h5 className="text-danger fw-bold mb-3">MovieTixNow</h5>
            <p className="text-light">
              Your ultimate destination for movie ticket booking. Experience cinema like never before.
            </p>
            <div className="d-flex gap-3">
              <Facebook size={20} className="text-light" style={{ cursor: "pointer" }} />
              <Twitter size={20} className="text-light" style={{ cursor: "pointer" }} />
              <Instagram size={20} className="text-light" style={{ cursor: "pointer" }} />
              <Youtube size={20} className="text-light" style={{ cursor: "pointer" }} />
            </div>
          </Col>

          <Col md={2} className="mb-4">
            <h6 className="text-light mb-3">Movies</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Now Showing
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Coming Soon
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Top Rated
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Genres
                </a>
              </li>
            </ul>
          </Col>

          <Col md={2} className="mb-4">
            <h6 className="text-light mb-3">Theaters</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Find Theaters
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Premium
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  IMAX
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  4DX
                </a>
              </li>
            </ul>
          </Col>

          <Col md={2} className="mb-4">
            <h6 className="text-light mb-3">Support</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </Col>

          <Col md={3} className="mb-4">
            {/* <h6 className="text-light mb-3">Download App</h6>
            <p className="text-light small">Get the MovieBook app for the best mobile experience</p> */}
            <div className="d-flex flex-column gap-2">
              {/* <img
                src="/placeholder.svg?height=40&width=120"
                alt="Download on App Store"
                style={{ height: "40px", width: "auto" }}
              />
              <img
                src="/placeholder.svg?height=40&width=120"
                alt="Get it on Google Play"
                style={{ height: "40px", width: "auto" }}
              /> */}
            </div>
          </Col>
        </Row>

        <hr className="border-secondary" />

        <Row>
          <Col className="text-center">
            <p className="text-light small mb-0">© 2025 MovieTixNow. All rights reserved. | Made with RD for movie lovers</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
