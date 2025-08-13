package com.bookar.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserApiResponse {
	private String msg;
	private LocalDateTime timeStamp;
	
	public UserApiResponse(String message) {
		this.msg = message;
		this.timeStamp = LocalDateTime.now();
	}
}
