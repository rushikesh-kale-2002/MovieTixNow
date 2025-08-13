package com.bookar.dto;

import lombok.Data;

@Data
public class TheaterRequestDTO {
    private String theaterName;
    private String theaterLocation;
    private String theaterAddress;
    private Integer screenCount;
    private Long ownerId; // optional
}

