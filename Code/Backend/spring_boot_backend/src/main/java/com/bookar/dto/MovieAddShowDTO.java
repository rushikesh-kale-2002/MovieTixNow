package com.bookar.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class MovieAddShowDTO {
    private Long id;
    private String title;
    private String duration;
}
