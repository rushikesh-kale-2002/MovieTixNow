package com.bookar.custom_exceptions;

public class InvalidCredentialsException extends RuntimeException{
	public InvalidCredentialsException(String msg) {
		super(msg);
	}
}
