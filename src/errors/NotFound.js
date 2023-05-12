import BaseCaseError from "./BaseCaseError.js";

class NotFound extends BaseCaseError {
  constructor(message = "Page not found.") {
    super(message, 404);
  }
}

export default NotFound;
