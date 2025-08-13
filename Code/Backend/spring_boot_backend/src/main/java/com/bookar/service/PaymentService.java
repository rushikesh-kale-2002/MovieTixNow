package com.bookar.service;

import com.razorpay.RazorpayException;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookar.dto.*;
@Service
@Transactional
public interface PaymentService {
    PaymentResponseDTO createOrder(PaymentRequestDTO dto) throws RazorpayException;
}
