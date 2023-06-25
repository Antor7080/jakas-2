import { json } from "body-parser";
import config from "config";
import cors from "cors";
import express from "express";
import { ApiError, errorConverter, errorHandler } from "./errors";
import { responseHandler } from "./helpers/responseHandler";
import { loger } from "./logger";
import { authRouter } from "./modules/auth/auth.route";
import { batchRouter } from "./modules/batch/batch.route";
import { userRouter } from "./modules/users";
import {feedRouter} from "./modules/feed/feed.route";
import {prescriptionRouter} from "./modules/prescription/prescription.route";
import { orderRouter } from "./modules/order/order.route";
import { accountsRouter } from "./modules/accounts/accounts.route";

const app = express();
const port = config.get<number>("server.port");

app.use(cors());
app.use(json());
app.use(responseHandler);

app.use("/v1/api", authRouter);
app.use("/v1/api", batchRouter);
app.use("/v1/api", userRouter);
app.use("/v1/api", feedRouter);
app.use("/v1/api", prescriptionRouter);
app.use("/v1/api", orderRouter);
app.use("/v1/api",accountsRouter);

// static files
app.use("/public/files", express.static("./public/uploads"));

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(404, "Not found"));
});

app.use(errorConverter);
app.use(errorHandler);

const server: any = app.listen(port, () => {
  loger.info(`server is listening on port ${port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      loger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  loger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  loger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
