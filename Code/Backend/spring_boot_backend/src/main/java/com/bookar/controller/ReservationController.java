package com.bookar.controller;

import com.bookar.dto.ReservationRequestDTO;
import com.bookar.dto.ReservationResponseDTO;
import com.bookar.dto.SeatReservationResp;
import com.bookar.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
	@Autowired
	private ReservationService reservationService;
	
	@GetMapping("/{id}")
	public ResponseEntity<ReservationResponseDTO> getReservationById(@PathVariable Long id) {
	    ReservationResponseDTO responseDTO = reservationService.getReservationById(id);
	    if (responseDTO == null) {
	        return ResponseEntity.notFound().build();
	    }
	    return ResponseEntity.ok(responseDTO);
	}


	@PostMapping
	public ResponseEntity<SeatReservationResp> createReservation(@RequestBody ReservationRequestDTO requestDTO) {
	    SeatReservationResp responseDTO = reservationService.reserveSeats(requestDTO);
	    return ResponseEntity.ok(responseDTO);
	}

	@DeleteMapping("/expire-old")
	public ResponseEntity<Void> expireOldReservations() {
	    reservationService.expireOldReservations();
	    return ResponseEntity.noContent().build();
	}

}