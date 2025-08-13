package com.bookar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bookar.dto.BookingResponseDTO;
import com.bookar.dto.SignInDTO;
import com.bookar.dto.UserRequestDTO;
import com.bookar.dto.UserResponseDTO;
import com.bookar.dto.updatePasswordDTO;
import com.bookar.entities.User;
import com.bookar.security.JwtUtil;
import com.bookar.service.CustomerService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class CustomerController {
	private CustomerService customerService;
	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private JwtUtil jwtUtil;
	
	
	@PostMapping("/signin")
    @ResponseBody
    public ResponseEntity<?> userSignIn(@RequestBody SignInDTO details) {
//        return ResponseEntity.status(HttpStatus.OK).body(customerService.signIn(details));
		Authentication auth = new UsernamePasswordAuthenticationToken(details.getEmail(), details.getPassword());
		auth = authManager.authenticate(auth);
		String token = jwtUtil.createToken(auth);
		return ResponseEntity.ok(token);
    }
	
	@PostMapping("/signup")
	public ResponseEntity<?> userSignUp(@Valid @RequestBody UserRequestDTO newUser) {
		UserResponseDTO user = customerService.signUp(newUser);
		Authentication auth = new UsernamePasswordAuthenticationToken(user.getEmail(), newUser.getPassword());
		auth = authManager.authenticate(auth); // triggers UserDetailsService
		String token = jwtUtil.createToken(auth);
		return ResponseEntity.status(HttpStatus.CREATED).body(token);
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> userUpdateDetails(@RequestBody User upUser) {
		return ResponseEntity.status(HttpStatus.CREATED).body(customerService.updateDetails(upUser));
	}
	
	@GetMapping("/profile")
	public ResponseEntity<?> getDetailsById(@RequestHeader("Authorization") String authHeader){
		String token = authHeader.replace("Bearer", "").trim();
		Long id = jwtUtil.extractId(token);
		return ResponseEntity.status(HttpStatus.OK).body(customerService.getDetailsById(id));
	}
	
	@PostMapping("/password")
	public ResponseEntity<?> updatePassword(@RequestBody updatePasswordDTO newPass){
		return ResponseEntity.status(HttpStatus.CREATED).body(customerService.updatePassword(newPass));
	}
	
	@GetMapping("/bookings")
    public List<BookingResponseDTO> getBookings(@RequestHeader("Authorization") String authHeader) {
		String token = authHeader.replace("Bearer", "").trim();
		Long id = jwtUtil.extractId(token);
        return customerService.getBookingsForUser(id);
    }
}
