

package com.bookar.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookar.custom_exceptions.ResourceNotFoundException;
import com.bookar.dao.CustomerDao;
import com.bookar.dao.ReservationDao;
import com.bookar.dao.ReservationSeatDao;
import com.bookar.dao.ShowDao;
import com.bookar.dao.ShowSeatDao;
import com.bookar.dao.ShowSeatTypePriceDao;
import com.bookar.dto.ReservationRequestDTO;
import com.bookar.dto.ReservationResponseDTO;
import com.bookar.dto.SeatReservationResp;
import com.bookar.entities.Reservation;
import com.bookar.entities.ReservationSeat;
import com.bookar.entities.ReservationStatus;
import com.bookar.entities.SeatStatus;
import com.bookar.entities.SeatType;
import com.bookar.entities.Show;
import com.bookar.entities.ShowSeat;
import com.bookar.entities.ShowSeatTypePrice;
import com.bookar.entities.User;

import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ShowDao showDao;
    private final ShowSeatDao showSeatDao;
    private final ReservationDao reservationDao;
    private final ReservationSeatDao reservationSeatDao;
    private final CustomerDao customerDao;
    private final ShowSeatTypePriceDao priceDao;

    @Override
    public SeatReservationResp reserveSeats(ReservationRequestDTO req) {
    	
        Show show = showDao.findById(req.getShowId())
            .orElseThrow(() -> new ResourceNotFoundException("Show not found: " + req.getShowId()));
        User user = customerDao.findById(req.getUserId())
            .orElseThrow(() -> new ResourceNotFoundException("User not found: " + req.getUserId()));
        List<ShowSeatTypePrice> showSeatPrices = priceDao.findByShow(show);
        
        Map<SeatType, Double> seatPriceMap = new HashMap<>();
        for (ShowSeatTypePrice s : showSeatPrices) {
            seatPriceMap.put(s.getSeatType(), s.getPrice());
        }
        
        BigDecimal ticketAmount = BigDecimal.ZERO;
        System.out.println();
      
        List<ShowSeat> selectedSeats = new ArrayList<>();
        for (Long seatId : req.getShowSeatIds()) {
            ShowSeat ss = showSeatDao.findById(seatId)
                .orElseThrow(() -> new ResourceNotFoundException("Seat not found: " + seatId));
            if (ss.getSeatStatus() != SeatStatus.AVAILABLE) {
                throw new IllegalStateException("Seat already reserved/booked: " + seatId);
            }
            ss.setSeatStatus(SeatStatus.RESERVED);
            showSeatDao.save(ss);
            selectedSeats.add(ss);
            SeatType seatType = ss.getSeat().getType();
            ticketAmount = ticketAmount.add(BigDecimal.valueOf(seatPriceMap.get(seatType)));
        }
        
        
        BigDecimal total = req.getTotalAmount();
        		System.out.println(total);

        
        Reservation reservation = new Reservation();
        reservation.setShow(show);
        reservation.setUser(user);
        reservation.setReservedAt(LocalDateTime.now());
        reservation.setExpiresAt(LocalDateTime.now().plusMinutes(10));
        reservation.setReservationStatus(ReservationStatus.PENDING);
        reservation.setTotalAmount(total);
        reservationDao.save(reservation);

        
        for (ShowSeat ss : selectedSeats) {
            ReservationSeat rs = new ReservationSeat();
            rs.setReservation(reservation);
            rs.setShowSeat(ss);
            reservationSeatDao.save(rs);
        }
        
        
        
        
        SeatReservationResp dto = new SeatReservationResp();
        dto.setReservationId(reservation.getReservationId());


        return dto;
    }

    @Override
    public void expireOldReservations() {
        
        List<Reservation> expired = reservationDao
            .findByReservationStatusAndExpiresAtBefore(
                ReservationStatus.PENDING, LocalDateTime.now()
            );

        if (expired.isEmpty()) return;

     
        expired.forEach(r -> r.setReservationStatus(ReservationStatus.EXPIRED));
        reservationDao.saveAll(expired);

       
        expired.stream()
            .flatMap(reservation -> reservationSeatDao
                .findByReservation(reservation).stream()
            )
            .map(ReservationSeat::getShowSeat)
            .forEach(showSeat -> {
                showSeat.setSeatStatus(SeatStatus.AVAILABLE);
                showSeatDao.save(showSeat);
            });
    }
    
    @Override
    public ReservationResponseDTO getReservationById(Long id) {
        Optional<Reservation> optionalReservation = reservationDao.findById(id);

        if (!optionalReservation.isPresent()) {
            throw new RuntimeException("Reservation not found with ID: " + id);
        }

        Reservation reservation = optionalReservation.get();
        Show show = reservation.getShow();

      
        Map<SeatType, Double> priceMap = priceDao.findByShow(reservation.getShow())
        	    .stream()
        	    .collect(Collectors.toMap(ShowSeatTypePrice::getSeatType, ShowSeatTypePrice::getPrice));

        	BigDecimal ticketAmount = reservation.getReservationSeats()
        	    .stream()
        	    .map(rs -> BigDecimal.valueOf(priceMap.get(rs.getShowSeat().getSeat().getType())))
        	    .reduce(BigDecimal.ZERO, BigDecimal::add)
        	    .setScale(2, RoundingMode.HALF_UP);

        System.out.println(ticketAmount);
        BigDecimal fee = ticketAmount.multiply(BigDecimal.valueOf(0.10)).setScale(2, RoundingMode.HALF_UP);
        BigDecimal total = ticketAmount.add(fee).setScale(2, RoundingMode.HALF_UP);
        reservation.setTotalAmount(total);
        reservationDao.save(reservation);

        ReservationResponseDTO dto = new ReservationResponseDTO();
        dto.setReservationId(reservation.getReservationId()); 
        dto.setUserId(reservation.getUser().getId());
        dto.setShowId(reservation.getShow().getShowId());
        dto.setTheaterId(reservation.getShow().getScreen().getTheater().getTheaterId());
        dto.setShowSeatIds(
            reservation.getReservationSeats()
                .stream()
                .map(seat -> seat.getShowSeat().getShowSeatId())
                .collect(Collectors.toList())
        );
        dto.setReservedAt(reservation.getReservedAt());
        dto.setExpiresAt(reservation.getExpiresAt());
        dto.setReservationStatus(reservation.getReservationStatus().name());
        dto.setTotalAmount(ticketAmount);
        dto.setConvenienceFee(fee);
        dto.setTotalPayable(total);
        dto.setMovieName(show.getMovie().getTitle()); 
        dto.setTheaterName(show.getScreen().getTheater().getTheaterName());
        dto.setShowTime(show.getStartTime());
        System.out.println(dto);
        return dto;
    }
}

