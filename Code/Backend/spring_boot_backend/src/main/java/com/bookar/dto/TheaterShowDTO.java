package com.bookar.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TheaterShowDTO {
	
	private Long theaterId ;
	 private String theaterName ;
	 private String theaterLocation ;
	 private String theaterAddress;
	 private String screenName ;
	 private List<ShowTimeDTO> shows ;
}
