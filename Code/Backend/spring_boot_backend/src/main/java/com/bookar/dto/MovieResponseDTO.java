package com.bookar.dto;

import java.util.List;

import com.bookar.entities.Genre;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MovieResponseDTO {
	private Long movieId;
    private String title;
    private String posterUrl;
    private List<Genre> genres;
    private String duration;

}