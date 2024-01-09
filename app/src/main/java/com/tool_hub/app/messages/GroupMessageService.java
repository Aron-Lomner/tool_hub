package com.tool_hub.app.messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tool_hub.app.exceptions.GroupNotFoundException;
import com.tool_hub.app.repositories.GroupRepo;
import com.tool_hub.app.repositories.UserRepo;

import java.util.List;

@Service
public class GroupMessageService {
    @Autowired
    private GroupMessageRepo groupMessageRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private GroupRepo groupRepo;

    public List<GroupMessage> getGroupMessages(String groupName) {
        return groupMessageRepo.findByGroupUsernameOrderByNumericId(groupName);
    }

    public void sendGroupMessage(GroupMessage message) throws GroupNotFoundException {
        if (userRepo.findByUsername(message.getSenderUsername()).isPresent() &&
                groupRepo.findByName(message.getGroupName()).isPresent()) {
            groupMessageRepo.save(message);
        } else {
            throw new GroupNotFoundException("Group not found (possibly usenrame not found but shouldn't happen!)");
        }
    }
}
