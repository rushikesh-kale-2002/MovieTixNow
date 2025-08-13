package com.bookar.service;

import com.bookar.dto.SearchResponseDTO;
import java.util.List;

public interface SearchService {
    List<SearchResponseDTO> searchAll(String keyword, String status);
}

