package com.tool_hub.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tool_hub.app.services.ToolOrderservice;

@RestController
@RequestMapping("/group")
public class GroupController {
    @Autowired
    private ToolOrderservice toolOrderservice;

    // get all orders in group
    @GetMapping("/tools/{groupName}")
    public ResponseEntity<?> getGroupToolOrders(@PathVariable String groupName) {
        try {
            // TODO: validate that user is in group
            return ResponseEntity.ok().body(toolOrderservice.findAllForGroup(groupName));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }
}
