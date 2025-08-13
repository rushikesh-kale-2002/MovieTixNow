package com.bookar.security;

import org.springframework.stereotype.Component;

import com.bookar.entities.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

import java.util.List;
import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

@Component
public class JwtUtil {
	@Value(value="${jwt.token.expiration.millis}")
	public long jwtExpiration;
	@Value(value="${jwt.token.secret}")
	public String jwtSecret;
	private Key jwtKey;
	
	@PostConstruct
	public void init() {
		jwtKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}
	
	public String createToken(Authentication auth) {
		User user = (User)auth.getPrincipal();
		Long id = user.getId();
		String email = user.getEmail();
		String roles = user.getAuthorities().stream()
				.map(authority -> authority.getAuthority())
				.collect(Collectors.joining(","));
		String token = Jwts.builder()
				.setSubject(email)
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
				.claim("id",id)
				.claim("role", roles)
				.signWith(jwtKey,SignatureAlgorithm.HS256)
				.compact();
		return token;
	}
	
	public Long extractId(String token) {
	    Claims claims = Jwts.parserBuilder().setSigningKey(jwtKey).build()
	            .parseClaimsJws(token).getBody();
	    return Long.parseLong(claims.get("id").toString());
	}

	
	public Authentication validateToken(String token) {
		JwtParser parser = Jwts.parserBuilder().setSigningKey(jwtKey).build();
		Claims claims = parser.parseClaimsJws(token).getBody();
		String email = claims.getSubject();
		String roles = (String) claims.get("role");
		List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(roles);
		Authentication auth = new UsernamePasswordAuthenticationToken(email, null, authorities);
		return auth;
	}
}
