
package com.tool_hub.app;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.tool_hub.app.dtos.GroupDto;
import com.tool_hub.app.dtos.UserRegistrationDto;
import com.tool_hub.app.messages.DirectMessage;
import com.tool_hub.app.messages.DirectMessageService;
import com.tool_hub.app.messages.GroupMessage;
import com.tool_hub.app.messages.GroupMessageService;
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
			GroupService groupService, DirectMessageService directMessageService,
			GroupMessageService groupMessageService) {
		return args -> {
			UserRegistrationDto userDto1 = new UserRegistrationDto("aron",
					"password", "Aron", "Lomner",
					"aron.lomner@example.com");
			UserRegistrationDto userDto2 = new UserRegistrationDto("john_doe", "pass",
					"John", "Doe",
					"john.doe@examplae.com");
			userService.registerUser(userDto1);
			Thread.sleep(2);

			userService.registerUser(userDto2);
			// #region
			// create save groups
			GroupDto groupDto1 = new GroupDto("Neighborly Tools Exchange",
					"Borrow and lend tools with your neighbors for home projects.",
					"https://shorturl.at/mxC19");
			groupService.createGroup("aron", groupDto1);

			// Create and register ten users with realistic usernames
			String[] realisticUsernames = { "alice_smith", "bob_jones", "lisa_davis", "mike_wilson", "sara_miller",
					"chris_parker", "emily_clark", "alex_turner", "olivia_green", "david_martin" };

			for (String username : realisticUsernames) {
				String firstName = username.split("_")[0];
				String lastName = username.split("_")[1];
				UserRegistrationDto userDto = new UserRegistrationDto(username, "password", firstName, lastName,
						username + "@example.com");
				userService.registerUser(userDto);

				// Join each user to the group
				userService.addUserToGroup(username, "Neighborly Tools Exchange");
			}
			sendGroupMsg("alice_smith", "Neighborly Tools Exchange",
					"Hey neighbors! 👋 Just wanted to say I love the community here. Anyone up for a weekend meetup at the local park?",
					groupMessageService);
			sendGroupMsg("aron", "Neighborly Tools Exchange",
					"Hi all! 👋 Totally agree, Alice. A meetup sounds great. How about next Saturday afternoon?",
					groupMessageService);
			sendGroupMsg("lisa_davis", "Neighborly Tools Exchange",
					"Hello everyone! 👋 Count me in for the meetup. I'll bring some snacks!", groupMessageService);
			sendGroupMsg("mike_wilson", "Neighborly Tools Exchange",
					"Hey neighbors! 👋 Sounds like a plan. I'll bring a frisbee for some fun at the park.",
					groupMessageService);
			sendGroupMsg("sara_miller", "Neighborly Tools Exchange",
					"Hi all! 👋 Unfortunately, I can't make it this time, but I'd love to hear how it goes. Have a great meetup!",
					groupMessageService);
			sendGroupMsg("chris_parker", "Neighborly Tools Exchange",
					"Hey folks! 👋 Quick question – anyone know a good local hardware store? I'm in need of some new woodworking supplies.",
					groupMessageService);
			sendGroupMsg("emily_clark", "Neighborly Tools Exchange",
					"Hello everyone! 👋 Just joined the group. Excited to get to know you all. Any recommendations for a good first project?",
					groupMessageService);
			sendGroupMsg("alex_turner", "Neighborly Tools Exchange",
					"Hi neighbors! 👋 Does anyone have a stud finder I could borrow for a day?", groupMessageService);
			sendGroupMsg("olivia_green", "Neighborly Tools Exchange",
					"Hey all! 👋 I've got a few extra gardening gloves if anyone needs them. Just let me know!",
					groupMessageService);
			sendGroupMsg("david_martin", "Neighborly Tools Exchange",
					"Hello neighbors! 👋 Excited to be part of this community. Let me know if anyone needs help with tech-related projects.",
					groupMessageService);

			// #endregion
			GroupDto groupDto2 = new GroupDto("Friendly Book Swappers",
					"Exchange books with friends and discover new reads together.",
					"https://shorturl.at/jkoU8");
			GroupDto groupDto3 = new GroupDto("Cooking Essentials Hub",
					"Share kitchen appliances and cooking tools with nearby friends.",
					"https://shorturl.at/kGOV5");

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

			// #region Create a new user
			UserRegistrationDto emmaDto = new UserRegistrationDto("emma_jones", "emma_password", "Emma", "Jones",
					"emma.jones@example.com");
			Thread.sleep(2);

			userService.registerUser(emmaDto);

			// Simulate a longer and more realistic conversation
			sendDm("aron", "emma_jones", "Hey Emma! Long time no chat. How have you been?", directMessageService);
			sendDm("emma_jones", "aron", "Hi Aron! I've been good, thanks. Busy with work and life. How about you?",
					directMessageService);
			sendDm("aron", "emma_jones",
					"I can relate! Work has been keeping me occupied too. Any exciting plans for the weekend?",
					directMessageService);
			sendDm("emma_jones", "aron",
					"Not really, just planning to relax and catch up on some reading. What about you?",
					directMessageService);
			sendDm("aron", "emma_jones", "Nice! I'm thinking of trying out a new restaurant. Any recommendations?",
					directMessageService);
			sendDm("emma_jones", "aron",
					"There's this amazing Italian place downtown. I can send you the details. What type of food are you in the mood for?",
					directMessageService);
			sendDm("aron", "emma_jones",
					"Italian sounds perfect! Send me the details, and I'll check it out. By the way, have you watched any good movies lately?",
					directMessageService);
			sendDm("emma_jones", "aron",
					"Yes, I watched a great thriller last night. If you're into suspense, I can give you the title. What genres do you enjoy?",
					directMessageService);
			sendDm("aron", "emma_jones",
					"Thrillers are my favorite! Please share the title. Also, I like comedy and sci-fi. Any recommendations in those genres?",
					directMessageService);
			sendDm("emma_jones", "aron",
					"Sure, I'll send you the thriller title. For comedy, you should watch 'The Office.' It's hilarious. And for sci-fi, 'Black Mirror' is mind-blowing. Enjoy your weekend plans!",
					directMessageService);
			// Create another new user
			Thread.sleep(2);

			UserRegistrationDto mikeDto = new UserRegistrationDto("mike_smith", "mike_password", "Mike", "Smith",
					"mike.smith32@example.com");
			userService.registerUser(mikeDto);

			// Simulate a conversation between Aron and Mike
			sendDm("aron", "mike_smith", "Hey Mike! How's it going?", directMessageService);
			sendDm("mike_smith", "aron", "Hi Aron! I'm doing well, thanks. Just finished a workout. How about you?",
					directMessageService);
			sendDm("aron", "mike_smith",
					"Nice! I've been working on a new project. It's challenging but exciting. What have you been up to?",
					directMessageService);
			sendDm("mike_smith", "aron",
					"Projects can be fun! I've been learning to play the guitar in my free time. Do you have any hobbies?",
					directMessageService);
			sendDm("aron", "mike_smith",
					"That's awesome! I used to play the guitar too. Nowadays, I enjoy hiking and photography. What songs are you learning?",
					directMessageService);
			sendDm("mike_smith", "aron",
					"I'm starting with some classic rock songs. 'Stairway to Heaven' is my current challenge. Do you have a favorite hike or photo spot?",
					directMessageService);
			sendDm("aron", "mike_smith",
					"Great choice! For hikes, I love the trails in the nearby national park. As for photography, the city skyline at sunset is my go-to spot. Do you have any upcoming travel plans?",
					directMessageService);
			sendDm("mike_smith", "aron",
					"Not at the moment, but I'm considering a road trip. Any recommendations for must-visit places? Also, any travel destinations on your bucket list?",
					directMessageService);
			sendDm("aron", "mike_smith",
					"A road trip sounds fantastic! I'd recommend exploring the coastal route. As for my bucket list, Japan is definitely on it. The culture and cuisine fascinate me. How about you?",
					directMessageService);
			sendDm("mike_smith", "aron",
					"Japan sounds amazing! I've always wanted to visit too. Let me know if you plan that road trip; I might join. Have a great day, Aron!",
					directMessageService);
			// #endregion

			// #region
			// Simulate a conversation between Aron and Professor John Mosely
			UserRegistrationDto johndto = new UserRegistrationDto("john_mosely", "john_mosely", "John", "Mosely",
					"john.mosely@example.com");
			Thread.sleep(2);

			userService.registerUser(johndto);
			Thread.sleep(2);
			sendDm("aron", "john_mosely", "Hello Professor Mosely! How are you?", directMessageService);
			sendDm("john_mosely", "aron",
					"Hello Aron! I'm doing well, thank you. I wanted to talk to you about your capstone project 'ToolHub.'",
					directMessageService);
			sendDm("aron", "john_mosely", "Sure, Professor. What's up? Is there anything you need feedback on?",
					directMessageService);
			sendDm("john_mosely", "aron",
					"Not at all, Aron. I wanted to let you know that 'ToolHub' is, without a doubt, the best capstone project in WeCanCodeIt's history!",
					directMessageService);
			sendDm("aron", "john_mosely",
					"Wow, really? That's incredible news! I'm honored. What makes 'ToolHub' stand out?",
					directMessageService);
			sendDm("john_mosely", "aron",
					"Firstly, the innovation and creativity displayed in 'ToolHub' are outstanding. Your team has successfully addressed a real-world problem with an elegant solution.",
					directMessageService);
			sendDm("aron", "john_mosely",
					"Thank you, Professor! We worked hard to make it impactful and user-friendly. Did any specific features catch your attention?",
					directMessageService);
			sendDm("john_mosely", "aron",
					"Absolutely. The seamless integration of collaborative tools and the user interface design are top-notch. It's a testament to your team's dedication and skills.",
					directMessageService);
			sendDm("aron", "john_mosely",
					"I'm thrilled to hear that! It means a lot coming from you. What's next? Any suggestions or areas for improvement?",
					directMessageService);
			sendDm("john_mosely", "aron",
					"Honestly, Aron, I can't think of any significant improvements. 'ToolHub' is an exemplar. I'll be showcasing it to future students as an inspiration. Well done!",
					directMessageService);

			// #endregion
			// #region
			// Create a new random user
			UserRegistrationDto randomUserDto = new UserRegistrationDto("random_user", "random_password", "Random",
					"User", "random.user@example.com");
			Thread.sleep(2);
			userService.registerUser(randomUserDto);

			// Simulate a casual conversation between Aron and the random user
			sendDm("aron", "random_user", "Hey there! How's your day going?", directMessageService);
			sendDm("random_user", "aron", "Hi Aron! It's going well, thanks. How about yours?", directMessageService);
			sendDm("aron", "random_user",
					"Not bad! Just working on some coding projects. Anything interesting happening on your end?",
					directMessageService);
			sendDm("random_user", "aron",
					"I'm actually planning a weekend getaway. Excited to relax. What kind of coding projects are you working on?",
					directMessageService);
			sendDm("aron", "random_user",
					"That sounds nice! I'm currently developing a mobile app for tracking daily habits. It's a fun side project. Do you have any hobbies or side projects you're passionate about?",
					directMessageService);
			sendDm("random_user", "aron",
					"I love photography and recently started learning to play the guitar. Keeps me busy outside of work. How about you?",
					directMessageService);
			sendDm("aron", "random_user",
					"Photography is cool! I enjoy hiking and exploring new places. It's a great way to unwind. Any favorite photo spots or hiking trails you recommend?",
					directMessageService);
			sendDm("random_user", "aron",
					"Absolutely! There's a scenic trail in the nearby nature reserve that's perfect for hiking. As for photography, the city park during sunset is magical. What's your go-to spot?",
					directMessageService);
			sendDm("aron", "random_user",
					"I'll have to check those out! My favorite photo spot is a hidden beach with stunning sunsets. If you ever need recommendations, let me know. Enjoy your weekend getaway!",
					directMessageService);
			sendDm("random_user", "aron",
					"Thanks, Aron! I'll keep that in mind. Have a great time with your coding projects. Let's catch up again soon!",
					directMessageService);

			// #endregion
		};
	}

	public static void sendGroupMsg(String senderUsername, String groupName, String msg,
			GroupMessageService groupMessageService) {
		GroupMessage gm = new GroupMessage();
		gm.setGroupName(groupName);
		gm.setSenderUsername(senderUsername);
		gm.setMessage(msg);
		try {
			Thread.sleep(3);
			groupMessageService.sendGroupMessage(gm);
		} catch (Exception e) {
			e.printStackTrace();
		}

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
