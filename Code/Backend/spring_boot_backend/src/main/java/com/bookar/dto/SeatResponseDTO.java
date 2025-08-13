package com.bookar.dto;

import com.bookar.entities.SeatType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SeatResponseDTO {
	private Long showSeatId;
    private String id;        
    private String row;
    private int number;
    private SeatType type;
    private double price;
    private String status;    
}
