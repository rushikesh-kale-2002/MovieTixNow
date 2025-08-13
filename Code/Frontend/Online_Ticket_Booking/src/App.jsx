import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ShowSelectionPage from "./pages/ShowSelectionPage";
import { BookingProvider } from "./contexts/BookingContext";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/layout/Footer";
import AddShowPage from "./pages/AddShowPage"
import UserProfilePage from "./pages/UserProfilePage";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/layout/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import ContactUs from "./pages/ContactUs";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LayoutPage from "./pages/LayoutPage"
import AboutUs from "./pages/AboutUs";
import ManageTheaters from "./pages/ManageTheaters"
import TheaterListPage from "./pages/TheaterListPage"
import AddTheaterPage from "./pages/AddTheaterPage";
import TheatreManageShowsPage from './pages/TheatreManageShowPage';
import TheatreOwnerDashboard from "./pages/TheatreOwnerDashboard";
import Layout from "./components/layout/Layout";
import AdminHomepage from "./pages/AdminHomepage";
import ManageMovies from "./pages/ManageMovies";
import ManageUsers from "./pages/ManageUsers";
import CheckoutPage from "./pages/CheckoutPage";
import { useLocation } from "react-router-dom";
import TicketPage from "./pages/TicketPage";

function App() {

  const isAdminRoute = useLocation().pathname.startsWith("/admin");
  return (
     <ThemeProvider>
      <AuthProvider>
        <BookingProvider>
          {/* <Router> */}
            <div className="app">
              {!isAdminRoute && <Navbar/> }
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/movie/:id" element={<MovieDetailsPage />} />
                  <Route path="/movie/:id/seats" element={<SeatSelectionPage />} />
                  <Route path="/movie/:id/shows" element={<ShowSelectionPage />} />
                  <Route path="/owner/theaters/:theaterId/add-show" element={<AddShowPage />} />
                  <Route path="/signin" element={<Login />} />
                  <Route path="/signup" element={<Register />} />
                  <Route path="/profile" element={<UserProfilePage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/ticket/:bookingId" element={<TicketPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/owner/add-theater" element={<AddTheaterPage />} />
                  <Route path="/owner/theaters" element={<TheaterListPage />} />
                  <Route path="/owner/:theaterId/layout" element={<LayoutPage />} />
                  <Route path="/dashboard/shows" element={<TheatreManageShowsPage />} />
                  <Route path="/dashboard" element={<TheatreOwnerDashboard />}></Route>
                  {/* Footer pages */}
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/terms-of-use" element={<TermsOfUse />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/admin/*" element={<Layout />} >
                    <Route path="" element={<AdminHomepage />} />
                    <Route path="movies" element={<ManageMovies />} />
                    <Route path="users" element={<ManageUsers />} />
                    <Route path="theaters" element={<ManageTheaters />} />

                  </Route>
                </Routes>
              </main>
               {!isAdminRoute && <Footer/> }
              <ToastContainer />
            </div>
          {/* </Router> */}
          {/* admin routes */}
          {/*  */}
        </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
