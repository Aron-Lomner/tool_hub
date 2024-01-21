package com.tool_hub.app.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tool_hub.app.entities.User;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    List<User> findByUsernameContainsIgnoreCase(String pattern);

    Optional<User> findByEmail(String email);

    void deleteByUsername(String username);
}
