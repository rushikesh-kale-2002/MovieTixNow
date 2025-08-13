package com.bookar.dao;

import com.bookar.dao.TheatreDao;
import com.bookar.entities.Theater;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
@Transactional
public class TheatreDaoImpl implements TheatreDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Theater> findAll() {
        return entityManager.createQuery("FROM Theater", Theater.class).getResultList();
    }

    @Override
    public long count() {
        return entityManager.createQuery("SELECT COUNT(t) FROM Theater t", Long.class).getSingleResult();
    }
}
