//"use client"

import { useState } from "react"
import { Modal, Form, Button, Alert, Tabs, Tab } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"

const LoginModal = () => {
  const { showLoginModal, setShowLoginModal, login, signup, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("login")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      if (activeTab === "login") {
        await login(formData.email, formData.password)
      } else {
        await signup(formData.name, formData.email, formData.password, formData.role)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  const handleClose = () => {
    setShowLoginModal(false)
    setError("")
    setFormData({ name: "", email: "", password: "", role: "customer" })
  }

  return (
    <Modal show={showLoginModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Welcome to MovieBook</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || "login")} className="mb-3">
          <Tab eventKey="login" title="Sign In">
            <Form onSubmit={handleSubmit}>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </Form>
          </Tab>

          <Tab eventKey="signup" title="Sign Up">
            <Form onSubmit={handleSubmit}>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                  <option value="customer">Customer</option>
                  <option value="theater-owner">Theater Owner</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </Form>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
