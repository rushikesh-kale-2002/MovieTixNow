package com.bookar.dto;
import com.fasterxml.jackson.annotation.JsonProperty;

public class PaymentVerificationResponse {
    private Long bookingId;

    public PaymentVerificationResponse(Long bookingId) {
        this.bookingId = bookingId;
    }
    @JsonProperty("bookingId")
    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }
}
