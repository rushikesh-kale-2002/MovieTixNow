package com.bookar.entities;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "theaters")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Theater {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "theater_id")
    private Long theaterId;

    @Column(name = "theater_name", nullable = false)
    private String theaterName;

    @Column(name = "theater_location", nullable = false)
    private String theaterLocation;

    @Column(name = "theater_address")
    private String theaterAddress;

    // Optional owner id to link to the owner account
    @Column(name = "owner_id")
    private Long ownerId;

    // Screen count
    @Column(name = "screen_count")
    private Integer screenCount;

    @OneToMany(mappedBy = "theater", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Screen> screens;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private TheaterStatus status = TheaterStatus.PENDING;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDate createdAt;
}
