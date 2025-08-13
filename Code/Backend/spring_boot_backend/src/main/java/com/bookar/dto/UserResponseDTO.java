package com.bookar.dto;

import java.time.LocalDate;

import com.bookar.entities.Address;
import com.bookar.entities.Gender;
import com.bookar.entities.Role;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserResponseDTO {
	private Long id;
	private String firstname;
	private String lastname;
	private String email;
	private String password;
	private String mobile_no;
	private Gender gender;
	private LocalDate dob;
	private Role role;
	private AddressResponseDTO address;
}
