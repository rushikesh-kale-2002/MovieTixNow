package com.bookar.custom_exceptions;

public class ApiException extends RuntimeException{
	public ApiException(String msg) {
		super(msg);
	}
}
