package com.bookar.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookar.dto.ShowDetailsDTO;
import com.bookar.dto.TheatreDashboardDTO;
import com.bookar.entities.Show;
import com.bookar.entities.ShowStatus;

public interface ShowDao extends JpaRepository<Show, Long> {

	@Query("SELECT DISTINCT s.screen.theater.theaterLocation " + "FROM Show s " + "WHERE s.movie.id = :movieId")
	List<String> findDistinctLocationsByMovieId(@Param("movieId") Long movieId);

	@Query("""
			    SELECT s FROM Show s
			    WHERE s.movie.id = :movieId
			      AND s.showDate = :date
			      AND s.screen.theater.theaterLocation LIKE %:location%
			""")
	List<Show> findShowsByMovieDateLocation(@Param("movieId") Long movieId, @Param("date") LocalDate date,
			@Param("location") String location);

	@Query("SELECT new com.bookar.dto.ShowDetailsDTO( "
			+ "t.theaterName, t.theaterAddress, s.screenNumber, sh.showDate, sh.startTime) " + "FROM Show sh "
			+ "JOIN sh.screen s " + "JOIN s.theater t " + "WHERE sh.showId = :showId")
	ShowDetailsDTO getShowDetailsByShowId(@Param("showId") Long showId);

	@Query(value = """
					SELECT
			    sh.show_id AS showId,
			    m.title AS movieTitle,
			    t.theater_name AS theaterName,
			    sc.screen_no AS screenNumber,
			    sh.show_date AS showDate,
			    sh.start_time AS startTime,
			    sh.show_status AS showStatus,
			    (SELECT COUNT(*) FROM seats seat WHERE seat.screen_id = sc.screen_id) AS totalSeats,
			    (SELECT COUNT(*) FROM show_seats ss
			     JOIN reservation_seats rs ON rs.show_seat_id = ss.show_seat_id
			     JOIN reservations r ON r.reservation_id = rs.reservation_id
			     WHERE ss.show_id = sh.show_id
			       AND ss.seat_status = 'BOOKED'
			       AND r.reservation_status = 'CONFIRMED') AS bookedSeats,
			    (SELECT COALESCE(SUM(sstp.price), 0)
			     FROM show_seats ss2
			     JOIN seats s2 ON ss2.seat_id = s2.seat_id
			     JOIN reservation_seats rs2 ON rs2.show_seat_id = ss2.show_seat_id
			     JOIN reservations r2 ON r2.reservation_id = rs2.reservation_id
			     JOIN show_seat_type_prices sstp
			          ON ss2.show_id = sstp.show_id
			         AND s2.seat_type = sstp.seat_type
			     WHERE ss2.show_id = sh.show_id
			       AND r2.reservation_status = 'CONFIRMED') AS revenue,
			    (SELECT COALESCE(SUM(sstp2.price), 0)
			     FROM show_seats ss3
			     JOIN seats s3 ON ss3.seat_id = s3.seat_id
			     JOIN reservation_seats rs3 ON rs3.show_seat_id = ss3.show_seat_id
			     JOIN reservations r3 ON r3.reservation_id = rs3.reservation_id
			     JOIN show_seat_type_prices sstp2
			          ON ss3.show_id = sstp2.show_id
			         AND s3.seat_type = sstp2.seat_type
			     WHERE ss3.show_id = sh.show_id
			       AND r3.reservation_status = 'CONFIRMED'
			       AND DATE(r3.reserved_at) = CURDATE()) AS todaysRevenue
			FROM shows sh
			JOIN movies m ON sh.movie_id = m.movie_id
			JOIN screens sc ON sc.screen_id = sh.screen_id
			JOIN theaters t ON t.theater_id = sc.theater_id
			WHERE sh.show_status IN ('ACTIVE', 'SCHEDULED')
			  AND t.owner_id = :ownerId

					""", nativeQuery = true)
	List<Object[]> findShowStatsByOwner(@Param("ownerId") Long ownerId);

