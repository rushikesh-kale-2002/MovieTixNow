package com.bookar.service;

import com.bookar.dao.MovieDao;
import com.bookar.dto.MovieHomeResponseDTO;
import com.bookar.dto.MovieResponseDTO;
import com.bookar.dto.SearchResponseDTO;
import com.bookar.entities.Genre;
import com.bookar.entities.Movie;
import com.bookar.service.SearchService;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class SearchServiceImpl implements SearchService {

    @Autowired
    private MovieDao movieDao;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    @Transactional
    public List<SearchResponseDTO> searchAll(String keyword, String status) {
        List<SearchResponseDTO> results = new ArrayList<>();
        Set<Long> addedMovieIds = new HashSet<>();

        // 1. Search movies by title
        movieDao.findByTitleContainingIgnoreCase(keyword).forEach(movie -> {
            if (status == null || movie.getStatus().name().equalsIgnoreCase(status)) {
            	MovieHomeResponseDTO dto = modelMapper.map(movie, MovieHomeResponseDTO.class);
                results.add(new SearchResponseDTO("movie", dto.getMovieId(), dto.getTitle(), dto));
                addedMovieIds.add(dto.getMovieId());
            }
        });

        // 2. (Optional) Search theaters (if status not applied)
        // if (status == null || status.trim().isEmpty()) {
        //     theaterDao.findByTheaterNameContainingIgnoreCase(keyword).forEach(theater -> {
        //         TheaterResponseDTO dto = modelMapper.map(theater, TheaterResponseDTO.class);
        //         results.add(new SearchResponseDTO("theater", dto.getId(), dto.getName(), null, dto));
        //     });
        // }

        // 3. Search movies by genre
        try {
            Genre genreEnum = Genre.valueOf(keyword.trim().toUpperCase());
            movieDao.findByGenresIn(List.of(genreEnum)).forEach(movie -> {
                if (
                    (!addedMovieIds.contains(movie.getMovieId())) &&
                    (status == null || movie.getStatus().name().equalsIgnoreCase(status))
                ) {
                	MovieHomeResponseDTO dto = modelMapper.map(movie, MovieHomeResponseDTO.class);
                    results.add(new SearchResponseDTO("movie", dto.getMovieId(), dto.getTitle(), dto));
                    addedMovieIds.add(dto.getMovieId());
                }
            });
        } catch (IllegalArgumentException ex) {
            // not a valid genre, ignore
        }

        return results;
    }
}
