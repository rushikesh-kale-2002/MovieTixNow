package com.bookar.service;

import java.util.List;

import com.bookar.dto.MovieAddShowDTO;
import com.bookar.dto.MovieDetailDTO;
import com.bookar.dto.MovieHomeResponseDTO;
import com.bookar.dto.MovieResponseDTO;
import com.bookar.entities.Genre;
import com.bookar.entities.MovieStatus;

public interface MovieService {
	MovieResponseDTO getMovieById(Long id);	
	List<String> getLocationsForMovie(Long movieid);
	MovieDetailDTO getMovieDetailsById(Long id);
	List<MovieHomeResponseDTO> getAllMovies();
    List<MovieHomeResponseDTO> getMoviesByGenre(List<Genre> genres);
    List<MovieHomeResponseDTO> getMoviesByStatus(MovieStatus status);
    List<MovieAddShowDTO> getAllMoviesForShows();

}

