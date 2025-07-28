"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email, password) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser = {
        id: "1",
        name: "John Doe",
        email,
        role: email.includes("admin")
          ? "admin"
          : email.includes("theater") || email.includes("owner")
            ? "theater-owner"
            : "customer",
        avatar: "/placeholder.svg?height=40&width=40",
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      setShowLoginModal(false)
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name, email, password, role) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser = {
        id: Date.now().toString(),
        name,
        email,
        role,
        avatar: "/placeholder.svg?height=40&width=40",
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      setShowLoginModal(false)
    } catch (error) {
      throw new Error("Signup failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    // Force a page refresh to ensure clean state
    window.location.href = "/"
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        isLoading,
        showLoginModal,
        setShowLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
