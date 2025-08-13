// src/pages/PrivacyPolicy.jsx
"use client";
import { Container } from "react-bootstrap";

const PrivacyPolicy = () => (
  <Container className="py-5">
    <h1>Privacy Policy</h1>
    <p>Last updated: July 28, 2025</p>

    <h3>Data We Collect</h3>
    <ul>
      <li>Personal Info: name, email, phone—collected when you register or book.</li>
      <li>Booking Data: movie, date, seat selection, payment status.</li>
      <li>Usage Data: pages visited, clicks, performance logs.</li>
    </ul>

    <h3>How We Use Data</h3>
    <ul>
      <li>Process your booking requests.</li>
      <li>Send confirmations and updates.</li>
      <li>Improve service and personalize your experience.</li>
    </ul>

    <h3>Data Sharing & Third Parties</h3>
    <p>
      We do not sell your data. We may share info with:
      <ul>
        <li>Payment providers (like Stripe/Razorpay)</li>
        <li>Legal authorities if required by law</li>
        <li>Analytics tools (e.g., Google Analytics, anonymized)</li>
      </ul>
    </p>

    <h3>Security Measures</h3>
    <p>
      We use industry-standard SSL encryption, firewalls, and limited access controls to
      safeguard your data.
    </p>

    <h3>User Rights</h3>
    <p>
      You may request access, correction, or deletion of your data. Contact us at{" "}
      <a href="mailto:support@bookar.com">support@bookar.com</a>
    </p>

    <h3>Changes to This Policy</h3>
    <p>
      We may update this policy over time. We’ll notify users as needed. Continued use implies
      consent.
    </p>
  </Container>
);

export default PrivacyPolicy;
