package com.bookar.service;

import java.util.List;

import com.bookar.dto.SeatResponseDTO;

public interface SeatService {
	public List<SeatResponseDTO> getSeatsForShow(Long showId, Long theaterId);
}
