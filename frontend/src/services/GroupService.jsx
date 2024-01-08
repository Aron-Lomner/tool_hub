import UnauthorizedError from "../errors/UnauthorizedError";
import axios from "../config/AxiosConfig";
import ConflictError from "../errors/ConflictError";

class GroupService {
  /**
   * Asynchronously retrieves the user groups from the server.
   *
   * This function sends a request to the specified endpoint to fetch the user groups.
   * It handles potential errors such as unauthorized access or internal server errors.
   *
   * @throws {UnauthorizedError} Thrown when the user is not logged in or if there's a backend bug (HTTP status 401).
   * @throws {Error} Thrown when there is an internal server error (HTTP status 500).
   *
   * @returns {Promise<void>} A promise that resolves if the request is successful and rejects with an error otherwise.
   *
   * @example
   * try {
   *   await getUserGroups();
   *   console.log('User groups fetched successfully.');
   * } catch (error) {
   *   console.error('Failed to fetch user groups:', error.message);
   * }
   */

  async getUserGroups() {
    const response = await fetch("http://localhost:8080/user/group", {
      method: "GET",
      credentials: "include", // Include cookies
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 401) {
        //this means user is not logged in (or a bug in the backend)
        throw new UnauthorizedError(errorText);
      } else if (response.status === 500) {
        //this means internal server error
        throw new Error(errorText);
      }
    }
    return await response.json();
  }
  /**
   * Creates a new user group with the specified details.
   *
   * @param {Object} options - The options for creating the group.
   * @param {string} options.name - The name of the group.
   * @param {string} options.description - The description of the group.
   * @param {string} options.image - The imageUrl associated with the group.
   *
   * @throws {UnauthorizedError} If the user is not logged in (HTTP status 401).
   * @throws {Error} If there is an error creating the group or for other HTTP status codes.
   *
   * @returns {Promise<Object>} A promise that resolves to the data returned from the server.
   *
   * @example
   * // Example usage:
   * try {
   *   const groupData = await createGroup({
   *     name: 'My Group',
   *     description: 'A sample group',
   *     image: 'group-image.jpg',
   *   });
   *   console.log('Group created successfully:', groupData);
   * } catch (error) {
   *   console.error('Error creating group:', error.message);
   *   // Handle specific error cases if needed
   * }
   */

  async createGroup({ name, description, image }) {
    try {
      const response = await axios.post("/user/group", {
        name,
        description,
        imageUrl: image,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        //User is not logged in
        throw new UnauthorizedError(error.response.data);
      } else if (error.response && error.response.status === 409) {
        throw new ConflictError(error.response.data);
      } else {
        throw new Error(error.response.data);
      }
    }
  }
  /**
   *
   * @param {String} groupName - name of group to get its toolOrders
   * @returns ToolOrders
   * @throws Error if anything goes wrong!
   */
  async getTools(groupName) {
    try {
      const response = await axios.get(`/group/tools/${groupName}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }

  async createToolOrder({
    groupName,
    toolName,
    imageUrl,
    description,
    isRequest,
  }) {
    try {
      await axios.post(`/user/toolorder/${groupName}`, {
        toolName,
        imageUrl,
        description,
        isRequest,
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        //User is not logged in
        throw new UnauthorizedError(error.response.data);
      } else if (error.response && error.response.status === 409) {
        throw new ConflictError(error.response.data);
      } else {
        throw new Error(error.response.data);
      }
    }
  }
}

export default new GroupService();
