package com.bookar.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class updatePasswordDTO {
	private Long id;
	private String oldPassword;
	private String newPassword;
}
