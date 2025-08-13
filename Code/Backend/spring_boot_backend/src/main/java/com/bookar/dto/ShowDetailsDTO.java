package com.bookar.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ShowDetailsDTO {
    private String theaterName;
    private String theaterAddress;
    private String screenNumber;
    private LocalDate showDate;
    private LocalTime startTime;
}

