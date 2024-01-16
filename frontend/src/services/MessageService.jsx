import axios from "../config/AxiosConfig";
import ForbiddenError from "../errors/ForbiddenError";
import UnauthorizedError from "../errors/UnauthorizedError";

class MessageService {
  async getUserImage(username) {
    try {
      return await axios.get(`/user/${username}`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedError(error.response.data);
      } else {
        throw new Error(error);
      }
    }
  }
  /**
   * Asynchronously sends a direct message using the provided message object.
   *
   * @param {Object} message - The message object.
   * @param {string} message.message - The content of the message.
   * @param {string} message.targetUsername - The username of the message recipient.
   * @throws {UnauthorizedError} If the request results in a 401 Unauthorized status.Most likely due to user not logged in.
   * @throws {Error} If an error occurs during the request.
   * @returns {Promise<void>} A promise that resolves when the message is successfully sent.
   */
  async sendDm(message) {
    try {
      await axios.post("/messages/send", message);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedError(error.response.data);
      } else {
        throw new Error(error);
      }
    }
  }
  /**
   * Asynchronously retrieves messages between the authenticated user and the user with the specified username.
   *
   * @param {string} username - The username of the other user.
   * @throws {UnauthorizedError} If the request results in a 401 Unauthorized status. Most likely due to user not logged in.
   * @throws {Error} If an error occurs during the request.
   * @returns {Promise<Object>} A promise that resolves with the response data containing messages between the users.
   */

  async getMessagesBetween(username) {
    try {
      return await axios.get(`/messages/between/${username}`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedError(error.response.data);
      } else {
        throw new Error(error);
      }
    }
  }
  /**
   *
   */
  async getConversations() {
    try {
      const response = await axios.get("/messages/conversations");
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedError(error.response.data);
      } else {
        throw new Error(error);
      }
    }
  }
  /**
   * Asynchronously retrieves a list of usernames of users that have communicated with the authenticated user.
   *
   * @throws {UnauthorizedError} If the request results in a 401 Unauthorized status.
   * @throws {Error} If an error occurs during the request.
   * @returns {Promise<Array<string>>} A promise that resolves with an array of usernames of users communicated with the authenticated user.
   */
  async getUsersCommunicatedWith() {
    try {
      return await axios.get("/messages/with");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedError(error.response.data);
      } else {
        throw new Error(error);
      }
    }
  }
  /**
   * Asynchronously sends a group message to the specified group.
   *
   * @param {Object} message - The group message object.
   * @param {string} message.message - The content of the group message.
   * @param {string} message.groupName - The name of the group.
   * @throws {UnauthorizedError} If the request results in a 401 Unauthorized status (user not logged in).
   * @throws {ForbiddenError} If the request results in a 403 Forbidden status (user not in the group).
   * @throws {Error} If an error occurs during the request.
   * @returns {Promise<void>} A promise that resolves when the group message is successfully sent.
   */

  async sendGroupMessage({ message, groupName }) {
    try {
      await axios.post("/messages/group", { message, groupName });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedError(error.response.data);
      } else if (error.response && error.response.status) {
        throw new ForbiddenError(error.response.data);
      } else {
        throw new Error(error);
      }
    }
  }
  /**
   * Asynchronously retrieves a list of group messages for the specified group.
   *
   * @param {string} groupName - The name of the group.
   * @throws {UnauthorizedError} If the request results in a 401 Unauthorized status (user not logged in).
   * @throws {ForbiddenError} If the request results in a 403 Forbidden status (user not in the group).
   * @throws {Error} If an error occurs during the request.
   * @returns {Promise<Array<Object>>} A promise that resolves with an array of group messages.
   * Each group message has properties: id, message, senderUsername, groupName.
   */

  async getGroupMessages(groupName) {
    try {
      return (await axios.get(`/messages/group/${groupName}`)).data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedError(error.response.data);
      } else if (error.response && error.response.status) {
        throw new ForbiddenError(error.response.data);
      } else {
        throw new Error(error);
      }
    }
  }
}

export default new MessageService();
