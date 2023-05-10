import BaseCaseError from "./BaseCaseError.js";

class InvalidRequest extends BaseCaseError {
  constructor(message = "Invalid input data") {
    super(message, 400);
  }
}

export default InvalidRequest;
