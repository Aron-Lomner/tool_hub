package com.tool_hub.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tool_hub.app.exceptions.UnauthorizedException;
import com.tool_hub.app.security.AuthenticationService;
import com.tool_hub.app.security.UnauthenticatedException;
import com.tool_hub.app.services.GroupService;
import com.tool_hub.app.services.ToolOrderservice;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/group")
public class GroupController {
    @Autowired
    private ToolOrderservice toolOrderservice;
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private GroupService groupService;

    // get all orders in group
    @GetMapping("/tools/{groupName}")
    public ResponseEntity<?> getGroupToolOrders(@PathVariable String groupName, HttpServletRequest request) {
        try {
            authenticationService.validateUserIsInGroup(groupName, request);
            return ResponseEntity.ok().body(toolOrderservice.findAllForGroup(groupName));
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("forbidden");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }

    @GetMapping("/group/{pattern}")
    public ResponseEntity<?> searchGroupByPattern(@PathVariable String pattern) {
        try {
            return ResponseEntity.ok().body(groupService.searchGroupByPattern(pattern));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }

    @GetMapping("/in/{group}")
    public ResponseEntity<?> userInGroup(@PathVariable String group, HttpServletRequest request) {
        try {
            authenticationService.validateUserIsInGroup(group, request);
            return ResponseEntity.ok().body("");
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("forbidden");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }

}
