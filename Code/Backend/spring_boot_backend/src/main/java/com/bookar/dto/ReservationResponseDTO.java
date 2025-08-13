package com.bookar.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import com.bookar.entities.ShowSeat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class ReservationResponseDTO {
	private Long reservationId;
    private Long userId;
    private Long showId;
    private Long theaterId;
    private List<Long> showSeatIds;

    private LocalDateTime reservedAt;
    private LocalDateTime expiresAt;
    private String reservationStatus;

    private BigDecimal totalAmount;
    private BigDecimal convenienceFee;
    private BigDecimal totalPayable;
	
    private String movieName;
    private String theaterName;
    private LocalTime showTime;

}
