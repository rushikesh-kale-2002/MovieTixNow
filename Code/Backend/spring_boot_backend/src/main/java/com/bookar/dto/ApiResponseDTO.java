package com.bookar.dto;

import lombok.*;

@Getter 
@Setter 
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponseDTO {
  private boolean success;
  private String message;
}
