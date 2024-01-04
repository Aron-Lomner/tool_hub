package com.tool_hub.app.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tool_hub.app.dtos.GroupDto;
import com.tool_hub.app.entities.Group;
import com.tool_hub.app.exceptions.GroupNotFoundException;
import com.tool_hub.app.exceptions.UsernameNotFoundException;
import com.tool_hub.app.repositories.GroupRepo;
import com.tool_hub.app.services.GroupService;
import com.tool_hub.app.services.UserService;

@Service
public class GroupServiceImpl implements GroupService {
    @Autowired
    private GroupRepo groupRepo;
    @Autowired
    private UserService userService;

    /**
     * Creates a new group and adds the specified user to it.
     *
     * @param username The username of the user to be added to the group.
     * @param groupDto Data Transfer Object containing information to initialize the
     *                 group.
     * @throws UsernameNotFoundException If the specified username is not found.
     * @throws GroupNotFoundException    If there is an issue with creating or
     *                                   saving the group.
     */

    @Override
    public void createGroup(String username, GroupDto groupDto)
            throws UsernameNotFoundException, GroupNotFoundException {
        // Create a new Group object using the provided GroupDto
        Group group = new Group(groupDto);
        // Save the new group to the repository
        groupRepo.save(group);
        // Add the user with the given username to the created group
        userService.addUserToGroup(username, group.getName());
    }

    @Override
    public void deleteGroup(String groupName) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteGroup'");
    }

    @Override
    public List<GroupDto> getUserGroups(String username) {
        List<Group> userGroups = groupRepo.findByMembersUsername(username);

        // Convert the List<Group> to List<GroupDto>
        return userGroups.stream()
                .map(GroupDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public Group getGroupByName(String groupname) throws GroupNotFoundException {
        return groupRepo.findByName(groupname).orElseThrow(() -> new GroupNotFoundException(""));
    }

}
