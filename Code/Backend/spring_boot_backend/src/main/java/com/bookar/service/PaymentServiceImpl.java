package com.bookar.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import com.bookar.dao.ReservationDao;
import com.bookar.dto.*;
import com.bookar.entities.Reservation;
@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${razorpay.keyId}")
    private String keyId;

    @Value("${razorpay.keySecret}")
    private String keySecret;

    @Autowired
    private ReservationDao reservationDao;

    @Override
    public PaymentResponseDTO createOrder(PaymentRequestDTO dto) throws RazorpayException {
        // 1. Fetch reservation from DB
        Reservation reservation = reservationDao.findById(dto.getReservationId())
            .orElseThrow(() -> new RuntimeException("Reservation not found"));

        // 2. Convert totalPayable to paise for Razorpay
        int amountInPaise = reservation.getTotalAmount().multiply(BigDecimal.valueOf(100)).intValue();

        // 3. Create Razorpay order
        JSONObject options = new JSONObject();
        options.put("amount", amountInPaise);
        options.put("currency", "INR");
        options.put("receipt", "txn_" + reservation.getReservationId());

        RazorpayClient client = new RazorpayClient(keyId, keySecret);
        Order order = client.orders.create(options);

        return new PaymentResponseDTO(
            order.get("id"),
            amountInPaise,
            "INR",
            keyId
        );
    }


}
