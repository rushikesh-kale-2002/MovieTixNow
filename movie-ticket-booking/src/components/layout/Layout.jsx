"use client"

import { useState } from "react"
import { useLocation } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import GenreSidebar from "./GenreSidebar"
import LoginModal from "../auth/LoginModal"

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === "/"

  // Show sidebar on all pages
  const showSidebar = true

  return (
    <div className="app-layout" style={{ position: "relative" }}>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} showSidebarToggle={showSidebar} />
      <LoginModal />

      {/* Overlay for faint background when sidebar is open; now clickable to close sidebar */}
      {sidebarOpen && (
        <div
          className="sidebar-faint-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(30, 34, 44, 0.45)",
            zIndex: 100,
            transition: "background 0.3s",
            cursor: "pointer"
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="main-layout">
        {/* Sidebar - only show on relevant pages */}
        {showSidebar && <GenreSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />}

        {/* Main Content */}
        <main
          className={`main-content ${sidebarOpen && showSidebar ? "sidebar-open" : "sidebar-closed"} ${!isHomePage ? "with-navbar-padding" : ""}`}
        >
          {children}
        </main>
      </div>

      <Footer sidebarOpen={sidebarOpen && showSidebar} />
    </div>
  )
}

export default Layout
