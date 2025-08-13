package com.bookar.entities;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.context.annotation.Fallback;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Table(name="user")
@Entity
@Setter
@Getter
@NoArgsConstructor
@ToString(exclude = "address")
@EqualsAndHashCode
public class User implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 50, name="first_name")
	private String firstname;
	
	@Column(length = 50, name="last_name")
	private String lastname;
	
	@Column(length = 50, unique = true)
	private String email;
	
	@Column(length = 100, nullable = false)
	private String password;
	
	@Column(length = 10, unique = true, nullable = false)
	private String mobile_no;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 20, name="gender")
	private Gender gender;
	
	private LocalDate dob;
	
	
	@Column(name = "status")
	private String status = "active";

	
	@Enumerated(EnumType.STRING)
	@Column(length = 20, name="role")
	private Role role;
	
	@OneToOne(cascade = CascadeType.ALL, fetch=FetchType.EAGER, orphanRemoval = true)
	@JoinColumn(name = "address_id")
	private Address address;
	
	@CreationTimestamp
	@Column(name="created_at")
	private LocalDate createdAt;

	
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(this.role.name());
		return authorities;
	}

	@Override
	public String getUsername() {
		return this.email;
	}
	
	
	
}
