package com.tool_hub.app.messages;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class DirectMessage {
    @Id
    private String id;
    private String message;
    private String senderUsername;
    private String targetUsername;

    @PrePersist
    public void prePersist() {
        this.id = String.valueOf(System.currentTimeMillis());
    }
}
