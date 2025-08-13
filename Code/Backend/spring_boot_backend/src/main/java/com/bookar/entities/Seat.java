package com.bookar.entities;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "seats")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude="screen")
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="seat_id")
    private Long seatId;

    @Column(name="row_label",nullable = false)
    private String rowLabel;

    @Column(name="seat_number",nullable = false)
    private int seatNumber;

    @Enumerated(EnumType.STRING)
    @Column(name="seat_type",nullable = false)
    private SeatType type;      

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "screen_id", nullable = false)
    private Screen screen;

     @OneToMany(mappedBy = "seat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ShowSeat> showSeats;


}
