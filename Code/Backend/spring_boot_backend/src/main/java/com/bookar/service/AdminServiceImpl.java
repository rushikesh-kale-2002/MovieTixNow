package com.bookar.service;

import com.bookar.dto.AdminMovieRequestDTO;
import com.bookar.dto.AdminMovieResponseDTO;
import com.bookar.dto.DashboardStatsDTO;
import com.bookar.dto.UserDTO;
import com.bookar.entities.Booking;
import com.bookar.entities.Movie;
import com.bookar.entities.User;
import com.bookar.dao.*;
import com.bookar.service.AdminService;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class AdminServiceImpl implements AdminService {

    private final UserDao userDao;
    private final MovieDao movieDao;
    private final TheatreDao theatreDao;
    private final BookingDao bookingDao;
    private final ModelMapper modelMapper;


    public AdminServiceImpl(UserDao userDao, MovieDao movieDao,
                            TheatreDao theatreDao, BookingDao bookingDao, ModelMapper modelMapper) {
        this.userDao = userDao;
        this.movieDao = movieDao;
        this.theatreDao = theatreDao;
        this.bookingDao = bookingDao;
        this.modelMapper = modelMapper;

    }
    @Override
    public DashboardStatsDTO fetchDashboardStats() {
        DashboardStatsDTO dto = new DashboardStatsDTO();
        dto.setTotalMovies((int) movieDao.count());
        dto.setTotalUsers((int) userDao.count());
        dto.setTotalTheaters((int) theatreDao.count());
        dto.setTotalBookings((int) bookingDao.count());
        dto.setTodayRevenue(bookingDao.getTodayRevenue(LocalDate.now()));
        dto.setOccupancyRate(bookingDao.calculateOccupancyRate());
        return dto;
    }

    @Override
    public List<UserDTO> fetchAllUsers() {
        return userDao.findAll().stream().map(user -> {
            UserDTO dto = new UserDTO();
            dto.setId(user.getId());
            dto.setName(user.getFirstname() + " " + user.getLastname());
            dto.setEmail(user.getEmail());
            dto.setPhone(user.getMobile_no());
            dto.setRegistrationDate(user.getCreatedAt());
            dto.setTotalBookings(bookingDao.countByUserId(user.getId()));
            dto.setStatus(user.getStatus()); // Use status field directly
            return dto;
        }).collect(Collectors.toList());
    }

    
    @Override
    public UserDTO toggleUserStatus(Long userId) {
        User user = userDao.findById(userId);
        if (user == null) {
            throw new RuntimeException("User not found with ID: " + userId);
        }

        String newStatus = user.getStatus().equalsIgnoreCase("active") ? "blocked" : "active";
        
        userDao.updateStatus(userId, newStatus); // Custom update method
        
        // Update the user object locally as well
        user.setStatus(newStatus);

        return fetchAllUsers().stream()
            .filter(u -> u.getId().equals(userId))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Updated user not found"));
    }

    //manage movies service impl
    
    @Override
    public List<AdminMovieResponseDTO> fetchAllMovies() {
        return movieDao.findAll()
                .stream()
                .map(movie -> modelMapper.map(movie, AdminMovieResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public AdminMovieResponseDTO fetchMovieById(Long id) {
        Movie movie = movieDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));
        return modelMapper.map(movie, AdminMovieResponseDTO.class);
    }

    @Override
    public AdminMovieResponseDTO addMovie(AdminMovieRequestDTO movieDTO) {
        Movie movie = modelMapper.map(movieDTO, Movie.class);
        Movie saved = movieDao.save(movie);
        return modelMapper.map(saved, AdminMovieResponseDTO.class);
    }

    @Override
    public AdminMovieResponseDTO updateMovie(Long id, AdminMovieRequestDTO AdminMovieResponseDTO) {
        Movie movie = movieDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        // Update only non-null fields
        modelMapper.map(AdminMovieResponseDTO, movie);

        Movie updated = movieDao.save(movie);
        return modelMapper.map(updated, AdminMovieResponseDTO.class);
    }

    @Override
    public void deleteMovie(Long id) {
        if (!movieDao.existsById(id)) {
            throw new RuntimeException("Movie not found");
        }
        movieDao.deleteById(id);
    }

}
