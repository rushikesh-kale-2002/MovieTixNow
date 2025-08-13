package com.bookar.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Map;

import com.bookar.entities.SeatType;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CreateShowDTO {
	  private Long movieId;
	  private Long screenId;   
	  private LocalDate showDate;
	  private LocalTime showTime;
	  private Map<SeatType, Double> seatPrices;
	}
