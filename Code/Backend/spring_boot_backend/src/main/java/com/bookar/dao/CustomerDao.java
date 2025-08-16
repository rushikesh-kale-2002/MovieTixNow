package com.bookar.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookar.entities.*;
import java.util.List;
import java.util.Optional;


public interface CustomerDao extends JpaRepository<User, Long> {
	
	User findByEmailAndPassword(String email, String password);
	User findByEmail(String email);
	boolean existsByEmail(String email);
	@Query(value = """
	        SELECT 
	            b.booking_id AS id,
	            r.reservation_id AS reservationId,
	            m.title AS movieTitle,
	            t.theater_name AS theaterName,
	            s.screen_no AS screenNumber,
	            r.reserved_at AS bookingDate,
	            sh.start_time AS showTime,
	            st.seat_id AS seatId,
	            st.row_label AS rowLabel,
	            st.seat_number AS seatNumber,
	            r.total_amount AS totalAmount,
	            r.reservation_status AS status
	        FROM reservations r
	        JOIN bookings b ON b.reservation_id = r.reservation_id
	        JOIN shows sh ON r.show_id = sh.show_id
	        JOIN movies m ON sh.movie_id = m.movie_id
	        JOIN screens s ON sh.screen_id = s.screen_id
	        JOIN theaters t ON s.theater_id = t.theater_id
	        JOIN reservation_seats rs ON r.reservation_id = rs.reservation_id
	        JOIN show_seats ss ON rs.show_seat_id = ss.show_seat_id
	        JOIN seats st ON ss.seat_id = st.seat_id
	        WHERE r.user_id = :userId
	        ORDER BY r.reservation_id, st.row_label, st.seat_number
	    """, nativeQuery = true)
	    List<Object[]> findBookingsByUserId(@Param("userId") Long userId);
	
}
