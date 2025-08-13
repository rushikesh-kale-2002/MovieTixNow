package com.bookar.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

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
public class BookingResponseDTO {
    private Long id;
    private String movieTitle;
    private String theaterName;
    private String screenNumber;
    private LocalDate bookingDate;
    private LocalTime showTime;
    private List<SeatDTO> seats;
    private Double totalAmount;
    private String status;
}