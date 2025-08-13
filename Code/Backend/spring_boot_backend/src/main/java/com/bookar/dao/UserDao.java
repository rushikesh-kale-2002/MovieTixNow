package com.bookar.dao;

import com.bookar.entities.User;
import java.util.List;

public interface UserDao {
    List<User> findAll();
    long count();
    long countByStatus(String status);
    List<User> findAllWithBookingStats();
    User findById(long id);
    void updateStatus(long id, String status);
}
