import UnauthorizedError from "../errors/UnauthorizedError";
import ConflictError from "../errors/ConflictError";
import axios from "axios";

class RegisterLoginService {
  async logout() {
    try {
      await axios.post("/auth/logout");
    } catch (error) {
      throw new Error(error);
    }
  }
  async login(username, password) {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 401) {
        throw new UnauthorizedError(errorText);
      } else if (response.status === 500) {
        throw new Error(errorText);
      }
    } else {
      const result = await response.text();
      return result;
    }
  }
  async register({ firstName, lastName, email, username, password }) {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        username,
        password,
      }),
    });

    console.log(response);

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 409) {
        // Username or email already exists
        throw new ConflictError(errorText);
      } else if (response.status === 500) {
        // Internal server error
        throw new Error(errorText);
      }
    } else {
      const result = await response.text();
      return result;
    }
  }
}

export default new RegisterLoginService();
