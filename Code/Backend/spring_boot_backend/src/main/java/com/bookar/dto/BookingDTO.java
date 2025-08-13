package com.bookar.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingDTO {
private Long id;
private String paymentId;
private LocalDateTime bookingTime;
private Long reservationId;
private Long userId;
private String username;
private String showTime;
private String movieName;
private String theatreName;
private List<String> seatNumbers;
private String movieDate;
//public BookingDTO(Long id, String paymentId, LocalDateTime bookingTime, Long reservationId, Long userId) {
//    this.id = id;
//    this.paymentId = paymentId;
//    this.bookingTime = bookingTime;
//    this.reservationId = reservationId;
//    this.userId = userId;
//}

public BookingDTO(Long id, String paymentId, LocalDateTime bookingTime,
        Long reservationId, Long userId,
        String username, String showTime,
        String movieName, String theatreName,List<String> seatNumbers,String movieDate) {
this.id = id;
this.paymentId = paymentId;
this.bookingTime = bookingTime;
this.reservationId = reservationId;
this.userId = userId;
this.username = username;
this.showTime = showTime;
this.movieName = movieName;
this.theatreName = theatreName;
this.seatNumbers = seatNumbers;
this.movieDate=movieDate;
}

}