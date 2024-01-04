package com.tool_hub.app.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tool_hub.app.entities.ToolOrder;

public interface ToolOrderRepo extends JpaRepository<ToolOrder, Long> {
    List<ToolOrder> findAllByOwner_Username(String username);

    List<ToolOrder> findAllByGroup_Name(String groupName);
}
