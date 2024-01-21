package com.tool_hub.app.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsDto {
    private String firstName;
    private String lastName;
    private String imageUrl;
    private String email;
}
