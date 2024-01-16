package com.tool_hub.app.messages;

import java.util.List;

import com.tool_hub.app.dtos.ConversationDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DirectMessageRepo extends JpaRepository<DirectMessage, Long> {

    @Query("SELECT DISTINCT CASE WHEN d.senderUsername = :username THEN d.targetUsername ELSE d.senderUsername END FROM DirectMessage d WHERE :username IN (d.senderUsername, d.targetUsername)")
    List<String> findUniqueUsernamesInMessages(String username);

    @Query("SELECT d FROM DirectMessage d WHERE (d.senderUsername = :username1 AND d.targetUsername = :username2) OR (d.senderUsername = :username2 AND d.targetUsername = :username1) ORDER BY CAST(d.id AS long)")
    List<DirectMessage> findAllMessagesBetweenUsernames(String username1, String username2);

    @Query("SELECT NEW com.tool_hub.app.dtos.ConversationDto(" +
            "CASE WHEN d.senderUsername = :username THEN d.targetUsername ELSE d.senderUsername END, " +
            "d.message, u.imageUrl) " +
            "FROM DirectMessage d " +
            "JOIN User u ON (d.targetUsername = u.username OR d.senderUsername = u.username) " +
            "WHERE :username IN (d.senderUsername, d.targetUsername) " +
            "AND d.id IN (SELECT MAX(d2.id) FROM DirectMessage d2 " +
            "WHERE (d2.senderUsername = d.senderUsername AND d2.targetUsername = d.targetUsername) OR " +
            "(d2.senderUsername = d.targetUsername AND d2.targetUsername = d.senderUsername) " +
            "GROUP BY CASE WHEN d2.senderUsername = :username THEN d2.targetUsername ELSE d2.senderUsername END) " +
            "GROUP BY CASE WHEN d.senderUsername = :username THEN d.targetUsername ELSE d.senderUsername END, u.imageUrl "
            +
            "ORDER BY MAX(d.id) DESC")
    List<ConversationDto> findUniquePeopleAndLatestMessages(@Param("username") String username);

}
