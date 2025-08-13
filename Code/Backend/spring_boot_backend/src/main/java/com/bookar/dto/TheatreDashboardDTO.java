package com.bookar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TheatreDashboardDTO {
	private int pendingTheaters;
    private int approvedTheaters;
    private int totalTheaters;
    private int activeShows;
    private int scheduledShows;
    private int todaysBookings;
    private double todaysRevenue;
    private double totalRevenue; 

}
