package com.bookar.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.servlet.annotation.HandlesTypes;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="address")
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Getter
@Setter
@AllArgsConstructor
public class Address {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="addr_line1", length=150)
	private String addr_line1;
	
	@Column(name="addr_line2", length=150)
	private String addr_line2;
	
	@Column(length = 20)
	private String town_city;
	
	@Column(length=20)
	private String state;
	
	@Column(length=20)
	private String district;
	
	@Column(name="pincode", length=20)
	private String pincode;
}
