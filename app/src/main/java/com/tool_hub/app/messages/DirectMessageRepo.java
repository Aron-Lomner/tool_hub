package com.tool_hub.app.messages;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DirectMessageRepo extends JpaRepository<DirectMessage, String> {

    @Query("SELECT DISTINCT CASE WHEN d.senderUsername = :username THEN d.targetUsername ELSE d.senderUsername END FROM DirectMessage d WHERE :username IN (d.senderUsername, d.targetUsername)")
    List<String> findUniqueUsernamesInMessages(String username);

    @Query("SELECT d FROM DirectMessage d WHERE (d.senderUsername = :username1 AND d.targetUsername = :username2) OR (d.senderUsername = :username2 AND d.targetUsername = :username1) ORDER BY CAST(d.id AS long)")
    List<DirectMessage> findAllMessagesBetweenUsernames(String username1, String username2);

}
