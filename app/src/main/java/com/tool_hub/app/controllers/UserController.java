package com.tool_hub.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tool_hub.app.dtos.GroupDto;
import com.tool_hub.app.dtos.ToolOrderDto;
import com.tool_hub.app.dtos.UserDetailsDto;
import com.tool_hub.app.dtos.UserRegistrationDto;
import com.tool_hub.app.exceptions.GroupNameExistsException;
import com.tool_hub.app.exceptions.GroupNotFoundException;
import com.tool_hub.app.exceptions.InvalidDataException;
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

    @GetMapping()
    public ResponseEntity<?> getUserDetails(HttpServletRequest request) {
        try {
            String username = authenticationService.authenticateUser(request);
            UserDetailsDto userDetails = userService.getUserDetails(username);
            return ResponseEntity.ok().body(userDetails);
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (Exception e) {
            System.out.println("Erorr:_-----------------" + e.getStackTrace());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getUserImage(@PathVariable String username) {
        try {
            return ResponseEntity.ok().body(userService.getUserImage(username));
        } catch (Exception e) {
            System.out.println("Erorr:_-----------------" + e.getStackTrace());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }

    @GetMapping("/search/{username}")
    public ResponseEntity<?> searchForUsersByUsername(@PathVariable String username) {
        try {
            return ResponseEntity.ok().body(userService.searchForUsers(username));
        } catch (Exception e) {
            System.out.println("Erorr:_-----------------" + e.getLocalizedMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }

    @PutMapping("/image")
    public ResponseEntity<?> updateUserImage(@RequestBody String imageUrl, HttpServletRequest request) {
        try {
            String username = authenticationService.authenticateUser(request);
            userService.updateUserImage(imageUrl, username);
            return ResponseEntity.ok().body("updated image");
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (Exception e) {
            System.out.println("Erorr:_-----------------" + e.getStackTrace());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }

    @PutMapping()
    public ResponseEntity<?> updateUsersFirstLastNameAndEmail(@RequestBody UserRegistrationDto dto,
            HttpServletRequest request) {
        try {
            String username = authenticationService.authenticateUser(request);
            dto.setUsername(username);
            userService.updateUsersFirstLastNameAndEmail(dto);
            return ResponseEntity.ok().body("updated user");
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (Exception e) {
            System.out.println("Erorr:_-----------------" + e.getStackTrace());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }

    @GetMapping("/group")
    public ResponseEntity<?> getUserGroups(HttpServletRequest request) {

        try {
            String username = authenticationService.authenticateUser(request);
            return ResponseEntity.ok().body(groupService.getUserGroups(username));
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (Exception e) {
            System.out.println("Erorr:_-----------------" + e.getStackTrace());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }

    @PostMapping("/group")
    public ResponseEntity<?> createNewGroup(@RequestBody GroupDto groupDto, HttpServletRequest request) {
        try {
            validateGroup(groupDto);
            String username = authenticationService.authenticateUser(request);
            groupService.createGroup(username, groupDto);
            return ResponseEntity.ok().body("succesfullly created group");
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (GroupNameExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Group Name is Taken!");
        } catch (InvalidDataException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(e.getLocalizedMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }

    @GetMapping("/toolorder")
    public ResponseEntity<?> getUserToolOrders(HttpServletRequest request) {
        try {
            String username = authenticationService.authenticateUser(request);
            return ResponseEntity.ok().body(toolOrderservice.findAllForUser(username));
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }

    @PostMapping("/toolorder/{groupName}")
    public ResponseEntity<?> createToolOrder(@RequestBody ToolOrderDto toolDto, @PathVariable String groupName,
            HttpServletRequest request) {
        try {
            authenticationService.validateUserIsInGroup(groupName, request);
            validateToolOrder(toolDto);
            String owner = authenticationService.authenticateUser(request);
            toolDto.setOwnerUsername(owner);
            toolOrderservice.createNewOrder(toolDto, groupName);
            return ResponseEntity.ok().body("succesfullly created toolorder");
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("forbidden");
        } catch (InvalidDataException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(e.getLocalizedMessage());
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }

    @PutMapping("/toolorder")
    public ResponseEntity<?> updateToolOrder(@RequestBody ToolOrderDto toolDto, HttpServletRequest request) {
        try {
            validateToolOrder(toolDto);
            // TODO: validate user owns order
            String owner = authenticationService.authenticateUser(request);
            toolDto.setOwnerUsername(owner);
            toolOrderservice.updateToolOrder(toolDto);
            return ResponseEntity.ok().body("succesfullly created toolorder");
        } catch (InvalidDataException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(e.getLocalizedMessage());
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }

    @DeleteMapping("/toolorder/{id}")
    public ResponseEntity<?> deleteToolOrderById(@PathVariable Long id, HttpServletRequest request) {
        try {
            authenticationService.validateUserOwnsToolOrder(id, request);
            toolOrderservice.deleteToolOrderById(id);
            return ResponseEntity.ok().body("Delete tool with id: " + id);
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("forbidden");
        } catch (Exception e) {
            System.out.println(e.getMessage());
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
        } catch (GroupNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("group not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }

    @PostMapping("/group/leave/{groupName}")
    public ResponseEntity<?> leaveGroup(@PathVariable String groupName, HttpServletRequest request) {
        try {
            String username = authenticationService.authenticateUser(request);
            userService.removeUserFromGroup(username, groupName);
            return ResponseEntity.ok().body("succesfullly joined group");
        } catch (UnauthenticatedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("incorrect username or password");
        } catch (GroupNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("group not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong ¯\\_(ツ)_/¯");
        }
    }

    private void validateGroup(GroupDto dto) throws InvalidDataException {
        if (dto.getName().equals("") || dto.getDescription().equals("") || dto.getImageUrl().equals("")
                || dto.getName() == null || dto.getDescription() == null || dto.getImageUrl() == null) {
            throw new InvalidDataException("Invalid group: " + dto.toString());
        }
    }

    private void validateToolOrder(ToolOrderDto dto) throws InvalidDataException {
        if (dto.getToolName().equals("") || dto.getDescription().equals("") || dto.getImageUrl().equals("")
                || dto.getToolName() == null || dto.getImageUrl() == null || dto.getDescription() == null) {
            throw new InvalidDataException("Invalid tool order: " + dto.toString());
        }
    }
}
