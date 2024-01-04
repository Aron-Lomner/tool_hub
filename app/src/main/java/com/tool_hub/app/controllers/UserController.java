package com.tool_hub.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tool_hub.app.dtos.GroupDto;
import com.tool_hub.app.dtos.ToolOrderDto;
import com.tool_hub.app.exceptions.UnauthorizedException;
import com.tool_hub.app.security.AuthenticationService;
import com.tool_hub.app.security.UnauthenticatedException;
import com.tool_hub.app.services.GroupService;
import com.tool_hub.app.services.ToolOrderservice;
import com.tool_hub.app.services.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private GroupService groupService;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private ToolOrderservice toolOrderservice;

    @GetMapping("/group")
    public ResponseEntity<?> getUserGroups(HttpServletRequest request) {
        try {
            String username = authenticationService.authenticateUser(request);
            return ResponseEntity.ok().body(groupService.getUserGroups(username));
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }

    @PostMapping("/group")
    public ResponseEntity<?> createNewGroup(@RequestBody GroupDto groupDto, HttpServletRequest request) {
        try {
            String username = authenticationService.authenticateUser(request);
            groupService.createGroup(username, groupDto);
            return ResponseEntity.ok().body("succesfullly created group");
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }

    @PostMapping("/toolorder/{groupName}")
    public ResponseEntity<?> createToolOrder(@RequestBody ToolOrderDto toolDto, @PathVariable String groupName,
            HttpServletRequest request) {
        try {
            String owner = authenticationService.authenticateUser(request);
            if (!(owner.equals(toolDto.getOwnerUsername()))) {
                throw new UnauthorizedException(owner);
            }
            // Create order
            toolOrderservice.createNewOrder(toolDto, groupName);
            return ResponseEntity.ok().body("succesfullly created toolorder");
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("forbidden");
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }

    @PostMapping("/group/join/{groupName}")
    public ResponseEntity<?> joinGroup(@PathVariable String groupName, HttpServletRequest request) {
        try {
            String username = authenticationService.authenticateUser(request);
            userService.addUserToGroup(username, groupName);
            return ResponseEntity.ok().body("succesfullly joined group");
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }
}
