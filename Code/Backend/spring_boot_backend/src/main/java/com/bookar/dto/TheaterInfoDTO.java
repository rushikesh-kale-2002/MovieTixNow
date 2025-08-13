package com.bookar.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TheaterInfoDTO {
    private Long theaterId;
    private String theaterName;
    private String theaterLocation;
    private String theaterAddress;
    private List<ScreenInfo> screens;         
    
    @Getter @Setter @AllArgsConstructor @NoArgsConstructor
    public static class ScreenInfo {
      private Long screenId;
      private String screenNumber;
    }
}