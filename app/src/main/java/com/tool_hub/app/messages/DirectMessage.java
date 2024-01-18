package com.tool_hub.app.messages;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class DirectMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long identity;
    private long id;
    @Column(length = 400)
    private String message;
    @Column(length = 40)
    private String senderUsername;
    @Column(length = 40)
    private String targetUsername;

    @PrePersist
    public void prePersist() {
        this.id = System.currentTimeMillis();
    }
}
