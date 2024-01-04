package com.tool_hub.app.dtos;

import com.tool_hub.app.entities.Group;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class GroupDto {
    private String name;
    private String description;
    private String imageUrl;

    public GroupDto(Group entity) {
        this.name = entity.getName();
        this.description = entity.getDescription();
        this.imageUrl = entity.getImageUrl();
    }

}
