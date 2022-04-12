import { BaseError, httpStatusCodes } from "./baseError";

class Api404Error extends BaseError {
  constructor(
    name: string | undefined,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = "Not found.",
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

export { Api404Error };
