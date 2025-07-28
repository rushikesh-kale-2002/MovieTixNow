"use client"

import { useState } from "react"
import { Modal, Form, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Eye, EyeOff, Mail } from "lucide-react"

const LoginModal = () => {
  const { showLoginModal, setShowLoginModal, login, signup, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
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
    setActiveTab("login")
    setRememberMe(false)
    setShowPassword(false)
  }

  const switchTab = (tab) => {
    setActiveTab(tab)
    setError("")
    setFormData({ name: "", email: "", password: "", role: "customer" })
    setRememberMe(false)
    setShowPassword(false)
  }

  return (
    <Modal show={showLoginModal} onHide={handleClose} centered size="md" className="simple-auth-modal">
      <Modal.Body className="p-0">
        <div className="simple-auth-container">
          {/* Close Button */}
          <button type="button" className="simple-auth-close" onClick={handleClose} aria-label="Close">
            ×
          </button>

          {/* Form Content */}
          <div className="simple-auth-content">
            <h2 className="simple-auth-title">{activeTab === "login" ? "Sign in" : "Sign up"}</h2>

            {/* Switch Tab Link */}
            <div className="simple-auth-switch-text">
              {activeTab === "login" ? (
                <p>
                  Don't have an account{" "}
                  <button type="button" className="simple-auth-link" onClick={() => switchTab("signup")}>
                    Register here
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button type="button" className="simple-auth-link" onClick={() => switchTab("login")}>
                    Sign in here
                  </button>
                </p>
              )}
            </div>

            {/* Form */}
            <Form onSubmit={handleSubmit} className="simple-auth-form">
              {error && (
                <Alert variant="danger" className="simple-auth-error">
                  {error}
                </Alert>
              )}

              {/* Sign Up Fields */}
              {activeTab === "signup" && (
                <>
                  <div className="simple-form-group">
                    <label className="simple-form-label">Full Name</label>
                    <div className="simple-input-wrapper">
                      <input
                        type="text"
                        className="simple-form-input"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="simple-form-group">
                    <label className="simple-form-label">Role</label>
                    <div className="simple-input-wrapper">
                      <select
                        className="simple-form-input simple-form-select"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      >
                        <option value="customer">Customer</option>
                        <option value="theater-owner">Theater Owner</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Email Field */}
              <div className="simple-form-group">
                <label className="simple-form-label">Email</label>
                <div className="simple-input-wrapper">
                  <input
                    type="email"
                    className="simple-form-input"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <Mail className="simple-input-icon" size={18} />
                </div>
              </div>

              {/* Password Field */}
              <div className="simple-form-group">
                <label className="simple-form-label">Password</label>
                <div className="simple-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="simple-form-input"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="simple-input-icon simple-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password (Login Only) */}
              {activeTab === "login" && (
                <div className="simple-form-options">
                  <label className="simple-checkbox-wrapper">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="simple-checkbox"
                    />
                    <span className="simple-checkbox-text">Remember me</span>
                  </label>
                  <a href="#" className="simple-forgot-link">
                    Forgot Password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" className="simple-submit-btn" disabled={isLoading}>
                {isLoading
                  ? activeTab === "login"
                    ? "Signing In..."
                    : "Creating Account..."
                  : activeTab === "login"
                    ? "Sign in"
                    : "Sign up"}
              </Button>

              {/* Divider */}
              <div className="simple-divider">
                <span>or</span>
              </div>

              {/* Google Login */}
              <button type="button" className="simple-google-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" className="simple-google-icon">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with google
              </button>
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
