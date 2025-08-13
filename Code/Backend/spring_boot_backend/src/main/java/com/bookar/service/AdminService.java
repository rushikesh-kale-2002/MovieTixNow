package com.bookar.service;

import com.bookar.dto.*;
import java.util.List;

public interface AdminService {
	DashboardStatsDTO fetchDashboardStats();
    List<UserDTO> fetchAllUsers();
    UserDTO toggleUserStatus(Long userId);
    
    //manage movies 
    List<AdminMovieResponseDTO> fetchAllMovies();
    AdminMovieResponseDTO fetchMovieById(Long id);
    AdminMovieResponseDTO addMovie(AdminMovieRequestDTO dto);
    AdminMovieResponseDTO updateMovie(Long id, AdminMovieRequestDTO dto);
    void deleteMovie(Long id);

}
