package com.tool_hub.app.messages;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tool_hub.app.exceptions.UsernameNotFoundException;
import com.tool_hub.app.repositories.UserRepo;

@Service
public class DirectMessageService {
    @Autowired
    private DirectMessageRepo directMessageRepo;
    @Autowired
    private UserRepo userRepo;

    public List<DirectMessage> getMessagesBetweenUsernames(String username1, String username2) {
        return directMessageRepo.findAllMessagesBetweenUsernames(username1, username2);
    }

    public List<String> getUsernamesCommunicatedWith(String username) {
        return directMessageRepo.findUniqueUsernamesInMessages(username);
    }

    public void sendMessage(DirectMessage message) throws UsernameNotFoundException {
        if (userRepo.findByUsername(message.getSenderUsername()).isPresent() &&
                userRepo.findByUsername(message.getTargetUsername()).isPresent()) {
            directMessageRepo.save(message);
        } else {
            throw new UsernameNotFoundException("Username does not exist");
        }
    }

}