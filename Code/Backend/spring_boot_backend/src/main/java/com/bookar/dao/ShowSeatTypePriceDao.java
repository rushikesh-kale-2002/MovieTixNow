package com.bookar.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookar.entities.SeatType;
import com.bookar.entities.Show;
import com.bookar.entities.ShowSeatTypePrice;

public interface ShowSeatTypePriceDao extends JpaRepository<ShowSeatTypePrice, Long> {

    @Query("SELECT s.seatType, s.price FROM ShowSeatTypePrice s WHERE s.id = :showId")
    List<Object[]> findAllPricesByShowId(@Param("showId") Long showId);

    default Map<String, Double> findPricesByShowId(Long showId) {
        List<Object[]> list = findAllPricesByShowId(showId);
        Map<String, Double> map = new HashMap<>();
        for (Object[] row : list) {
        	map.put(((SeatType) row[0]).name(), (Double) row[1]);
        }
        return map;
    }

    List<ShowSeatTypePrice> findByShow(Show show);
}