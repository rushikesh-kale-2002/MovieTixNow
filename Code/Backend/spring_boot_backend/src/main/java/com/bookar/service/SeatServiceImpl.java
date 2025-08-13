//package com.bookar.service;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.bookar.custom_exceptions.ResourceNotFoundException;
//import com.bookar.dao.ShowDao;
//import com.bookar.dao.ShowSeatDao;
//import com.bookar.dao.ShowSeatTypePriceDao;
//import com.bookar.dto.SeatResponseDTO;
//import com.bookar.entities.Seat;
//import com.bookar.entities.SeatType;
//import com.bookar.entities.Show;
//import com.bookar.entities.ShowSeat;
//import com.bookar.entities.ShowSeatTypePrice;
//
//import lombok.AllArgsConstructor;
//
//@Service
//@Transactional
//@AllArgsConstructor
//public class SeatServiceImpl implements SeatService {
//	private final ShowDao showDao;
//	private final ShowSeatDao showSeatDao;
//	private final ShowSeatTypePriceDao priceDao;
//	private final ReservationService reservationService;
//	
//	
//	@Override
//	public List<SeatResponseDTO> getSeatsForShow(Long showId, Long theaterId) {
//		 reservationService.expireOldReservations();
//		
//		 Show show = showDao.findById(showId)
//		            .orElseThrow(() -> new ResourceNotFoundException("Show not found"));
//		        List<ShowSeat> showSeat = showSeatDao.findByShowAndSeat_Screen_ScreenId(show, theaterId);
//		        
//		        List<ShowSeatTypePrice> showSeatPrices = priceDao.findByShow(show);
//		        
//		        Map<SeatType, Double> seatPriceMap = new HashMap<>();
//		        for (ShowSeatTypePrice s : showSeatPrices) {
//		            seatPriceMap.put(s.getSeatType(), s.getPrice());
//		        }
//
//
//		        return showSeat.stream().map(ss -> {
//		        	SeatResponseDTO dto = new SeatResponseDTO();
//		        	dto.setShowSeatId(ss.getShowSeatId());
//		            Seat s = ss.getSeat();
//		            SeatType seatType = s.getType();
//		            dto.setId(s.getRowLabel() + s.getSeatNumber());
//		            dto.setRow(s.getRowLabel());
//		            dto.setNumber(s.getSeatNumber());
//		            dto.setType(s.getType());
//		            dto.setPrice(seatPriceMap.getOrDefault(seatType, 0.0));
//		            dto.setStatus(ss.getSeatStatus().name().toLowerCase());
//		            return dto;
//		        }).collect(Collectors.toList());
//    }
//	
//
//}

package com.bookar.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookar.custom_exceptions.ResourceNotFoundException;
import com.bookar.dao.ShowDao;
import com.bookar.dao.ShowSeatDao;
import com.bookar.dao.ShowSeatTypePriceDao;
import com.bookar.dto.SeatResponseDTO;
import com.bookar.entities.Seat;
import com.bookar.entities.SeatType;
import com.bookar.entities.Show;
import com.bookar.entities.ShowSeat;
import com.bookar.entities.ShowSeatTypePrice;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class SeatServiceImpl implements SeatService {
    private final ShowDao showDao;
    private final ShowSeatDao showSeatDao;
    private final ShowSeatTypePriceDao priceDao;
    private final ReservationService reservationService;

    @Override
    public List<SeatResponseDTO> getSeatsForShow(Long showId, Long theaterId) {
       
        reservationService.expireOldReservations();

        
        Show show = showDao.findById(showId)
                .orElseThrow(() -> new ResourceNotFoundException("Show not found"));

       
        Long screenId = (show.getScreen() != null) ? show.getScreen().getScreenId() : null;
        if (screenId == null) {
            log.error("Screen not found for showId={}", showId);
            throw new ResourceNotFoundException("Screen for show not found");
        }

        log.info("getSeatsForShow called: showId={}, derivedScreenId={}, passedTheaterId={}", showId, screenId, theaterId);

       
        List<ShowSeat> showSeat = showSeatDao.findByShowAndSeat_Screen_ScreenId(show, screenId);
        log.info("Found {} show seats for showId={} screenId={}", showSeat.size(), showId, screenId);

      
        List<ShowSeatTypePrice> showSeatPrices = priceDao.findByShow(show);

        Map<SeatType, Double> seatPriceMap = new HashMap<>();
        for (ShowSeatTypePrice s : showSeatPrices) {
            seatPriceMap.put(s.getSeatType(), s.getPrice());
        }

    
        return showSeat.stream().map(ss -> {
            SeatResponseDTO dto = new SeatResponseDTO();
            dto.setShowSeatId(ss.getShowSeatId());
            Seat s = ss.getSeat();
            SeatType seatType = s.getType();
            dto.setId(s.getRowLabel() + s.getSeatNumber());
            dto.setRow(s.getRowLabel());
            dto.setNumber(s.getSeatNumber());
            dto.setType(s.getType());
            dto.setPrice(seatPriceMap.getOrDefault(seatType, 0.0));
            dto.setStatus(ss.getSeatStatus().name().toLowerCase());
            return dto;
        }).collect(Collectors.toList());
    }
}
