package com.tool_hub.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tool_hub.app.dtos.GroupDto;
import com.tool_hub.app.entities.User;
import com.tool_hub.app.exceptions.UnauthorizedException;
import com.tool_hub.app.services.GroupService;
import com.tool_hub.app.services.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class AuthenticationService {
    @Autowired
    private UserService userService;
    @Autowired
    private GroupService groupService;

    /**
     * Authenticates a user based on the provided HttpServletRequest containing
     * username and password cookies. The method retrieves the username and password
     * from the cookies, validates them against the stored user information, and
     * throws an UnauthenticatedException if the authentication fails.
     *
     * @param request The HttpServletRequest containing user authentication cookies.
     * @return The authenticated username if successful.
     * @throws UnauthenticatedException If the authentication fails due to missing
     *                                  or invalid credentials.
     */

    public String authenticateUser(HttpServletRequest request) throws UnauthenticatedException {
        try {
            String username = null;
            String password = null;

            // Retrieve username and password from the cookies
            Cookie[] cookies = request.getCookies();

            for (Cookie cookie : cookies) {
                System.out.println(cookie.getName() + ":" + cookie.getValue());
                if (cookie.getName().equals("username")) {
                    username = cookie.getValue();
                }
                if (cookie.getName().equals("password")) {
                    password = cookie.getValue();
                }
            }
            System.out.println("\n\n\n\n\n\n\n\n" + username + password);
            // Check if both username and password are present
            if (username == null || password == null) {
                throw new UnauthenticatedException("");
            }

            // Validate user credentials
            User user = userService.getUserByUsername(username);
            if (!(user.getUsername().equals(username) && user.getPassword().equals(password))) {
                throw new UnauthenticatedException("");
            }
            // Return the authenticated username
            return username;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new UnauthenticatedException("");
        }

    }

    public void validateUserIsInGroup(String groupName, HttpServletRequest request)
            throws UnauthorizedException, UnauthenticatedException {
        boolean groupFound = false;
        for (GroupDto group : groupService.getUserGroups(authenticateUser(request))) {
            if (group.getName().equals(groupName)) {
                groupFound = true;
            }
        }
        if (!groupFound) {
            throw new UnauthorizedException("Use is not in group");
        }
    }
}
