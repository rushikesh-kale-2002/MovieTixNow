package com.bookar.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bookar.dto.CreateShowDTO;
import com.bookar.dto.ShowDetailsDTO;
import com.bookar.dto.TheaterShowDTO;
import com.bookar.service.ShowService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/shows")
//@CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class ShowController {

   
    private ShowService showService;

    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<TheaterShowDTO>> getShowsByMovieDateAndLocation(
        @PathVariable Long movieId,
        @RequestParam LocalDate date,
        @RequestParam String location
    ) {
        List<TheaterShowDTO> result = showService.getTheatersWithShows(movieId, date, location);
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/{showId}/details")
    public ShowDetailsDTO getShowDetails(@PathVariable Long showId) {
        return showService.getShowDetails(showId);
    }

    @PostMapping("/theaters/{theaterId}")
    public ResponseEntity<?> addShow(
        @PathVariable Long theaterId,
        @RequestBody CreateShowDTO dto) {
      showService.createShowWithLayout(theaterId, dto);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
