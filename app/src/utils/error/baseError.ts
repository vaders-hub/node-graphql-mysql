const httpStatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

class BaseError extends Error {
  statusCode?: number | undefined;
  isOperational?: any;
  description?: any;

  constructor(
    name?: string,
    statusCode?: number,
    isOperational?: any,
    description?: any
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name as string;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

export { BaseError, httpStatusCodes };
