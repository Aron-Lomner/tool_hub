
package com.tool_hub.app;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.tool_hub.app.dtos.GroupDto;
import com.tool_hub.app.dtos.UserRegistrationDto;
import com.tool_hub.app.messages.DirectMessage;
import com.tool_hub.app.messages.DirectMessageService;
import com.tool_hub.app.services.GroupService;
import com.tool_hub.app.services.ToolOrderservice;
import com.tool_hub.app.services.UserService;

@SpringBootApplication
public class AppApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}

	@Bean
	CommandLineRunner myCommandLineRunner(UserService userService,
			ToolOrderservice toolOrderservice,
			GroupService groupService, DirectMessageService directMessageService) {
		return args -> {
			UserRegistrationDto userDto1 = new UserRegistrationDto("aron",
					"password", "Aron", "Lomner",
					"alice.smith@example.com");
			UserRegistrationDto userDto2 = new UserRegistrationDto("john_doe", "pass",
					"John", "Doe",
					"john.doe@example.com");
			userService.registerUser(userDto1);
			userService.registerUser(userDto2);
			// create save groups
			GroupDto groupDto1 = new GroupDto("Neighborly Tools Exchange",
					"Borrow and lend tools with your neighbors for home projects.",
					"https://source.unsplash.com/600x400/?tools");
			GroupDto groupDto2 = new GroupDto("Friendly Book Swappers",
					"Exchange books with friends and discover new reads together.",
					"https://source.unsplash.com/600x400/?book");
			GroupDto groupDto3 = new GroupDto("Cooking Essentials Hub",
					"Share kitchen appliances and cooking tools with nearby friends.",
					"https://source.unsplash.com/600x400/?cooking");

			groupService.createGroup("aron", groupDto1);
			groupService.createGroup("aron", groupDto2);
			groupService.createGroup("john_doe", groupDto3);
			// #region
			sendDm("john_doe", "aron", "Hey Aron, how's it going?", directMessageService);
			sendDm("aron", "john_doe", "Hi John! I'm good, thanks. How about you?", directMessageService);
			sendDm("john_doe", "aron", "Not bad! Just working on some projects. You?", directMessageService);
			sendDm("aron", "john_doe", "That sounds interesting! What kind of projects are you working on?",
					directMessageService);
			sendDm("john_doe", "aron", "I'm working on a new web application. It's challenging but exciting.",
					directMessageService);
			sendDm("aron", "john_doe",
					"Nice! Web development can be quite rewarding. Any specific technologies you're using?",
					directMessageService);
			sendDm("john_doe", "aron", "Yes, I'm using React for the frontend and Spring Boot for the backend.",
					directMessageService);
			sendDm("aron", "john_doe",
					"Great choices! I've worked with React before. How's the collaboration with your team?",
					directMessageService);
			sendDm("john_doe", "aron", "It's going well! We have a talented and collaborative team. How about you?",
					directMessageService);
			sendDm("aron", "john_doe",
					"I'm working on a mobile app using Flutter. Team collaboration is crucial, and we're doing well too.",
					directMessageService);
			sendDm("john_doe", "aron",
					"Flutter is awesome! I've heard good things about it. Let me know if you need any insights.",
					directMessageService);
			sendDm("aron", "john_doe",
					"Thanks, John! I might take you up on that offer. By the way, any exciting weekend plans?",
					directMessageService);
			sendDm("john_doe", "aron", "Not sure yet, but I might catch up on some reading. How about you?",
					directMessageService);
			sendDm("aron", "john_doe", "I'm planning a hiking trip with friends. Should be a refreshing break!",
					directMessageService);
			// #endregion
		};
	}

	public static void sendDm(String sender, String target, String message, DirectMessageService directMessageService) {
		DirectMessage dm = new DirectMessage();
		dm.setSenderUsername(sender);
		dm.setTargetUsername(target);
		dm.setMessage(message);
		try {
			Thread.sleep(1);
			directMessageService.sendMessage(dm);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
