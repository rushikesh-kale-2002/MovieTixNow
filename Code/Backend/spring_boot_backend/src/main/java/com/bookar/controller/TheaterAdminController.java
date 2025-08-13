package com.bookar.controller;


import com.bookar.entities.Theater;
import com.bookar.service.TheaterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin/theaters")
@RequiredArgsConstructor
public class TheaterAdminController {

    private final TheaterService theaterService;

    // ✅ Get all theaters
    @GetMapping
    public ResponseEntity<List<Theater>> getAllTheaters() {
        return ResponseEntity.ok(theaterService.getAllTheaters());
    }

    // ✅ Delete theater by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTheater(@PathVariable Long id) {
        theaterService.deleteTheater(id);
        return ResponseEntity.ok("Theater deleted successfully");
    }
}

