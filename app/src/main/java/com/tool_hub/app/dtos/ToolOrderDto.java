package com.tool_hub.app.dtos;

import com.tool_hub.app.entities.ToolOrder;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ToolOrderDto {

    private Long id;

    private String toolName;
    private String imageUrl;
    private String description;
    private boolean isRequest;

    private String ownerUsername;

    public ToolOrderDto(ToolOrder entity) {
        this.id = entity.getId();
        this.toolName = entity.getToolName();
        this.imageUrl = entity.getImageUrl();
        this.description = entity.getDescription();
        this.isRequest = entity.isRequest();
        this.ownerUsername = entity.getOwner().getUsername();
    }

}
