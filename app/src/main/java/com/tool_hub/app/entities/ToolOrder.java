package com.tool_hub.app.entities;

import com.tool_hub.app.dtos.ToolOrderDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class ToolOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    private String toolName;
    @Column(length = 100)
    private String imageUrl;
    @Column(length = 200)
    private String description;
    private boolean isRequest;

    private long date;
    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User owner;

    public ToolOrder(ToolOrderDto dto) {
        this.toolName = dto.getToolName();
        this.imageUrl = dto.getImageUrl();
        this.description = dto.getDescription();
        this.isRequest = dto.isRequest();

    }

    @PrePersist
    public void prePersist() {
        this.date = System.currentTimeMillis();
    }

}
