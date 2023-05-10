import mongoose from "mongoose";
import BaseCaseError from "../errors/BaseCaseError.js";
import InvalidRequest from "../errors/InvalidRequest.js";
import ValidationErrors from "../errors/ValidationErrors.js";

// callback fc -> middleware = special express fc
// intercept all errors
function handlingErrors(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    new InvalidRequest().sendResponse(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    new ValidationErrors(err).sendResponse(res);
  } else {
    new BaseCaseError().sendResponse(res);
  }
}

export default handlingErrors;
