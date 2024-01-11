package com.tool_hub.app.messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tool_hub.app.exceptions.GroupNotFoundException;
import com.tool_hub.app.exceptions.MessageNotFoundException;
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

    public void updateGroupMessage(GroupMessage message) throws GroupNotFoundException, MessageNotFoundException {
        if (!groupMessageRepo.findById(message.getId()).isPresent()) {
            throw new MessageNotFoundException("No message with id: " + message.getId());
        }
        if (!groupRepo.findByName(message.getGroupName()).isPresent()) {
            throw new GroupNotFoundException("Group not found (possibly usenrame not found but shouldn't happen!)");
        }
        groupMessageRepo.save(message);

    }

    public void deleteMessage(String messageId) throws MessageNotFoundException {
        if (groupMessageRepo.findById(messageId).isPresent()) {
            groupMessageRepo.deleteById(messageId);
        } else {
            throw new MessageNotFoundException("No message with id: " + messageId);
        }
    }
}
