package com.bookar.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "reservation_seats")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude={"reservation","showSeat"})
public class ReservationSeat {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="reservation_seat_id")
    private Long reservationSeatId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservation_id", nullable = false)
    private Reservation reservation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "show_seat_id", nullable = false)
    private ShowSeat showSeat;

}
