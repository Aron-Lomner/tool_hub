package com.tool_hub.app;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.tool_hub.app.dtos.GroupDto;
import com.tool_hub.app.dtos.ToolOrderDto;
import com.tool_hub.app.dtos.UserRegistrationDto;
import com.tool_hub.app.services.GroupService;
import com.tool_hub.app.services.ToolOrderservice;
import com.tool_hub.app.services.UserService;

@SpringBootApplication
public class AppApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}

	// @Bean
	// CommandLineRunner myCommandLineRunner(UserService userService,
	// ToolOrderservice toolOrderservice,
	// GroupService groupService) {
	// return args -> {
	// UserRegistrationDto userDto1 = new UserRegistrationDto("alice_smith",
	// "password123", "Alice", "Smith",
	// "alice.smith@example.com");
	// UserRegistrationDto userDto2 = new UserRegistrationDto("john_doe", "pass456",
	// "John", "Doe",
	// "john.doe@example.com");
	// UserRegistrationDto userDto3 = new UserRegistrationDto("emma_jones",
	// "secret789", "Emma", "Jones",
	// "emma.jones@example.com");
	// UserRegistrationDto userDto4 = new UserRegistrationDto("alex_jackson",
	// "securePwd", "Alex", "Jackson",
	// "alex.jackson@example.com");
	// UserRegistrationDto userDto5 = new UserRegistrationDto("sara_miller",
	// "sara_pass", "Sara", "Miller",
	// "sara.miller@example.com");
	// UserRegistrationDto userDto6 = new UserRegistrationDto("ryan_brown",
	// "ryan1234", "Ryan", "Brown",
	// "ryan.brown@example.com");
	// UserRegistrationDto userDto7 = new UserRegistrationDto("lily_clark",
	// "lilyPwd", "Lily", "Clark",
	// "lily.clark@example.com");
	// UserRegistrationDto userDto8 = new UserRegistrationDto("michael_davis",
	// "mikePass", "Michael", "Davis",
	// "michael.davis@example.com");
	// UserRegistrationDto userDto9 = new UserRegistrationDto("olivia_taylor",
	// "oliviaPwd", "Olivia", "Taylor",
	// "olivia.taylor@example.com");
	// UserRegistrationDto userDto10 = new UserRegistrationDto("charlie_wilson",
	// "charliePass", "Charlie",
	// "Wilson", "charlie.wilson@example.com");
	// // create/save users
	// userService.registerUser(userDto1);
	// userService.registerUser(userDto2);
	// userService.registerUser(userDto3);
	// userService.registerUser(userDto4);
	// userService.registerUser(userDto5);
	// userService.registerUser(userDto6);
	// userService.registerUser(userDto7);
	// userService.registerUser(userDto8);
	// userService.registerUser(userDto9);
	// userService.registerUser(userDto10);
	// // create save groups
	// GroupDto groupDto1 = new GroupDto("Neighborly Tools Exchange",
	// "Borrow and lend tools with your neighbors for home projects.",
	// "https://source.unsplash.com/600x400/?tools");
	// GroupDto groupDto2 = new GroupDto("Friendly Book Swappers",
	// "Exchange books with friends and discover new reads together.",
	// "https://source.unsplash.com/600x400/?book");
	// GroupDto groupDto3 = new GroupDto("Cooking Essentials Hub",
	// "Share kitchen appliances and cooking tools with nearby friends.",
	// "https://source.unsplash.com/600x400/?cooking");
	// GroupDto groupDto4 = new GroupDto("Tech Gadgets Circulation",
	// "Borrow and test the latest tech gadgets from fellow enthusiasts.",
	// "https://source.unsplash.com/600x400/?technology");
	// GroupDto groupDto5 = new GroupDto("DIY Home Projects Collaborative",
	// "Get assistance and share tools for DIY home improvement projects.",
	// "https://source.unsplash.com/600x400/?diy");
	// GroupDto groupDto6 = new GroupDto("Local Outdoor Gear Swap",
	// "Explore the great outdoors with borrowed camping and hiking gear.",
	// "https://source.unsplash.com/600x400/?outdoors");
	// GroupDto groupDto7 = new GroupDto("Artistic Creations Exchange",
	// "Share art supplies and collaborate on creative projects with friends.",
	// "https://source.unsplash.com/600x400/?art");
	// GroupDto groupDto8 = new GroupDto("Fitness Equipment Sharing",
	// "Stay fit together by borrowing and lending exercise equipment.",
	// "https://source.unsplash.com/600x400/?fitness");
	// GroupDto groupDto9 = new GroupDto("Car Enthusiasts Pit Stop",
	// "Borrow specialized tools and discuss automotive projects with friends.",
	// "https://source.unsplash.com/600x400/?cars");
	// GroupDto groupDto10 = new GroupDto("Pet Care Community",
	// "Share pet care items and tips with fellow pet owners in the neighborhood.",
	// "https://source.unsplash.com/600x400/?pets");

	// groupService.createGroup("charlie_wilson", groupDto1);
	// groupService.createGroup("alice_smith", groupDto2);
	// groupService.createGroup("ryan_brown", groupDto3);
	// groupService.createGroup("alice_smith", groupDto4);
	// groupService.createGroup("ryan_brown", groupDto5);
	// groupService.createGroup("alice_smith", groupDto6);
	// groupService.createGroup("ryan_brown", groupDto7);
	// groupService.createGroup("alice_smith", groupDto8);
	// groupService.createGroup("emma_jones", groupDto9);
	// groupService.createGroup("alice_smith", groupDto10);

	// List<String> groupNames = new ArrayList<>();
	// groupNames.add("Neighborly Tools Exchange");
	// groupNames.add("Friendly Book Swappers");
	// groupNames.add("Cooking Essentials Hub");
	// groupNames.add("Tech Gadgets Circulation");
	// groupNames.add("DIY Home Projects Collaborative");
	// groupNames.add("Local Outdoor Gear Swap");
	// groupNames.add("Artistic Creations Exchange");
	// groupNames.add("Fitness Equipment Sharing");
	// groupNames.add("Car Enthusiasts Pit Stop");
	// groupNames.add("Pet Care Community");
	// List<String> userNames = new ArrayList<>();
	// userNames.add("alice_smith");
	// userNames.add("john_doe");
	// userNames.add("emma_jones");
	// userNames.add("alex_jackson");
	// userNames.add("sara_miller");
	// userNames.add("ryan_brown");
	// userNames.add("lily_clark");
	// userNames.add("michael_davis");
	// userNames.add("olivia_taylor");
	// userNames.add("charlie_wilson");

	// for (String userName : userNames) {
	// List<String> randomGroups = getRandomGroups(groupNames, 4);
	// for (String groupName : randomGroups) {
	// System.out.println("User: " + userName);
	// userService.addUserToGroup(groupName, userName);
	// }
	// }
	// // create tool requests
	// // Create random tool orders
	// List<String> toolNames = List.of("Hammer", "Screwdriver", "Wrench", "Drill",
	// "Saw", "Pliers",
	// "Tape Measure", "Level");
	// List<String> toolDescriptions = List.of("Powerful hammer for various tasks",
	// "Versatile screwdriver set",
	// "Adjustable wrench for tight spaces", "High-speed drill for precision",
	// "Sharp saw for cutting wood", "Handy pliers for gripping", "Accurate tape
	// measure for lengths",
	// "Bubble level for straight lines");
	// Random random = new Random();

	// for (String userName : userNames) {
	// for (String groupName :
	// groupService.getUserGroups(userName).stream().map(GroupDto::getName)
	// .collect(Collectors.toList())) {
	// boolean isRequest = random.nextBoolean();
	// String toolName = toolNames.get(random.nextInt(toolNames.size()));
	// String description =
	// toolDescriptions.get(random.nextInt(toolDescriptions.size()));

	// ToolOrderDto toolOrderDto = new ToolOrderDto();
	// toolOrderDto.setToolName(toolName);
	// toolOrderDto.setDescription(description);
	// toolOrderDto.setRequest(isRequest);
	// toolOrderDto.setOwnerUsername(userName);

	// toolOrderservice.createNewOrder(toolOrderDto, groupName);
	// }
	// }

	// };

	// }

	private static List<String> getRandomGroups(List<String> groupNames, int count) {
		List<String> shuffledGroups = new ArrayList<>(groupNames);
		Collections.shuffle(shuffledGroups);

		return shuffledGroups.subList(0, Math.min(count, shuffledGroups.size()));
	}

}
