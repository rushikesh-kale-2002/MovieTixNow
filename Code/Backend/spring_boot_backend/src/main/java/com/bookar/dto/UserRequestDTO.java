package com.bookar.dto;

import java.time.LocalDate;

import com.bookar.entities.Address;
import com.bookar.entities.Gender;
import com.bookar.entities.Role;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDTO {
	@NotBlank
	private String firstname;
	@NotBlank
	private String lastname;
	@NotBlank
	@Email(message = "Invalid Email Format")
	private String email;
	@NotBlank
	private String password;
	@NotBlank
	private String mobile_no;
	@NotNull
	@JsonFormat(shape = JsonFormat.Shape.STRING)
	private Gender gender;
	@NotNull
	@Past(message = "Invalid Date of Birth")
	private LocalDate dob;
	@NotNull
	@JsonFormat(shape = JsonFormat.Shape.STRING)
	private Role role; 
	@Valid
	@NotNull
	private AddressRequestDTO address;
	
}
