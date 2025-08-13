// src/pages/AboutUs.jsx
"use client";
import { Container } from "react-bootstrap";

const AboutUs = () => (
  <Container className="py-5">
    <h1>About Us</h1>
    <p>
      Boo’K’ar was founded in 2025 with one mission: to make movie ticket booking fast, fun, and
      reliable. We are a team of film lovers and tech enthusiasts based in Pune, India.
    </p>

    <h3>What We Offer</h3>
    <ul>
      <li>Browse movies playing in your city</li>
      <li>Select showtimes, choose your seats, and pay securely</li>
      <li>View your booking history or manage tickets easily</li>
    </ul>

    <h3>Why Choose Us?</h3>
    <p>
      With a modern user interface, real-time availability, and easy booking flow, Boo’K’ar is
      built to delight movie-goers.
    </p>

    <h3>Connect With Us</h3>
    <p>
      For feedback or partnerships, email us at{" "}
      <a href="mailto:support@bookar.com">support@bookar.com</a>
    </p>

    <p>© {new Date().getFullYear()} Boo’K’ar. All rights reserved.</p>
  </Container>
);

export default AboutUs;
