package com.bookar.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookar.entities.Genre;
import com.bookar.entities.Movie;
import com.bookar.entities.MovieStatus;

public interface MovieDao extends JpaRepository<Movie, Long> {
	List<Movie> findByTitleContainingIgnoreCase(String keyword);

	List<Movie> findByGenresIn(List<Genre> genres);

	List<Movie> findByStatus(MovieStatus status);

}
