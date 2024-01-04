package com.tool_hub.app.services;

import java.util.List;

import com.tool_hub.app.dtos.GroupDto;
import com.tool_hub.app.entities.Group;
import com.tool_hub.app.exceptions.GroupNotFoundException;
import com.tool_hub.app.exceptions.UsernameNotFoundException;

public interface GroupService {
    void createGroup(String username, GroupDto groupDto) throws UsernameNotFoundException, GroupNotFoundException;

    void deleteGroup(String groupName);

    List<GroupDto> getUserGroups(String username);

    Group getGroupByName(String groupname) throws GroupNotFoundException;
}
