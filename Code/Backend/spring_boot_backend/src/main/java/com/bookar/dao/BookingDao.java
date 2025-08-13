package com.bookar.dao;


import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bookar.entities.Booking;

@Repository
public interface BookingDao extends JpaRepository<Booking, Long> {


	
	 @Query("SELECT COALESCE(SUM(sstp.price), 0) " +
	           "FROM Booking b " +
	           " JOIN b.reservation r " +
	           " JOIN r.reservationSeats rs " +
	           " JOIN rs.showSeat ss, " +
	           " ShowSeatTypePrice sstp " +
	           "WHERE sstp.show = ss.show " +
	           "  AND sstp.seatType = ss.seat.type " +
	           "  AND b.bookingTime >= :start " +
	           "  AND b.bookingTime < :end")
	    double getRevenueBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
	 
	 default double getTodayRevenue(LocalDate date) {
	        LocalDateTime start = date.atStartOfDay();
	        LocalDateTime end = start.plusDays(1);
	        return getRevenueBetween(start, end);
	    }

		@Query("SELECT (COUNT(ss) * 100.0) / (SELECT COUNT(s2) FROM ShowSeat s2) FROM ShowSeat ss WHERE ss.seatStatus = 'BOOKED'")
		double calculateOccupancyRate();

		int countByUserId(Long userId);

}