import InvalidRequest from "./InvalidRequest.js";

class ValidationErrors extends InvalidRequest {
  constructor(err) {
    const errorMessages = Object.values(err.errors)
      .map((err) => err.message)
      .join("; ");

    super(`ERROR MESSAGES: FOUND THIS ERRORS: ${errorMessages}`);
  }
}

export default ValidationErrors;
