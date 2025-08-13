package com.bookar.controller;

import com.bookar.dto.*;
import com.bookar.dto.UserDTO;
import com.bookar.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*")

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/dashboard-stats")
    public DashboardStatsDTO getDashboardStats() {
        return adminService.fetchDashboardStats();
    }

    @GetMapping("/users")
    public List<UserDTO> getUsers() {
        return adminService.fetchAllUsers();
    }

    @PostMapping("/users/{id}/toggle-status")
    public UserDTO toggleUserStatus(@PathVariable Long id) {
        return adminService.toggleUserStatus(id);
    }
    @GetMapping("/movies")
    public List<AdminMovieResponseDTO> getAllMovies() {
        return adminService.fetchAllMovies();
    }
    @GetMapping("/movies/{id}")
    public AdminMovieResponseDTO getMovieById(@PathVariable Long id) {
        return adminService.fetchMovieById(id);
    }
    @PostMapping("/movies")
    public AdminMovieResponseDTO addMovie(@RequestBody AdminMovieRequestDTO movieRequestDTO) {
        return adminService.addMovie(movieRequestDTO);
    }
    @PutMapping("/movies/{id}")
    public AdminMovieResponseDTO updateMovie(
            @PathVariable Long id,
            @RequestBody AdminMovieRequestDTO movieRequestDTO
    ) {
        return adminService.updateMovie(id, movieRequestDTO);
    }
    @DeleteMapping("/movies/{id}")
    public void deleteMovie(@PathVariable Long id) {
        adminService.deleteMovie(id);
    }
    
    
}
