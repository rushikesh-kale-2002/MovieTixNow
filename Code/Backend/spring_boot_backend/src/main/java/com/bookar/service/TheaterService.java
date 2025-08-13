package com.bookar.service;

import java.util.List;
import com.bookar.dto.TheaterRequestDTO;
import com.bookar.dto.TheaterResponseDTO;
import com.bookar.entities.Theater;
import com.bookar.entities.TheaterStatus;
import com.bookar.dto.LayoutRequestDTO.SeatLayout;
import com.bookar.dto.SeatLayoutResponseDTO;
import com.bookar.dto.TheaterInfoDTO;

public interface TheaterService {
    Theater addTheater(TheaterRequestDTO dto);
    List<Theater> getTheatersByStatus(TheaterStatus status);
    List<Theater> getTheatersByOwnerAndStatus(Long ownerId, TheaterStatus status);
    List<Theater> getAllTheaters();
    Theater updateTheaterStatus(Long theaterId, TheaterStatus status);
    void deleteTheater(Long theaterId);
    TheaterResponseDTO getTheaterDetails(Long theaterId);
	TheaterInfoDTO getTheaterById(Long theaterId);

	void saveLayoutForAllScreens(Long theaterId, List<SeatLayout> layout);

	List<SeatLayoutResponseDTO> getSavedLayout(Long theaterId);

}
