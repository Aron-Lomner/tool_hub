package com.tool_hub.app.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tool_hub.app.dtos.ToolOrderDto;
import com.tool_hub.app.entities.Group;
import com.tool_hub.app.entities.ToolOrder;
import com.tool_hub.app.exceptions.GroupNotFoundException;
import com.tool_hub.app.exceptions.ToolNotFoundException;
import com.tool_hub.app.exceptions.UsernameNotFoundException;
import com.tool_hub.app.repositories.ToolOrderRepo;
import com.tool_hub.app.repositories.UserRepo;
import com.tool_hub.app.services.GroupService;
import com.tool_hub.app.services.ToolOrderservice;

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

    /**
     * Updates an existing ToolOrder based on the provided ToolOrderDto.
     * Only updates toolName, iamgeUrl, and description! Anything else is ignored!
     *
     * This method retrieves the ToolOrder from the repository using the ID
     * specified in the ToolOrderDto. If a ToolOrder with the given ID is not
     * found, a ToolNotFoundException is thrown. Otherwise, the properties of
     * the existing ToolOrder are updated with the values from the provided
     * ToolOrderDto, tool name, image URL, and description. The
     * updated ToolOrder is then saved back to the repository.
     *
     * @param dto The ToolOrderDto containing the updated information.
     * @throws ToolNotFoundException If a ToolOrder with the specified ID is not
     *                               found.
     */
    @Override
    public void updateToolOrder(ToolOrderDto dto) throws ToolNotFoundException {
        if (dto.getId() == null) {
            throw new ToolNotFoundException("Tool not found by id: " + dto.getId());
        }
        ToolOrder toolOrder = toolOrderRepo.findById(dto.getId())
                .orElseThrow(() -> new ToolNotFoundException("Tool not found by id: " + dto.getId()));
        // Update properties
        toolOrder.setToolName(dto.getToolName());
        toolOrder.setImageUrl(dto.getImageUrl());
        toolOrder.setDescription(dto.getDescription());
        toolOrderRepo.save(toolOrder);
    }

    @Override
    public void deleteToolOrderById(Long id) {
        toolOrderRepo.deleteById(id);
    }

    private List<ToolOrderDto> convertToDtoList(List<ToolOrder> userToolOrders) {
        return userToolOrders.stream()
                .map(ToolOrderDto::new)
                .collect(Collectors.toList());
    }
}
