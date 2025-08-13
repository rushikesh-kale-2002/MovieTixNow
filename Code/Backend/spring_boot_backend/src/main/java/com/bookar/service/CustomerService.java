package com.bookar.service;

import com.bookar.dto.UserApiResponse;

import java.util.List;

import com.bookar.dto.BookingResponseDTO;
import com.bookar.dto.SignInDTO;
import com.bookar.dto.UserAddressDTO;
import com.bookar.dto.UserRequestDTO;
import com.bookar.dto.UserResponseDTO;
import com.bookar.dto.updatePasswordDTO;
import com.bookar.entities.User;

public interface CustomerService {
	UserResponseDTO signUp(UserRequestDTO newUser);
	UserResponseDTO signIn(SignInDTO details);
	User updateDetails(User user);
	UserResponseDTO getDetailsById(Long id);
	UserApiResponse updatePassword(updatePasswordDTO newPass);  
	UserResponseDTO getCompleteDetails(String Email);
	List<BookingResponseDTO> getBookingsForUser(Long userId);
}
