package com.bookar.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookar.entities.Show;
import com.bookar.entities.ShowSeat;

public interface ShowSeatDao extends JpaRepository<ShowSeat, Long> {
    List<ShowSeat> findByShowAndSeat_Screen_ScreenId(Show show, Long screenId);
    Optional<ShowSeat> findByShowAndSeat_RowLabelAndSeat_SeatNumber(Show show, String rowLabel, int seatNumber);
}
