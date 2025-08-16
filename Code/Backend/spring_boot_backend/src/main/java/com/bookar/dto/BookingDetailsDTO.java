package com.bookar.dto;


import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BookingDetailsDTO {
    private Long bookingId;
    private Long reservationId; 
    private String movieTitle;
    private String theaterName;
    private String screenNumber;
    private LocalDate bookingDate;
    private LocalTime showTime;
    private Long seatId;
    private String rowLabel;
    private Integer seatNumber;
    private Double totalAmount;
    private String status;   
}