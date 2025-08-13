package com.bookar.controller;

import com.bookar.service.PaymentService;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.bookar.dto.*;
@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<PaymentResponseDTO> createOrder(@RequestBody PaymentRequestDTO dto) throws RazorpayException {
        PaymentResponseDTO response = paymentService.createOrder(dto);
        
        return ResponseEntity.ok(response);
    }

}
