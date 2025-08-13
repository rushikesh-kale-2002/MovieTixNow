package com.bookar.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

import com.bookar.entities.Genre;
import com.bookar.entities.MovieStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminMovieResponseDTO {
    private Long movieId;
    private String title;
    private List<Genre> genres;
    private LocalDate releaseDate;
    private String language;
    private String posterUrl;
    private MovieStatus status;
    private Double rating;

}