	@Query(value = """
			SELECT
			 -- Theaters count
			 (SELECT COUNT(*)
			  FROM theaters th
			  WHERE th.owner_id = :ownerId AND th.status = 'PENDING') AS pendingTheaters,

			 (SELECT COUNT(*)
			  FROM theaters th
			  WHERE th.owner_id = :ownerId AND th.status = 'APPROVED') AS approvedTheaters,

			 (SELECT COUNT(*)
			  FROM theaters th
			  WHERE th.owner_id = :ownerId) AS totalTheaters,

			 -- Active shows
			 (SELECT COUNT(DISTINCT sh.show_id)
			  FROM shows sh
			  JOIN screens sc ON sh.screen_id = sc.screen_id
			  JOIN theaters t ON sc.theater_id = t.theater_id
			  WHERE t.owner_id = :ownerId AND sh.show_status = 'ACTIVE') AS activeShows,

			 -- Scheduled shows
			 (SELECT COUNT(DISTINCT sh.show_id)
			  FROM shows sh
			  JOIN screens sc ON sh.screen_id = sc.screen_id
			  JOIN theaters t ON sc.theater_id = t.theater_id
			  WHERE t.owner_id = :ownerId AND sh.show_status = 'SCHEDULED') AS scheduledShows,

			 -- Total revenue (now only from show_seat_type_prices)
			 (SELECT COALESCE(SUM(sstp.price), 0)
			  FROM reservations r2
			  JOIN reservation_seats rs2 ON r2.reservation_id = rs2.reservation_id
			  JOIN show_seats ss2 ON rs2.show_seat_id = ss2.show_seat_id
			  JOIN seats s ON ss2.seat_id = s.seat_id
			  JOIN show_seat_type_prices sstp ON ss2.show_id = sstp.show_id
			                                 AND s.seat_type = sstp.seat_type
			  JOIN shows sh3 ON ss2.show_id = sh3.show_id
			  JOIN screens sc3 ON sh3.screen_id = sc3.screen_id
			  JOIN theaters t3 ON sc3.theater_id = t3.theater_id
			  WHERE r2.reservation_status = 'CONFIRMED'
			    AND t3.owner_id = :ownerId) AS totalRevenue,

			 -- Today's confirmed bookings
			 (SELECT COUNT(DISTINCT r3.reservation_id)
			  FROM reservations r3
			  JOIN shows sh4 ON r3.show_id = sh4.show_id
			  JOIN screens sc4 ON sh4.screen_id = sc4.screen_id
			  JOIN theaters t4 ON sc4.theater_id = t4.theater_id
			  WHERE DATE(r3.reserved_at) = CURDATE()
			    AND r3.reservation_status = 'CONFIRMED'
			    AND t4.owner_id = :ownerId) AS todaysBookings,

			 -- Today's revenue
			 (SELECT COALESCE(SUM(sstp2.price), 0)
			  FROM reservations r4
			  JOIN reservation_seats rs4 ON r4.reservation_id = rs4.reservation_id
			  JOIN show_seats ss4 ON rs4.show_seat_id = ss4.show_seat_id
			  JOIN seats s2 ON ss4.seat_id = s2.seat_id
			  JOIN show_seat_type_prices sstp2 ON ss4.show_id = sstp2.show_id
			                                  AND s2.seat_type = sstp2.seat_type
			  JOIN shows sh5 ON ss4.show_id = sh5.show_id
			  JOIN screens sc5 ON sh5.screen_id = sc5.screen_id
			  JOIN theaters t5 ON sc5.theater_id = t5.theater_id
			  WHERE DATE(r4.reserved_at) = CURDATE()
			    AND r4.reservation_status = 'CONFIRMED'
			    AND t5.owner_id = :ownerId) AS todaysRevenue;

			""", nativeQuery = true)
	Object getOwnerDashboardStats(@Param("ownerId") Long ownerId);

	@Modifying
	@Query("UPDATE Show s SET s.showStatus = 'EXPIRED' WHERE s.showDate < CURRENT_DATE AND s.showStatus != 'EXPIRED'")
	int expireOldShows();

	@Modifying
	@Query("UPDATE Show s SET s.showStatus = :status WHERE s.id = :showId")
	void updateShowStatus(@Param("showId") Long showId, @Param("status") ShowStatus status);

}
