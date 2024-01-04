package com.tool_hub.app.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tool_hub.app.entities.Group;
import java.util.List;

@Repository
public interface GroupRepo extends JpaRepository<Group, Long> {
    Optional<Group> findByName(String name);

    List<Group> findByNameContainsIgnoreCase(String name);

    List<Group> findByMembersUsername(String username);
}
