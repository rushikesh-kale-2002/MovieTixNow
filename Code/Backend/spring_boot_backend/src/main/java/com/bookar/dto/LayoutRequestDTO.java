package com.bookar.dto;

import java.util.List;

import com.bookar.entities.SeatType;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LayoutRequestDTO {
  private List<SeatLayout> layout;
  
  
  @Getter @Setter @NoArgsConstructor @AllArgsConstructor
  public static class SeatLayout {
    private String rowLabel;
    private int seatNumber;
    private SeatType type;      
  }
}
