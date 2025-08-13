package com.bookar.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TheaterResponseDTO {
    private Long theaterId;
    private String theaterName;
    private String theaterLocation;
    private String theaterAddress;
    private Integer screenCount;
    private String status;
    private List<String> screens;
}
