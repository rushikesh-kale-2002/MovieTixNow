package com.bookar.dto;

import java.time.LocalDate;
import java.util.List;

import com.bookar.entities.Genre;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MovieDetailDTO {
    private Long movieId;
    private String title;
    private String description;
    private String language;
    private List<Genre> genres;
    private String duration;
    private LocalDate releaseDate;
    private String posterUrl;
    private String trailerUrl;
    private Double rating;
    private List<MovieCastDTO> cast;

}
