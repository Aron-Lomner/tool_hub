package com.tool_hub.app.messages;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupMessageRepo extends JpaRepository<GroupMessage, String> {

    @Query(value = "SELECT * FROM GroupMessage WHERE groupName = :groupName ORDER BY CAST(id AS VARCHAR)", nativeQuery = true)
    List<GroupMessage> findByGroupUsernameOrderByNumericId(@Param("groupName") String groupUsername);

}
