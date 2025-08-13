package com.bookar.entities;

import java.time.LocalDate;
import java.time.LocalTime;
import org.hibernate.annotations.CreationTimestamp;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="shows")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Show {
  @Id 
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="show_id")
  private Long showId;

  @Column(name = "show_date", nullable = false)
  private LocalDate showDate;

  @Column(name = "start_time", nullable = false)
  private LocalTime startTime;
  
  @Enumerated(EnumType.STRING)
  @Column(name = "show_status",length = 20, nullable = false)
  private ShowStatus showStatus; // Replaces isAvailable

  @ManyToOne
  @JoinColumn(name = "movie_id")
  private Movie movie;
  
  @ManyToOne
  @JoinColumn(name = "screen_id")
  private Screen screen;
  
  @CreationTimestamp
  @Column(name="created_at")
  private LocalDate createdAt;
}