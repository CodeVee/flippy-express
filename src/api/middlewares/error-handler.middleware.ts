import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../models/api-response.model";
import { CustomError, ServerError } from "./../models/custom-error.model";

/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
function handleError(
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new ServerError(
      "Oh no, this is embarrasing. We are having troubles my friend"
    );
  }

  const response = ApiResponse.failureMessage(err.message);
  res.status((customError as CustomError).statusCode).json(response);
}

export default handleError;
