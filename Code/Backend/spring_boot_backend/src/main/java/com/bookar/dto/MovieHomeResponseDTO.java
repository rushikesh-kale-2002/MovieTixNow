package com.bookar.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

import com.bookar.entities.Genre;
import com.bookar.entities.Movie;
import com.bookar.entities.MovieStatus;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovieHomeResponseDTO {
	private Long movieId;
	private String title;
	private String description;
	private String posterUrl;
	private String language;
	private LocalDate releaseDate;
	private MovieStatus status;
	private List<Genre> genres;
	private double rating;
	private String duration;

}