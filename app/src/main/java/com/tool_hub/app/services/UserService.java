package com.tool_hub.app.services;

import java.util.List;

import com.tool_hub.app.dtos.UserDetailsDto;
import com.tool_hub.app.dtos.UserRegistrationDto;
import com.tool_hub.app.dtos.UserSearchResltDto;
import com.tool_hub.app.entities.User;
import com.tool_hub.app.exceptions.EmailExistsException;
import com.tool_hub.app.exceptions.GroupNotFoundException;
import com.tool_hub.app.exceptions.UsernameExistsException;
import com.tool_hub.app.exceptions.UsernameNotFoundException;

public interface UserService {
    void registerUser(UserRegistrationDto dto) throws UsernameExistsException, EmailExistsException;

    User getUserByUsername(String username) throws UsernameNotFoundException;

    UserDetailsDto getUserDetails(String username);

    void updateUsersFirstLastNameAndEmail(UserRegistrationDto dto) throws UsernameNotFoundException;

    void deleteUser(String username) throws UsernameNotFoundException;

    void addUserToGroup(String username, String groupName) throws UsernameNotFoundException, GroupNotFoundException;

    void removeUserFromGroup(String username, String groupName)
            throws UsernameNotFoundException, GroupNotFoundException;

    String getUserImage(String username) throws UsernameNotFoundException;

    void updateUserImage(String imageUrl, String username);

    List<UserSearchResltDto> searchForUsers(String username);
}
