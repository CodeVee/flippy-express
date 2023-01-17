class CustomError {
  message: string;
  statusCode: number;

  constructor(
    message: string = 'Internal Error',
    statusCode: number = 500,
  ) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

class AuthenticationError extends CustomError {
  constructor(message: string) {
    super(message, 401);
  }
}

class AuthorizationError extends CustomError {
  constructor(message: string) {
    super(message, 403);
  }
}

class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}

class ServerError extends CustomError {
  constructor() {
    super();
  }
}

export {
  CustomError,
  BadRequestError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ServerError,
};
