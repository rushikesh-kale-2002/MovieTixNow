package com.bookar.dao;

import com.bookar.dao.UserDao;
import com.bookar.entities.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
@Transactional
public class UserDaoImpl implements UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> findAll() {
        return entityManager.createQuery("FROM User", User.class).getResultList();
    }

    @Override
    public long count() {
        return entityManager.createQuery("SELECT COUNT(u) FROM User u", Long.class).getSingleResult();
    }

    @Override
    public long countByStatus(String status) {
        return entityManager.createQuery("SELECT COUNT(u) FROM User u WHERE u.status = :status", Long.class)
                .setParameter("status", status)
                .getSingleResult();
    }

    @Override
    public List<User> findAllWithBookingStats() {
        return entityManager.createQuery("""
            SELECT u FROM User u LEFT JOIN FETCH u.bookings
        """, User.class).getResultList();
    }

    @Override
    public User findById(long id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public void updateStatus(long id, String status) {
        User user = entityManager.find(User.class, id);
        if (user != null) {
            user.setStatus(status);
            entityManager.merge(user);
        }
    }
}
