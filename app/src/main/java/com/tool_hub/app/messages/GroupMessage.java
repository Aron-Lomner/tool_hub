package com.tool_hub.app.messages;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class GroupMessage {
    @Id
    private String id;
    private String message;
    private String senderUsername;
    private String groupName;

    @PrePersist
    public void prePersist() {
        // Combine current timestamp
        this.id = String.valueOf(System.currentTimeMillis());
    }
}
