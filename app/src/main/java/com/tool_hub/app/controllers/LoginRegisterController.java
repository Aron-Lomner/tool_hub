package com.tool_hub.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tool_hub.app.dtos.LoginDto;
import com.tool_hub.app.dtos.UserRegistrationDto;
import com.tool_hub.app.entities.User;
import com.tool_hub.app.exceptions.EmailExistsException;
import com.tool_hub.app.exceptions.UnauthorizedException;
import com.tool_hub.app.exceptions.UsernameExistsException;
import com.tool_hub.app.exceptions.UsernameNotFoundException;
import com.tool_hub.app.services.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
public class LoginRegisterController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationDto userRegistrationDto) {
        try {
            userService.registerUser(userRegistrationDto);
            return ResponseEntity.ok().body("Succesfully Registered");
        } catch (UsernameExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("username already exists");
        } catch (EmailExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("email already exists");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Somethin went wrong ¯\\_(ツ)_/¯");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto, HttpServletResponse response) {
        try {
            User actualUser = userService.getUserByUsername(loginDto.getUsername());
            if (!(actualUser.getPassword().equals(loginDto.getPassword()))) {
                throw new UnauthorizedException("");
            }
            // Create and add cookies
            Cookie cookieUsername = new Cookie("username", loginDto.getUsername());
            cookieUsername.setPath("/");
            Cookie cookiePassword = new Cookie("password", loginDto.getPassword());
            cookiePassword.setPath("/");
            response.addCookie(cookieUsername);
            response.addCookie(cookiePassword);
            return ResponseEntity.ok().body("Succesfully Loggedin");
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Somethin went wrong ¯\\_(ツ)_/¯");
        }
    }
}
