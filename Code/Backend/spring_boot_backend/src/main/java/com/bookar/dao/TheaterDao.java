package com.bookar.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookar.entities.Theater;
import com.bookar.entities.TheaterStatus;

@Repository
public interface TheaterDao extends JpaRepository<Theater, Long> {
    List<Theater> findByStatus(TheaterStatus status);
    List<Theater> findByOwnerIdAndStatus(Long ownerId, TheaterStatus status);
}
