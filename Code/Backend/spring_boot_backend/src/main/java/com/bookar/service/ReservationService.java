package com.bookar.service;

import com.bookar.dto.ReservationRequestDTO;
import com.bookar.dto.ReservationResponseDTO;
import com.bookar.dto.SeatReservationResp;

public interface ReservationService {
	public SeatReservationResp reserveSeats(ReservationRequestDTO req);
	void expireOldReservations();
    ReservationResponseDTO getReservationById(Long id);
}
