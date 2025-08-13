package com.bookar.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bookar.dto.MovieAddShowDTO;
import com.bookar.dto.MovieDetailDTO;
import com.bookar.dto.MovieHomeResponseDTO;
import com.bookar.dto.MovieResponseDTO;
import com.bookar.entities.Genre;
import com.bookar.entities.MovieStatus;
import com.bookar.service.MovieService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("user/movies")
@AllArgsConstructor
public class MovieController {
	
	private final MovieService movieService;
	
	@GetMapping("/{id}")
    public ResponseEntity<MovieResponseDTO> getMovieById(@PathVariable Long id) {
        MovieResponseDTO dto = movieService.getMovieById(id);
        return ResponseEntity.ok(dto);
    }
	
	@GetMapping("/{movieId}/locations")
    public ResponseEntity<List<String>> getLocationsForMovie(@PathVariable Long movieId) {
        List<String> locations = movieService.getLocationsForMovie(movieId);
        return ResponseEntity.ok(locations);
    }
	
	@GetMapping("/details/{id}")
	public ResponseEntity<MovieDetailDTO> getMovieDetailsById(@PathVariable Long id) {
		MovieDetailDTO dto = movieService.getMovieDetailsById(id);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping
    public List<MovieHomeResponseDTO> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/genre/{genre}")
    public List<MovieHomeResponseDTO> getMoviesByGenre(@PathVariable List<Genre> genres) {
        return movieService.getMoviesByGenre(genres);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<MovieHomeResponseDTO>> getMoviesByStatus(@PathVariable MovieStatus status) {
        return ResponseEntity.ok(movieService.getMoviesByStatus(status));
    }
    @GetMapping("/shows")
    public ResponseEntity<List<MovieAddShowDTO>> listAllMovies() {
        return ResponseEntity.ok(movieService.getAllMoviesForShows());
    }


}
