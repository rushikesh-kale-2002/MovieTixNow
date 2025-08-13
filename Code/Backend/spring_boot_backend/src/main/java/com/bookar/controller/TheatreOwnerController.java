package com.bookar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookar.entities.Show;
import com.bookar.security.JwtUtil;
import com.bookar.dto.TheaterShowManageDTO;
import com.bookar.dto.TheatreDashboardDTO;

import java.util.List;
import java.util.stream.Collectors;

import com.bookar.service.CustomerService;
import com.bookar.service.ShowService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class TheatreOwnerController {
	private ShowService showService;
	@Autowired
	private JwtUtil jwtUtil;
	@GetMapping("/shows/manage/")
	public ResponseEntity<List<TheaterShowManageDTO>> getAllShows(@RequestHeader("Authorization") String authHeader) {
		String token = authHeader.replace("Bearer", "").trim();
		Long id = jwtUtil.extractId(token);
		System.out.println("ID: "+id);	   
		List<TheaterShowManageDTO> stats = showService.getShowManagementDetails(id);
        return ResponseEntity.ok(stats);
	    
	}
	
	@DeleteMapping("/{showId}")
    public ResponseEntity<String> deleteShow(@PathVariable Long showId) {
        showService.deleteShow(showId);
        return ResponseEntity.ok("Show deleted successfully.");
    }

    @PutMapping("/{showId}/activate")
    public ResponseEntity<String> activateShow(@PathVariable Long showId) {
        showService.activateShow(showId);
        return ResponseEntity.ok("Show activated successfully.");
    }

    @PutMapping("/{showId}/deactivate")
    public ResponseEntity<String> deactivateShow(@PathVariable Long showId) {
        showService.deactivateShow(showId);
        return ResponseEntity.ok("Show deactivated successfully.");
    }
    
    @GetMapping("/dashboard/")
    public ResponseEntity<TheatreDashboardDTO> getOwnerDashboard(@RequestHeader("Authorization") String authHeader) {
    	String token = authHeader.replace("Bearer", "").trim();
		Long id = jwtUtil.extractId(token);
		System.out.println("ID: "+id);	   
        TheatreDashboardDTO dashStats = showService.getOwnerDashboardStats(id);
        return ResponseEntity.status(HttpStatus.OK).body(dashStats);
    }

}
