package com.bookar.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.hibernate.type.internal.UserTypeSqlTypeAdapter;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bookar.custom_exceptions.ApiException;
import com.bookar.custom_exceptions.InvalidCredentialsException;
import com.bookar.custom_exceptions.ResourceNotFoundException;
import com.bookar.dao.CustomerDao;
import com.bookar.dto.UserApiResponse;
import com.bookar.dto.BookingDetailsDTO;
import com.bookar.dto.BookingResponseDTO;
import com.bookar.dto.SeatDTO;
import com.bookar.dto.SignInDTO;
import com.bookar.dto.UserAddressDTO;
import com.bookar.dto.UserRequestDTO;
import com.bookar.dto.UserResponseDTO;
import com.bookar.dto.updatePasswordDTO;
import com.bookar.entities.User;
import com.bookar.security.SecurityConfig;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class CustomerServiceImpl implements CustomerService
{
	private ModelMapper mapper;
	private final CustomerDao custDao;
	private PasswordEncoder passwordEncoder;
	
	@Override
	public UserResponseDTO signUp(UserRequestDTO newUser) {
		if(custDao.existsByEmail(newUser.getEmail()))
			throw new ApiException("User Already Exists..!");
		
		User user = mapper.map(newUser, User.class);
		String hashPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(hashPassword);
		return mapper.map(custDao.save(user), UserResponseDTO.class);
	}

	@Override
	public UserResponseDTO getCompleteDetails(String Email) {
		User user = custDao.findByEmail(Email);
		return mapper.map(user, UserResponseDTO.class);
	}

	@Override
	public UserResponseDTO signIn(SignInDTO details) {
		User user = custDao.findByEmail(details.getEmail());
		if(user == null)
			throw new ApiException("Invalid Email !!");
		    // Check if raw password matches the encoded one
		if (!passwordEncoder.matches(details.getPassword(), user.getPassword())) {
		        throw new InvalidCredentialsException("Invalid Email or Password !!!");
		}

		    return mapper.map(user, UserResponseDTO.class);
	}

	@Override
	public User updateDetails(User upUser) {
		User user = custDao.findById(upUser.getId()).orElseThrow(() -> new ApiException("User Not Found..!"));
		if(!(upUser.getAddress().equals(user.getAddress()))) {
			user.getAddress().setAddr_line1(upUser.getAddress().getAddr_line1());
			user.getAddress().setAddr_line2(upUser.getAddress().getAddr_line2());
			user.getAddress().setTown_city(upUser.getAddress().getTown_city());
			user.getAddress().setDistrict(upUser.getAddress().getDistrict());
			user.getAddress().setState(upUser.getAddress().getState());
			user.getAddress().setPincode(upUser.getAddress().getPincode());
		}
		user.setDob(upUser.getDob());
		user.setEmail(upUser.getEmail());
		user.setLastname(upUser.getLastname());
		user.setFirstname(upUser.getFirstname());
		user.setGender(upUser.getGender());
		user.setMobile_no(upUser.getMobile_no());
		user.setPassword(upUser.getPassword());
		return custDao.save(user);
	}

	
	
	
	@Override
	public UserResponseDTO getDetailsById(Long id) {
		User user = custDao.findById(id).orElseThrow(() -> new ApiException("User Not Found..!"));
		System.out.println(user);
		return mapper.map(user, UserResponseDTO.class);
	}

	@Override
	public UserApiResponse updatePassword(updatePasswordDTO newPass) {
		User user = custDao.findById(newPass.getId()).orElseThrow(() -> new ResourceNotFoundException("User Not Found !!!"));
		if(passwordEncoder.matches(newPass.getOldPassword(), user.getPassword())) {
			String upPass = passwordEncoder.encode(newPass.getNewPassword());
			if(upPass.equals(user.getPassword()))
				return new UserApiResponse("New Password Must Be Different from Current Password !!!");
			user.setPassword(upPass);
			return new UserApiResponse("Password Updated Successfully");
		}
		throw new InvalidCredentialsException("The current password you entered is incorrect. Please try again !!!");
	}
	
	
	public List<BookingResponseDTO> getBookingsForUser(Long userId) {
        List<Object[]> rows = custDao.findBookingsByUserId(userId);

        List<BookingDetailsDTO> flatList = rows.stream().map(row -> {
            BookingDetailsDTO dto = new BookingDetailsDTO();
            dto.setBookingId(((Number) row[0]).longValue());
            dto.setReservationId(((Number)row[1]).longValue());
            dto.setMovieTitle((String) row[2]);
            dto.setTheaterName((String) row[3]);
            dto.setScreenNumber(String.valueOf(row[4]));
            dto.setBookingDate(((java.sql.Timestamp) row[5]).toLocalDateTime().toLocalDate());
            dto.setShowTime(((java.sql.Time) row[6]).toLocalTime());
            dto.setSeatId(((Number) row[7]).longValue());
            dto.setRowLabel((String) row[8]);
            dto.setSeatNumber(((Number) row[9]).intValue());
            dto.setTotalAmount(((Number) row[10]).doubleValue());
            dto.setStatus(((String) row[11]).toLowerCase());
            return dto;
           
        }).collect(Collectors.toList());

        // Group by bookingId
        Map<Long, BookingResponseDTO> grouped = new LinkedHashMap<>();
        for (BookingDetailsDTO dto : flatList) {
            grouped.computeIfAbsent(dto.getBookingId(), id -> {
                BookingResponseDTO resp = new BookingResponseDTO();
                resp.setId(dto.getBookingId());
                resp.setReservationId(dto.getReservationId());
                resp.setMovieTitle(dto.getMovieTitle());
                resp.setTheaterName(dto.getTheaterName());
                resp.setScreenNumber(dto.getScreenNumber());
                resp.setBookingDate(dto.getBookingDate());
                resp.setShowTime(dto.getShowTime());
                resp.setTotalAmount(dto.getTotalAmount());
                resp.setStatus(dto.getStatus());
                resp.setSeats(new ArrayList<>());
                return resp;
            }).getSeats().add(new SeatDTO(dto.getSeatId(), dto.getRowLabel(), dto.getSeatNumber()));
        }

        return new ArrayList<>(grouped.values());
    }

}
