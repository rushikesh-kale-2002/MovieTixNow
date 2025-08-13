package com.bookar.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookar.dto.CreateShowDTO;
import com.bookar.dto.ShowDetailsDTO;
import com.bookar.dto.TheaterShowDTO;
import com.bookar.dto.TheaterShowManageDTO;
import com.bookar.dto.TheatreDashboardDTO;
import com.bookar.entities.Show;

public interface ShowService {
	List<TheaterShowDTO> getTheatersWithShows(Long movieId, LocalDate date, String location);
	ShowDetailsDTO getShowDetails(Long showId);
	List<TheaterShowManageDTO> getShowManagementDetails(Long ownerId);
	TheatreDashboardDTO getOwnerDashboardStats(Long ownerId);
	void deleteShow(Long showId);
    void activateShow(Long showId);
    void deactivateShow(Long showId);
	void createShowWithLayout(Long theaterId, CreateShowDTO dto);
    
}
