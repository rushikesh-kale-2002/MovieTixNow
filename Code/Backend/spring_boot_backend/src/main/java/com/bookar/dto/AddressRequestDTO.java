package com.bookar.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressRequestDTO {
	   @NotBlank
	   private String addr_line1;
	   private String addr_line2;
	   @NotBlank
	   private String town_city;
	   @NotBlank
	   private String state;
	   @NotBlank
	   private String district;
	   @NotNull
	   private String pincode;
}
