package com.bookar.dao;

import com.bookar.entities.Theater;
import java.util.List;
import java.util.Optional;

public interface TheatreDao {
    List<Theater> findAll();
    long count();
}
