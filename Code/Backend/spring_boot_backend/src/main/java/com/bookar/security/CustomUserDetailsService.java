package com.bookar.security;

import com.bookar.dao.CustomerDao;
import com.bookar.entities.User;
import com.bookar.custom_exceptions.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private CustomerDao customerDao;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = customerDao.findByEmail(email);
        if (user == null) {
            throw new ResourceNotFoundException("User Not Found..!!!");
        }
        return user;
    }
}
