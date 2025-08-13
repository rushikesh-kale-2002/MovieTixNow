package com.bookar.service;

import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bookar.custom_exceptions.ResourceNotFoundException;
import com.bookar.dao.MovieDao;
import com.bookar.dao.ShowDao;
import com.bookar.dto.MovieDetailDTO;
import com.bookar.dto.MovieHomeResponseDTO;
import com.bookar.dto.MovieResponseDTO;
import com.bookar.dto.MovieAddShowDTO;
import com.bookar.dto.MovieCastDTO;
import com.bookar.entities.Genre;
import com.bookar.entities.Movie;
import com.bookar.entities.MovieCast;
import com.bookar.entities.MovieStatus;

import lombok.AllArgsConstructor;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class MovieServiceImpl implements MovieService {
	private final MovieDao movieDao;
	private final ShowDao showDao;
	private final ModelMapper modelMapper;

	@Override
	public MovieResponseDTO getMovieById(Long id) {
		Movie movie = movieDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + id));
		return modelMapper.map(movie, MovieResponseDTO.class);
	}

	@Override
	public List<String> getLocationsForMovie(Long movieId) {
		return showDao.findDistinctLocationsByMovieId(movieId);
	}

	@Override
	public MovieDetailDTO getMovieDetailsById(Long id) {
		Movie movie = movieDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + id));

		modelMapper.typeMap(MovieCast.class, MovieCastDTO.class);

		return modelMapper.map(movie, MovieDetailDTO.class);
	}

	@Override
	@Transactional
	public List<MovieHomeResponseDTO> getAllMovies() {
		return movieDao.findAll().stream().map(movie -> modelMapper.map(movie, MovieHomeResponseDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	@Transactional(readOnly = true)
	public List<MovieHomeResponseDTO> getMoviesByGenre(List<Genre> genres) {
		return movieDao.findByGenresIn(genres).stream().map(movie -> modelMapper.map(movie, MovieHomeResponseDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	@Transactional(readOnly = true)
	public List<MovieHomeResponseDTO> getMoviesByStatus(MovieStatus status) {
		return movieDao.findByStatus(status).stream().map(movie -> modelMapper.map(movie, MovieHomeResponseDTO.class))
				.collect(Collectors.toList());
	}
	@Override
	public List<MovieAddShowDTO> getAllMoviesForShows() {
	    return movieDao.findAll().stream()
	        .map(m -> new MovieAddShowDTO(m.getMovieId(), m.getTitle(), m.getDuration()))
	        .collect(Collectors.toList());
	}

}
