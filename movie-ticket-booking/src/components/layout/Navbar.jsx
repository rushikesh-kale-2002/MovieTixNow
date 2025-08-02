"use client"
import { Navbar, Nav, Container, Form, FormControl, Button, Dropdown } from "react-bootstrap"
import { Search, User, Moon, Sun, Menu, LogOut, Filter } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { useTheme } from "../../contexts/ThemeContext"
import { useNavigate } from "react-router-dom"

const CustomNavbar = ({ sidebarOpen, setSidebarOpen }) => {
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
    }
  }

  const handleLogout = () => {
    logout()
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <Navbar expand="lg" className="navbar-custom fixed-top" variant={theme}>
      <Container>
        {/* Left side: Filter Toggle + Brand */}
        <div className="d-flex align-items-center" style={{ width: '100%' }}>
          {/* Hamburger Toggle Button - show for all devices */}
          <Button
            variant="light"
            size="lg"
            onClick={toggleSidebar}
            className="navbar-filter-toggle shadow-sm"
            style={{
              position: 'absolute',
              left: '18px',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '10px 14px',
              borderRadius: '12px',
              border: '2px solid #e5e7eb',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              zIndex: 1050,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '48px',
              minHeight: '48px',
            }}
            title={sidebarOpen ? "Close Filters" : "Open Filters"}
            aria-label="Toggle Filters"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="7" x="5" width="18" height="2.5" rx="1.25" fill="#374151" />
              <rect y="13" x="5" width="18" height="2.5" rx="1.25" fill="#374151" />
              <rect y="19" x="5" width="18" height="2.5" rx="1.25" fill="#374151" />
            </svg>
          </Button>
          {/* Brand - single instance only */}
          <Navbar.Brand 
            href="/" 
            className="animated-brand-dark fs-3" 
            style={{ 
              marginLeft: '60px', 
              marginRight: '16px', 
              color: theme === 'dark' ? '#FFD700' : '#374151', // gold in dark, gray in light
              fontWeight: '800', 
              letterSpacing: '1px', 
              textShadow: theme === 'dark' ? '0 2px 8px #000, 0 0 2px #FFD700' : 'none',
              display: 'flex', 
              alignItems: 'center' 
            }}>
            <img src="/logo.jpeg" alt="Logo" height="30" className="me-2" style={{ borderRadius: "50%", boxShadow: 'none' }} />
            MovieTixNow
          </Navbar.Brand>
          {/* Search bar next to brand */}
          <Form className="d-flex" style={{ maxWidth: "500px", width: "100%" }}>
            <div className="position-relative w-100">
              <FormControl
                type="search"
                placeholder="Search for movies, theaters..."
                className="pe-5"
                style={{ paddingLeft: "2.5rem", minWidth: '360px', height: '44px', fontSize: '1.1rem' }}
              />
              <Search
                className="position-absolute top-50 translate-middle-y ms-3"
                size={20}
                style={{ left: "0", pointerEvents: "none", opacity: 0.6 }}
              />
            </div>
          </Form>
        </div>

        <div className="d-flex align-items-center d-lg-none">
          <Button variant="outline-secondary" size="sm" onClick={toggleTheme} className="me-2">
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </Button>
          {/* Removed Navbar.Toggle with Menu icon to eliminate extra button on mobile */}
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          {/* User controls on the right */}
          <Nav className="ms-auto align-items-center">
            <Button variant="outline-secondary" size="sm" onClick={toggleTheme} className="ms-3 me-3 d-none d-lg-block" style={{ height: '40px' }}>
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </Button>

            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" className="d-flex align-items-center">
                  <User size={18} className="me-2" />
                  {user.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleProfileClick}>
                    <User size={16} className="me-2" />
                    {user.role === "admin"
                      ? "Admin Dashboard"
                      : user.role === "theater-owner"
                        ? "Theater Dashboard"
                        : "Profile"}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    <LogOut size={16} className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button 
                variant="primary" 
                onClick={() => setShowLoginModal(true)} 
                style={{ 
                  height: '40px', 
                  fontSize: '0.95rem', 
                  fontWeight: '600', 
                  padding: '8px 22px', 
                  minWidth: '100px', 
                  letterSpacing: '0.5px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  lineHeight: '1.1', 
                  borderRadius: '12px', 
                  marginLeft: '12px' 
                }}>
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
