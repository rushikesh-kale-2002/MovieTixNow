package com.bookar.dao;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookar.entities.Reservation;
import com.bookar.entities.ReservationStatus;

public interface ReservationDao extends JpaRepository<Reservation, Long> { 
	List<Reservation> findByReservationStatusAndExpiresAtBefore(
	        ReservationStatus status, LocalDateTime cutoff
	    );
}

