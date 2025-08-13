package com.bookar.dto;

import java.time.LocalDate;

import com.bookar.entities.Gender;
import com.bookar.entities.Role;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private LocalDate registrationDate;
    private int totalBookings;
    private String status;

}
