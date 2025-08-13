package com.bookar.exception_handler;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bookar.custom_exceptions.ApiException;
import com.bookar.custom_exceptions.InvalidCredentialsException;
import com.bookar.dto.UserApiResponse;

import io.jsonwebtoken.ExpiredJwtException;


@RestControllerAdvice
public class GlobalExceptionHandler {
		@ExceptionHandler(ApiException.class)
		public ResponseEntity<?> handleApiException(ApiException e) {
			System.out.println("in handle api exc");
			return ResponseEntity.status(HttpStatus.CONFLICT).body(new UserApiResponse(e.getMessage()));
		}
		
		@ExceptionHandler(InvalidCredentialsException.class)
		public ResponseEntity<?> handleInvalidCredentialsException(InvalidCredentialsException e) {
			System.out.println("in handle api exc");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new UserApiResponse(e.getMessage()));
		}
		
		@ExceptionHandler(Exception.class)
		public ResponseEntity<?> handleException(Exception e) {
			System.out.println("in catch all exc " + e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UserApiResponse(e.getMessage()));
		}
		
		@ExceptionHandler(MethodArgumentNotValidException.class)
		public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
			System.out.println("in catch all exc " + e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UserApiResponse("Oops! Looks like the format isn’t quite right. Please check and try again."));
		}
		
		@ExceptionHandler(DataIntegrityViolationException.class)
	    public ResponseEntity<?> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
	    }
		
		@ExceptionHandler(ExpiredJwtException.class)
		public ResponseEntity<?> handleExpiredJwtException(ExpiredJwtException ex){
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
		}
}
