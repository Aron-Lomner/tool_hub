package com.tool_hub.app.messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tool_hub.app.exceptions.UnauthorizedException;
import com.tool_hub.app.security.AuthenticationService;
import com.tool_hub.app.security.UnauthenticatedException;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/messages")
public class MessageController {
    @Autowired
    private DirectMessageService directMessageService;
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private GroupMessageService groupMessageService;

    @GetMapping("/between/{username2}")
    public ResponseEntity<?> getMessagesBetween(@PathVariable String username2, HttpServletRequest request) {
        try {
            String username1 = authenticationService.authenticateUser(request);
            return ResponseEntity.ok().body(directMessageService.getMessagesBetweenUsernames(username1, username2));
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Somethign went wrong");
        }

    }

    @GetMapping("/with")
    public ResponseEntity<?> getUsernamesCommnicatedWith(HttpServletRequest request) {
        try {
            String username = authenticationService.authenticateUser(request);
            return ResponseEntity.ok().body(directMessageService.getUsernamesCommunicatedWith(username));
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Somethign went wrong");
        }
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody DirectMessage dm, HttpServletRequest request) {
        try {
            dm.setSenderUsername(authenticationService.authenticateUser(request));
            directMessageService.sendMessage(dm);
            return ResponseEntity.ok().body("Sent message!");
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Something went wrong");
        }
    }

    @GetMapping("/group/{groupName}")
    public ResponseEntity<?> getGroupMessages(@PathVariable String groupName, HttpServletRequest request) {
        try {
            authenticationService.validateUserIsInGroup(groupName, request);
            return ResponseEntity.ok().body(groupMessageService.getGroupMessages(groupName));
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: Is user in group?");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Something went wrong");
        }
    }

    @PostMapping("/group")
    public ResponseEntity<?> sendGroupMessag(@RequestBody GroupMessage groupMessage, HttpServletRequest request) {
        try {
            groupMessage.setSenderUsername(authenticationService.authenticateUser(request));
            authenticationService.validateUserIsInGroup(groupMessage.getGroupName(), request);
            return ResponseEntity.ok().body("Sent message");
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: Is user in group?");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Something went wrong");
        }

    }
}
