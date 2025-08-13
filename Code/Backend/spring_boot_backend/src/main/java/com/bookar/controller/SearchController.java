package com.bookar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookar.dto.SearchResponseDTO;
import com.bookar.service.SearchService;

@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping
    public List<SearchResponseDTO> search(
        @RequestParam("query") String query,
        @RequestParam(value = "status", required = false) String status) {
        
        return searchService.searchAll(query, status);
    }

}


