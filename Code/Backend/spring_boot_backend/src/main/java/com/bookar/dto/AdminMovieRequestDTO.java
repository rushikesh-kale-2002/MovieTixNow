package com.bookar.dto;

import java.time.LocalDate;
import java.util.List;

import com.bookar.entities.Genre;
import com.bookar.entities.MovieCast;
import com.bookar.entities.MovieStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AdminMovieRequestDTO {
    private String title;
    private String description;
    private List<Genre> genres;  
    private String language;
    private LocalDate releaseDate;
    private String duration;
    private String posterUrl;
    private String trailerUrl;
    private MovieStatus status;   
    private List<MovieCast> cast;
    private Double rating;

}
