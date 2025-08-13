package com.bookar.dto;

import com.bookar.entities.Screen;
import com.bookar.entities.TheaterStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TheaterDetailsDTO {
    private Long theaterId;
    private String theaterName;
    private String theaterLocation;
    private String theaterAddress;
    private Integer screenCount;
    private TheaterStatus status;
    private List<Screen> screens; // Can still be lazy fetched in service
}

