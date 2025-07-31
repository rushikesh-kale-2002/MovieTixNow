import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Homepage from "./pages/Homepage"
import ManageMovies from "./pages/ManageMovies"
import ManageTheaters from "./pages/ManageTheaters"
import ManageUsers from "./pages/ManageUsers"
import GenerateReports from "./pages/GenerateReports"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/movies" element={<ManageMovies />} />
          <Route path="/theaters" element={<ManageTheaters />} />
          <Route path="/users" element={<ManageUsers />} />
          <Route path="/reports" element={<GenerateReports />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

