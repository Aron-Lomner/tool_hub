import axios from "../config/AxiosConfig";
import UnauthorizedError from "../errors/UnauthorizedError";

class UserService {
  async imageToUrl(image) {
    const imageData = new FormData();
    imageData.append("image", image);

    const imgBbResponse = await fetch(
      "https://api.imgbb.com/1/upload?key=47a311160676f61a5572f0ee97b00105",
      {
        method: "POST",
        body: imageData,
      }
    );
    const imgBbData = await imgBbResponse.json();
    if (imgBbData.data.url.length > 100) throw Error("Image url is to long");
    return imgBbData.data.url;
  }
  async getUserDetails() {
    try {
      const response = await axios.get("/user");

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedError(error.response.data);
      } else {
        throw new Error(error);
      }
    }
  }
  async updateUserData(userData) {
    try {
      axios.post("/user", userData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedError(error.response.data);
      } else {
        throw new Error(error);
      }
    }
  }
  async updateImageUrl(imageUrl) {
    try {
      axios.put(`/user/image`, imageUrl, {
        headers: {
          "Content-Type": "text/plain", // Set the content type based on your needs
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedError(error.response.data);
      } else {
        throw new Error(error);
      }
    }
  }
  async searchUsersByUsernamePattern(pattern) {
    try {
      const response = await axios.get(`/user/search/${pattern}`);
      return response.data;
    } catch (error) {
      throw new Error();
    }
  }
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
    return {
      imageUrl: "/src/assets/Hammer.jpg",
      firstName: "Bob",
      lastName: "Smith",
      email: "Bob@email.com",
    };
  }
}

export default new UserService();
