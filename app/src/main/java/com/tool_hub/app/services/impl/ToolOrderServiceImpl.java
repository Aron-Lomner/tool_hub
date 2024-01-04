package com.tool_hub.app.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tool_hub.app.dtos.ToolOrderDto;
import com.tool_hub.app.entities.Group;
import com.tool_hub.app.entities.ToolOrder;
import com.tool_hub.app.exceptions.GroupNotFoundException;
import com.tool_hub.app.exceptions.UsernameNotFoundException;
import com.tool_hub.app.repositories.ToolOrderRepo;
import com.tool_hub.app.repositories.UserRepo;
import com.tool_hub.app.services.GroupService;
import com.tool_hub.app.services.ToolOrderservice;
import com.tool_hub.app.services.UserService;

@Service
public class ToolOrderServiceImpl implements ToolOrderservice {
    @Autowired
    private ToolOrderRepo toolOrderRepo;
    @Autowired
    private GroupService groupService;
    @Autowired
    private UserRepo userRepo;

    @Override
    public List<ToolOrderDto> findAllForUser(String username) {
        List<ToolOrder> userToolOrders = toolOrderRepo.findAllByOwner_Username(username);
        return convertToDtoList(userToolOrders);

    }

    @Override
    public List<ToolOrderDto> findAllForGroup(String groupName) {
        List<ToolOrder> groupToolOrders = toolOrderRepo.findAllByGroup_Name(groupName);
        return convertToDtoList(groupToolOrders);
    }

    @Override
    public void createNewOrder(ToolOrderDto dto, String groupname)
            throws GroupNotFoundException, UsernameNotFoundException {
        Group group = groupService.getGroupByName(groupname);
        ToolOrder toolOrder = new ToolOrder(dto);
        toolOrder.setGroup(group);
        toolOrder.setOwner(
                userRepo.findByUsername(dto.getOwnerUsername()).orElseThrow(() -> new UsernameNotFoundException("")));
        toolOrderRepo.save(toolOrder);
    }

    private List<ToolOrderDto> convertToDtoList(List<ToolOrder> userToolOrders) {
        return userToolOrders.stream()
                .map(ToolOrderDto::new)
                .collect(Collectors.toList());
    }
}
