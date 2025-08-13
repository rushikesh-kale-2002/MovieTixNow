package com.bookar.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressResponseDTO {
	
	private String addr_line1;
	private String addr_line2;
	private String town_city;
	private String state;
	private String district;
	private String pincode;
}
