package com.bookar.entities;

import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "show_seats",
       uniqueConstraints = @UniqueConstraint(columnNames = {"show_id","seat_id"}))
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude={"show","seat"})
public class ShowSeat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="show_seat_id")
    private Long showSeatId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "show_id", nullable = false)
    private Show show;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seat_id", nullable = false)
    private Seat seat;

    @Enumerated(EnumType.STRING)
    @Column(name="seat_status",nullable = false)
    private SeatStatus seatStatus;  

    @OneToMany(mappedBy = "showSeat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReservationSeat> reservationSeats;
}
