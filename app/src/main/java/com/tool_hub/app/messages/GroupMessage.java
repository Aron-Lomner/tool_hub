package com.tool_hub.app.messages;

import jakarta.persistence.Column;
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
    @Column(length = 400)
    private String message;
    @Column(length = 40)
    private String senderUsername;
    @Column(length = 255)
    private String groupName;

    @PrePersist
    public void prePersist() {
        // Combine current timestamp
        this.id = String.valueOf(System.currentTimeMillis());
    }
}
