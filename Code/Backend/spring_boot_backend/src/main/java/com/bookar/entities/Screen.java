package com.bookar.entities;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="screens")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Screen {
  @Id 
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name="screen_id" ,  nullable = false)
  private Long screenId;
  
  @Column(name="screen_no",  nullable = false)
  private String screenNumber; 

  @ManyToOne
  @JoinColumn(name = "theater_id" ,  nullable = false)
  private Theater theater;

  @OneToMany(mappedBy = "screen")
  private List<Show> shows;
  
  @CreationTimestamp
  @Column(name="created_at")
  private LocalDate createdAt;
}
