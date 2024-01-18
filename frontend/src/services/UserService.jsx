class UserService {
  async mockSearchUsersByUsernamePattern() {
    return [
      {
        username: "Bob",
        imageUrl: "/src/assets/Hammer.jpg",
      },
      {
        username: "Alice",
        imageUrl: "https://example.com/alice.jpg",
      },

      {
        username: "Charlie",
        imageUrl: "https://example.com/charlie.jpg",
      },

      {
        username: "David",
        imageUrl: "https://example.com/david.jpg",
      },

      {
        username: "Eva",
        imageUrl: "https://example.com/eva.jpg",
      },

      {
        username: "Frank",
        imageUrl: "https://example.com/frank.jpg",
      },

      {
        username: "Grace",
        imageUrl: "https://example.com/grace.jpg",
      },

      {
        username: "Henry",
        imageUrl: "https://example.com/henry.jpg",
      },

      {
        username: "Isabel",
        imageUrl: "https://example.com/isabel.jpg",
      },

      {
        username: "Jack",
        imageUrl: "https://example.com/jack.jpg",
      },

      {
        username: "Katie",
        imageUrl: "https://example.com/katie.jpg",
      },
    ];
  }

  async mockMessagedUsersByUsernamePattern() {
    return [
      {
        username: "John",
        message: "Hey, is the hammer still available?",
        imageUrl: "/src/assets/Hammer.jpg",
      },
      {
        username: "Emma",
        message: "I'd like to buy the hammer. Can we arrange a time?",
        imageUrl: "/src/assets/Hammer.jpg",
      },
      {
        username: "Michael",
        message: "Interested in the hammer. What's the condition?",
        imageUrl: "/src/assets/Hammer.jpg",
      },
      {
        username: "Sophia",
        message:
          "Hello! I saw your post about the hammer. Is it still for sale?",
        imageUrl: "/src/assets/Hammer.jpg",
      },
      {
        username: "William",
        message: "I'm a collector of hammers. Could you provide more details?",
        imageUrl: "/src/assets/Hammer.jpg",
      },
    ];
  }
async getUserDetailsMock() {
  return {imageUrl: "/src/assets/Hammer.jpg", firstName: "Bob", lastName: "Smith", email: "Bob@email.com" }
}

}

export default new UserService();
