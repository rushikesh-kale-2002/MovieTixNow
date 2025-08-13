package com.bookar.dto;

import java.time.LocalDate;

import com.bookar.entities.Gender;
import com.bookar.entities.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DashboardStatsDTO {
    private int totalTheaters;
    private int totalMovies;
    private int totalUsers;
    private int totalBookings;
    private double todayRevenue;
    private double occupancyRate;

}
