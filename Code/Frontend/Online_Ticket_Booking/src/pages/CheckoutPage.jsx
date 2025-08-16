import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Button, Spinner, Row, Col } from "react-bootstrap";
import { useBooking } from "../contexts/BookingContext";
const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
 // const user= useAuth();
  const queryParams = new URLSearchParams(location.search);
  const reservationId = queryParams.get("reservation");

  const [loading, setLoading] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);
  const [amount, setAmount]= useState(0); 
  const{booking}= useBooking()
  const token = localStorage.getItem("token")
  // Load reservation details on mount
  useEffect(() => {
    if (reservationId) {
      axios
        .get(`http://localhost:8080/api/reservations/${reservationId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then((res) => {
          console.log("Reservation Details:", res.data);
          setReservationDetails(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch reservation", err);
        });
    }
  }, [reservationId]);

 const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      return resolve(true);
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


  const handlePayment = async () => {
    setLoading(true);

    const razorpayLoaded = await loadRazorpayScript();
    if (!razorpayLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    try {
      // Call backend to create Razorpay order
      const orderRes = await axios.post("http://localhost:8080/api/payment/create-order", {
        reservationId: reservationDetails.reservationId,
        // amount:reservationDetails.totalPayable  
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const { amount,orderId, currency, user, bookingDetails } = orderRes.data;
      console.log("Order ID from backend:", orderId);


      const options = {
        key: orderRes.data.key, 
        amount,// Convert to paise
        currency,
        name: "BookAR Movie Tickets",
        description: "Movie ticket booking",
        order_id: orderId,
        handler: async (response) => {
            console.log("Razorpay response:", response);
          try {
            const verificationRes = await axios.post("http://localhost:8080/api/payment/verify", {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              reservationId,
            }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

            const { bookingId } = verificationRes.data;
            navigate(`/ticket/${bookingId}`);
          } catch (err) {
            console.error("Payment verification failed", err);
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: user?.name||"Guest",
          email: user?.email||"guest@example.com",
          contact: user?.phone||"",
        },
        notes: {
          reservationId,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error during payment", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Checkout</h2>

      {reservationDetails ? (
        <>
          <Row>
            <Col>
              <p><strong>Movie:</strong> <b>{reservationDetails.movieName }</b></p>
              <p><strong>Theater:</strong> <b>{reservationDetails.theaterName}</b></p>
              <p><strong>Show Time:</strong><b> {reservationDetails.showTime}</b></p>
              <p><strong>Total Amount:</strong> <b>₹{reservationDetails.totalPayable }</b></p>
            </Col>
          </Row>

          <Button variant="success" onClick={handlePayment} disabled={loading}>
            {loading ? <Spinner size="sm" animation="border" /> : "Proceed to Pay"}
          </Button>
          
        </>
      ) : (
        <p>Loading reservation details...</p>
        
      )}
    </Container>
  );
};

export default CheckoutPage;