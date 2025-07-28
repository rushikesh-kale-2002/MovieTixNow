"use client"
import { useState } from "react"
import { Button } from "react-bootstrap"
import { Filter, X } from "lucide-react"

const GenreSidebar = ({ isOpen, setIsOpen }) => {
  const [activeFilter, setActiveFilter] = useState("All Movies")

  const genres = ["All Movies", "Action", "Comedy", "Drama", "Horror", "Sci-Fi"]

  const handleFilterClick = (genre) => {
    setActiveFilter(genre)
    console.log("Filter selected:", genre)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Sidebar Content with Close Button */}
      <div className={`genre-sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <div className="genre-sidebar-content">
          {/* Header with Close Button */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="genre-sidebar-title mb-0">
              <Filter size={18} className="me-2" />
              Browse Movies
            </h5>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={closeSidebar}
              className="sidebar-close-btn"
              title="Close Filters"
            >
              <X size={16} />
            </Button>
          </div>

          <div className="d-flex flex-column gap-3">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={activeFilter === genre ? "primary" : "outline-primary"}
                size="lg"
                className="genre-sidebar-btn text-start"
                onClick={() => handleFilterClick(genre)}
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
    </>
  )
}

export default GenreSidebar
