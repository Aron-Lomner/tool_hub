import UnauthorizedError from "../errors/UnauthorizedError";
import axios from "../config/AxiosConfig";
import ConflictError from "../errors/ConflictError";
import InvalidDataError from "../errors/InvalidDataError";
import ForbiddenError from "../errors/ForbiddenError";
import NotFoundError from "../errors/NotFoundError";
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
   * @returns list of groups whos name contains the pattern
   * @param {String} pattern - the pattern to search for
   */
  async searchGroupByPattern(pattern) {
    try {
      return await axios.get(`/group/group/${pattern}`);
    } catch (error) {
      throw new Error(error);
    }
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
   * @throws {ConflictError} If the data is invalid (likely duplicate) (HTTP status 409).
   * @throws {ConflictError} If the data is missing required fields or otherwise invalid (HTTP status 422).
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
   *   // if (error insatnceof UnathorizedError) {
   *
   * }
   * }
   *
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
      } else if (error.response && error.response.status === 422) {
        //Problem with data (likely missing required fields)
        throw new InvalidDataError(error.response.data);
      } else {
        throw new Error(error.response.data);
      }
    }
  }
  /**
   * Asynchronously adds the user to a group by making a POST request to the server.
   *
   * @param {string} name - The name of the group to join.
   * @throws {UnauthorizedError} If the user is not logged in (HTTP 401).
   * @throws {NotFoundError} If the group is not found by name (HTTP 404).
   * @throws {Error} If an unexpected error occurs during the request.
   * @returns {Promise<void>} A Promise that resolves when the request is successful.
   */
  async userJoinGroup(name) {
    try {
      await axios.post(`/user/group/join/${name}`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        //user is not logged in
        throw new UnauthorizedError(error.response.data);
      } else if (error.response && error.response.status === 404) {
        //group not found by name
        throw new NotFoundError(error.response.data);
      } else {
        throw new Error(error);
      }
    }
  }
  /**
   * Asynchronously removes the user from a group by making a POST request to the server.
   *
   * @param {string} name - The name of the group to leave.
   * @throws {UnauthorizedError} If the user is not logged in (HTTP 401).
   * @throws {NotFoundError} If the group is not found by name (HTTP 404).
   * @throws {Error} If an unexpected error occurs during the request.
   * @returns {Promise<void>} A Promise that resolves when the request is successful.
   */
  async userLeaveGroup(name) {
    try {
      await axios.post(`/user/group/leave/${name}`);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        //user not logged in
        throw new UnauthorizedError(error.response.data);
      } else if (error.response && error.response.status === 404) {
        //no group by name
        throw new NotFoundError(error.response.data);
      } else {
        throw new Error(error);
      }
    }
  }
  /**
   *
   * @param {String} groupName - name of group to get its toolOrders
   * @returns ToolOrders [{toolName:"hammer", description:"need hammer for the weekend", imageUrl:"https://image.com/hammer.png", isRequest:true}]
   * @throws [UnauthorizedError] if user is not logged in!
   * @throws [ForbiddenError] if user is not in group!
   * @throws [Error] if anything else goes wrong!
   */
  async getTools(groupName) {
    try {
      const response = await axios.get(`/group/tools/${groupName}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedError(error.response.data);
      } else if (error.response && error.response.status === 403) {
        throw new ForbiddenError(error.response.data);
      } else {
        throw new Error(error.response.data);
      }
    }
  }

  async getToolsMock() {
    return [
      {
        toolName: "hammer",
        description: "need hammer for the weekend",
        imageUrl: "https://image.com/hammer.png",
        isRequest: true,
        owner: "HandyPerson123",
      },
      {
        toolName: "screwdriver",
        description: "looking for a sturdy screwdriver",
        imageUrl: "https://image.com/screwdriver.png",
        isRequest: true,
        owner: "FixItNow456",
      },
      {
        toolName: "wrench",
        description: "in need of a reliable wrench",
        imageUrl: "https://image.com/wrench.png",
        isRequest: true,
        owner: "ToolEnthusiast789",
      },
      {
        toolName: "tape measure",
        description: "require a good tape measure",
        imageUrl: "https://image.com/tape_measure.png",
        isRequest: true,
        owner: "MeasurementPro321",
      },
      {
        toolName: "pliers",
        description: "seeking durable pliers",
        imageUrl: "https://image.com/pliers.png",
        isRequest: true,
        owner: "CraftyBuilder567",
      },
      {
        toolName: "saw",
        description: "sharp saw available for use",
        imageUrl: "https://image.com/saw.png",
        isRequest: false,
        owner: "ToolMaster123",
      },
      {
        toolName: "drill",
        description: "electric drill available for borrowing",
        imageUrl: "https://image.com/drill.png",
        isRequest: false,
        owner: "DIYExpert456",
      },
      {
        toolName: "pliers",
        description: "extra pair of pliers available for sharing",
        imageUrl: "https://image.com/pliers_2.png",
        isRequest: false,
        owner: "CraftyBuilder789",
      },
      {
        toolName: "screwdriver set",
        description: "set of screwdrivers available for lending",
        imageUrl: "https://image.com/screwdriver_set.png",
        isRequest: false,
        owner: "HandyNeighbor321",
      },
      {
        toolName: "level",
        description: "bubble level for precision work",
        imageUrl: "https://image.com/level.png",
        isRequest: false,
        owner: "MeasureMaster567",
      },
    ];
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
      } else if (error.response && error.response.status === 422) {
        //Problem with data (likely missing required fields)
        throw new InvalidDataError(error.response.data);
      } else {
        throw new Error(error.response.data);
      }
    }
  }
  async updateToolOrder({ id, toolName, imageUrl, description }) {
    try {
      await axios.put("/user/toolorder", {
        id,
        toolName,
        imageUrl,
        description,
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedError(error.response.data);
      }
      if (error.response && error.response.status === 409) {
        throw new ConflictError(error.response.data);
      } else if (error.response && error.response.status === 422) {
        throw new InvalidDataError(error.response.data);
      } else {
        throw new Error(error.response.data);
      }
    }
  }
  async deleteToolOrder(id) {}

  /**
   *  returns true if use is in group, if not in group or can't validat due to error it returns false
   * */
  async userIsInGroup(group) {
    try {
      console.log("Started: ");
      await axios.get("/group/in/" + group);
      console.log("No error");
      return true;
    } catch (error) {
      console.log("error");
      return false;
    }
  }
}

export default new GroupService();
