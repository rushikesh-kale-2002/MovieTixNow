package com.bookar.controller;

import com.bookar.entities.Booking;
import com.bookar.service.BookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.bookar.dto.*;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Endpoint to fetch booking details by bookingId
    @GetMapping("/{bookingId}")
    public ResponseEntity<?> getBookingById(@PathVariable Long bookingId) {
        try {
            BookingDTO bookingDto = bookingService.getBookingDTOById(bookingId);
            return ResponseEntity.ok(bookingDto);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Booking not found with ID: " + bookingId);
        }
    }

}
