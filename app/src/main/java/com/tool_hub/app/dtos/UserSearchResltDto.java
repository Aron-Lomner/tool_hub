package com.tool_hub.app.dtos;

import com.tool_hub.app.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSearchResltDto {
    private String imageUrl;
    private String username;

    public UserSearchResltDto(User e) {
        this.imageUrl = e.getImageUrl();
        this.username = e.getUsername();
    }
}
