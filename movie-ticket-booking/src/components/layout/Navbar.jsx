"use client"
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap"
import { Search, User, Moon, Sun, Menu } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { useTheme } from "../../contexts/ThemeContext"
import { useNavigate } from "react-router-dom"

const CustomNavbar = () => {
  const { user, logout, setShowLoginModal } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleProfileClick = () => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin")
      } else if (user.role === "theater-owner") {
        navigate("/theater-owner")
      } else {
        navigate("/profile")
      }
    } else {
      setShowLoginModal(true)
    }
  }

  return (
    <Navbar expand="lg" className="navbar-custom fixed-top" variant={theme}>
      <Container>
       <Navbar.Brand href="/" className="animated-brand-dark fs-3" ><img
    src="/logo.jpeg"
    alt="Logo"
    height="30"
    className="me-2"
    style={{ borderRadius: '50%' }} // optional for circular logo
  />
  booKar.com
</Navbar.Brand>



        <div className="d-flex align-items-center d-lg-none">
          <Button variant="outline-secondary" size="sm" onClick={toggleTheme} className="me-2">
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </Button>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <Menu size={20} />
          </Navbar.Toggle>
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex mx-auto" style={{ maxWidth: "400px", width: "100%" }}>
            <div className="position-relative w-100">
              <FormControl
                type="search"
                placeholder="Search for movies, theaters..."
                className="pe-5"
                style={{ paddingLeft: "2.5rem" }}
              />
              <Search
                className="position-absolute top-50 translate-middle-y ms-3"
                size={18}
                style={{ left: "0", pointerEvents: "none", opacity: 0.6 }}
              />
            </div>
          </Form>

          <Nav className="ms-auto align-items-center">
            <Button variant="outline-secondary" size="sm" onClick={toggleTheme} className="me-3 d-none d-lg-block">
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </Button>

            {user ? (
              <div className="dropdown">
                <Button variant="outline-primary" className="d-flex align-items-center" onClick={handleProfileClick}>
                  <User size={18} className="me-2" />
                  {user.name}
                </Button>
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={() => navigate("/profile")}>
                    Profile
                  </button>
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Button variant="primary" onClick={() => setShowLoginModal(true)}>
                Sign In
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default CustomNavbar
