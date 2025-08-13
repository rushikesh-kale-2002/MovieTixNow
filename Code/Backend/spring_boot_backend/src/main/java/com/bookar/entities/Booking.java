package com.bookar.entities;


	import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

	@Entity
	@Table(name = "bookings")
	@Setter
	@Getter
	@ToString
	@AllArgsConstructor
	@NoArgsConstructor
	public class Booking {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name = "booking_id")
		private Long bookingId;

		@ManyToOne(fetch = FetchType.LAZY)
		@JoinColumn(name = "user_id", nullable = false)
		private User user;

		@OneToOne(fetch = FetchType.LAZY)
		@JoinColumn(name = "reservation_id", nullable = false)
		private Reservation reservation;

		@Column(name = "payment_id", nullable = false)
		private String paymentId;

		@Column(name = "booking_time", nullable = false)
		private LocalDateTime bookingTime;

		

}
