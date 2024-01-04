package com.tool_hub.app.services;

import java.util.List;

import com.tool_hub.app.dtos.ToolOrderDto;
import com.tool_hub.app.exceptions.GroupNotFoundException;
import com.tool_hub.app.exceptions.UsernameNotFoundException;

public interface ToolOrderservice {
    List<ToolOrderDto> findAllForUser(String username);

    List<ToolOrderDto> findAllForGroup(String groupName);

    void createNewOrder(ToolOrderDto dto, String groupname) throws GroupNotFoundException, UsernameNotFoundException;

}
