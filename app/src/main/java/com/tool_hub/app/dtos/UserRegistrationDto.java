package com.tool_hub.app.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class UserRegistrationDto {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
}
