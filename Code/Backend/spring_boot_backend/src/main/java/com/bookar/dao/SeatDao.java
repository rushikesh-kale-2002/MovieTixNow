package com.bookar.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookar.entities.Seat;

public interface SeatDao extends JpaRepository<Seat, Long> {
    List<Seat> findByScreen_ScreenId(Long screenId); 
	void deleteByScreen_ScreenId(Long screenId);
 }
