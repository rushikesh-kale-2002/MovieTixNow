package com.bookar.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class TheaterShowManageDTO {
	private Long showId;
    private String movieTitle;
    private String theaterName;
    private String screenNumber;
    private LocalDate showDate;
    private LocalTime startTime;
    private String showStatus;
    private int totalSeats;
    private int bookedSeats;
    private double revenue;         // Total revenue for this show
    private double todaysRevenue;   // Revenue for this show today
    private double occupancyRate;
    private Map<String, Double> seatTypePrices;
}
