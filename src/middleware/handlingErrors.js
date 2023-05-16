import mongoose from "mongoose";
import BaseCaseError from "../errors/BaseCaseError.js";
import InvalidRequest from "../errors/InvalidRequest.js";
import ValidationError from "../errors/ValidationError.js";

// callback fc -> middleware = special express fc
// intercept all errors
function handlingErrors(err, req, res, next) {
  if (err instanceof mongoose.Error.CastError) {
    new InvalidRequest().sendResponse(res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    new ValidationError(err).sendResponse(res);
  } else if (err instanceof BaseCaseError) {
    err.sendResponse(res);
  } else {
    new BaseCaseError().sendResponse(res);
  }
}

export default handlingErrors;
