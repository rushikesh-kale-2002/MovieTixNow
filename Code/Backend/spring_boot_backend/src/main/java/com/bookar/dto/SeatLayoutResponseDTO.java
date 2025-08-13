package com.bookar.dto;

import com.bookar.entities.SeatType;

import lombok.*;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class SeatLayoutResponseDTO {
    private String rowLabel;
    private Integer seatNumber;
    private SeatType seatType;
}
