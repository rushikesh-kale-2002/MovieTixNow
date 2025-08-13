package com.bookar.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import com.bookar.dto.BookingDTO;
import com.bookar.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookar.dao.BookingDao;
import com.bookar.dao.ReservationDao;
import com.bookar.dao.ReservationSeatDao;
import com.bookar.dao.ShowSeatDao;
import com.bookar.entities.Booking;
import com.bookar.entities.Reservation;
import com.bookar.entities.ReservationSeat;
import com.bookar.entities.ShowSeat;
import com.bookar.entities.ReservationStatus;
import com.bookar.entities.SeatStatus;
import com.bookar.entities.Show;

@Service
@Transactional
public class BookingService {
	@Autowired
	private ReservationDao reservationDao;

	@Autowired
	private ReservationSeatDao reservationSeatDao;

	@Autowired
	private ShowSeatDao showSeatDao;

	@Autowired
	private BookingDao bookingDao;

	public Long confirmBooking(Long reservationId, Long userId, String paymentId, BigDecimal totalAmount) {//add double payment
	    Reservation reservation = reservationDao.findById(reservationId)
	        .orElseThrow(() -> new RuntimeException("Reservation not found"));

	    if (reservation.getReservationStatus() != ReservationStatus.PENDING) {
	        throw new RuntimeException("Reservation is not in pending state");
	    }

	    List<ReservationSeat> reservedSeats = reservationSeatDao.findByReservation(reservation);
	    for (ReservationSeat rs : reservedSeats) {
	        ShowSeat showSeat = rs.getShowSeat();
	        showSeat.setSeatStatus(SeatStatus.BOOKED);
	        showSeatDao.save(showSeat);
	    }

	    reservation.setReservationStatus(ReservationStatus.CONFIRMED);
	    reservationDao.save(reservation);

	    Booking booking = new Booking();
	    booking.setBookingTime(LocalDateTime.now());
	    booking.setPaymentId(paymentId);
	    booking.setUser(reservation.getUser());
	    booking.setReservation(reservation);
	    
	    

	    Booking savedBooking = bookingDao.save(booking);
	    return savedBooking.getBookingId();
	}

	public void cancelReservation(Long reservationId) {
	    Reservation reservation = reservationDao.findById(reservationId)
	        .orElseThrow(() -> new RuntimeException("Reservation not found"));

	    if (reservation.getReservationStatus() != ReservationStatus.PENDING) {
	        return;
	    }

	    List<ReservationSeat> reservedSeats = reservationSeatDao.findByReservation(reservation);
	    for (ReservationSeat rs : reservedSeats) {
	        ShowSeat showSeat = rs.getShowSeat();
	        showSeat.setSeatStatus(SeatStatus.AVAILABLE);
	        showSeatDao.save(showSeat);
	    }

	    reservation.setReservationStatus(ReservationStatus.CANCELLED);
	    reservationDao.save(reservation);
	}

	public BookingDTO getBookingDTOById(Long bookingId) {
	    Booking booking = bookingDao.findById(bookingId)
	        .orElseThrow(() -> new RuntimeException("Booking not found"));

	    User user = booking.getUser();
	    Reservation reservation = booking.getReservation();

	    Show show = reservation.getShow();

	    String username = (user.getFirstname() != null ? user.getFirstname() : "") + " " +
	                      (user.getLastname() != null ? user.getLastname() : "");
	    username = username.trim();

	    String showTime = show.getStartTime().toString();
	    String movieName = show.getMovie().getTitle();
	    String theatreName = show.getScreen().getTheater().getTheaterName();
	    
	    List<ReservationSeat> reservationSeats = reservationSeatDao.findByReservation(reservation);

	    List<String> seatNumbers = reservationSeats.stream()
	        .map(rs -> {
	            ShowSeat showSeat = rs.getShowSeat();
	            return showSeat.getSeat().getRowLabel() + showSeat.getSeat().getSeatNumber() ;
	        })
	        .collect(Collectors.toList());

	 DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	 String movieDateStr = show.getShowDate().format(formatter);


	    return new BookingDTO(
	    	    booking.getBookingId(),
	    	    booking.getPaymentId(),
	    	    booking.getBookingTime(),
	    	    booking.getReservation().getReservationId(),
	    	    booking.getUser().getId(),
	    	    username,
	    	    showTime,
	    	    movieName,
	    	    theatreName,
	    	    seatNumbers,
	    	    movieDateStr
	    	);

	}


}