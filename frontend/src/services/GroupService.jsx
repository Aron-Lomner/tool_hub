import UnauthorizedError from "../errors/UnauthorizedError";

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
    console.log(response);
  }
}

export default new GroupService();
