import { Link, useLocation } from "react-router-dom"

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    { path: "/admin/", label: "Dashboard", icon: "🏠" },
    { path: "/admin/movies", label: "Manage Movies", icon: "🎬" },
    { path: "/admin/theaters", label: "Manage Theaters", icon: "🏛️" },
    { path: "/admin/users", label: "Manage Users", icon: "👥" },
  ]

  return (
    <div className="sidebar">
      <div className="p-3">
        <h5 className="text-white">Admin Panel</h5>
      </div>
      <nav className="nav flex-column px-3">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
          >
            <span className="me-2">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
