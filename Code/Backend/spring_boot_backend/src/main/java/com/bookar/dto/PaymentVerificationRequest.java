package com.bookar.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Getter 
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PaymentVerificationRequest {

    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
    private Long reservationId;
    private Long userId;
    private BigDecimal totalAmount;

   
}
