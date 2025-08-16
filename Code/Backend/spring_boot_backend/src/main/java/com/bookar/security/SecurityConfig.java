package com.bookar.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
	@Autowired
	private CustomUserDetailsService userDetailsService;
	@Autowired
	private JwtFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Spring Boot 3+ way to expose AuthenticationManager
    @Bean
	AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
		AuthenticationManagerBuilder authManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
		authManagerBuilder.userDetailsService(userDetailsService);
		return authManagerBuilder.build();
	}

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public auth endpoints
                .requestMatchers(HttpMethod.POST, "/user/signin", "/user/signup").permitAll()

                // Public read endpoints for discovery/selection
                .requestMatchers(HttpMethod.GET,
                        "/user/movies/**",
                        "/shows/**",
                        "/seatselection/show/**",
                        "/api/theaters/*/getlayout",
                        "/api/theaters/*",
                        "/api/theaters/*/details"
                ).permitAll()

                // Admin-only
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers(
                        "/api/theaters/pending",
                        "/api/theaters/admin/**",
                        "/api/theaters/*/status/**"
                ).hasRole("ADMIN")

                // Theatre Owner-only
                .requestMatchers(
                        "/user/shows/manage/**",
                        "/user/*/activate",
                        "/user/*/deactivate",
                        "/api/theaters/owner/**",
                        "/api/theaters/*/savelayout",
                        "/api/theaters/add",
                        "/shows/theaters/**" // creating shows under a theater
                ).hasRole("THEATRE_OWNER")

                // Customer-only
                .requestMatchers(
                        "/user/update",
                        "/user/password",
                        "/user/bookings",
                        "/seatselection/reserve",
                        "/api/bookings/**"
                ).hasRole("CUSTOMER")
                .requestMatchers("/user/profile").hasAnyRole("ADMIN", "THEATRE_OWNER", "CUSTOMER")

                // anything else -> must be authenticated
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults());

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}


/*package com.bookar.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

<<<<<<< HEAD
	@Bean
	AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
		AuthenticationManagerBuilder authManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
		authManagerBuilder.userDetailsService(userDetailsService);
		return authManagerBuilder.build();
	}

	@Bean
	SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception {
		http
				.csrf(csrf -> csrf.disable())
				.cors(cors -> {
				})
				.authorizeHttpRequests(requests -> requests
						.requestMatchers("/user/**", "/movies/**","/shows/**", "/seatselection/**","/api/**").permitAll()
						.requestMatchers("/cust/**").hasRole("CUSTOMER")
						.requestMatchers("/admin/**").hasRole("ADMIN")
						.anyRequest().authenticated())
				.httpBasic(Customizer.withDefaults())
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		return http.build();
	}

}*/
