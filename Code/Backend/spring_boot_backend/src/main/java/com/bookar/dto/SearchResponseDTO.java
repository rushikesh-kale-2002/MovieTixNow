package com.bookar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

public class SearchResponseDTO {
    private String type; // "movie" or "theater"
    private Long id;
    private String title;
    private MovieHomeResponseDTO movieDetails;
//    private TheaterResponseDto theaterDetails;

    public SearchResponseDTO(String type, Long id, String title, MovieHomeResponseDTO movieDetails) {
        this.type = type;
        this.id = id;
        this.title = title;
        this.movieDetails = movieDetails;
    }
}
