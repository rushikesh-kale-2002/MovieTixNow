package com.bookar;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.bookar.dto.MovieResponseDTO;
import com.bookar.entities.Movie;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	@Bean
	public ModelMapper modelMapper() {
		System.out.println("in model mapper creation");
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration()
				.setMatchingStrategy(MatchingStrategies.STRICT)
				.setPropertyCondition(Conditions.isNotNull());
		
		mapper.typeMap(Movie.class, MovieResponseDTO.class)
        .addMapping(Movie::getMovieId, MovieResponseDTO::setMovieId)
        .addMapping(Movie::getPosterUrl, MovieResponseDTO::setPosterUrl)
        .addMapping(Movie::getGenres, MovieResponseDTO::setGenres);
		return mapper;

	}
	
	

}
