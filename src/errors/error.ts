/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import config from "config";
import ApiError from "./ApiError";
import { loger } from "../logger";

const env = config.get<string>("env");

export const errorConverter = (
  err: any,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  let error = err;
  loger.debug("debug api err instance " + error);
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || (error instanceof mongoose.Error ? 400 : 500);
    const message: string =
      error.message || "bad request error or internal server error";
    error = new ApiError(statusCode, message, false, err.stack);
    // error = new ApiError(statusCode, message, false);
  }
  loger.debug("debug status code " + error.statusCode);
  next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let { statusCode, message } = err;
  if (env === "production" && !err.isOperational) {
    statusCode = 500; // INTERNAL_SERVER_ERROR
    message = "Internal Server Error";
  }

  res.locals["errorMessage"] = err.message;

  const response = {
    success: false,
    code: statusCode,
    message,
    ...(env === "development" && { stack: err.stack }),
  };

  if (env === "development") {
    loger.error(err.message);
  }

  res.status(statusCode).send(response);
};
