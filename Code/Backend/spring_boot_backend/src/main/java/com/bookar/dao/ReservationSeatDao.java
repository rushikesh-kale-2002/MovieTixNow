package com.bookar.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookar.entities.Reservation;
import com.bookar.entities.ReservationSeat;

public interface ReservationSeatDao extends JpaRepository<ReservationSeat, Long> {
	 List<ReservationSeat> findByReservation(Reservation reservation);
}

