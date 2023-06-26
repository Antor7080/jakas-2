"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorConverter = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const ApiError_1 = __importDefault(require("./ApiError"));
const logger_1 = require("../logger");
const env = config_1.default.get("env");
const errorConverter = (err, _req, _res, next) => {
    let error = err;
    logger_1.loger.debug("debug api err instance " + error);
    if (!(error instanceof ApiError_1.default)) {
        const statusCode = error.statusCode || (error instanceof mongoose_1.default.Error ? 400 : 500);
        const message = error.message || "bad request error or internal server error";
        error = new ApiError_1.default(statusCode, message, false, err.stack);
        // error = new ApiError(statusCode, message, false);
    }
    logger_1.loger.debug("debug status code " + error.statusCode);
    next(error);
};
exports.errorConverter = errorConverter;
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
    let { statusCode, message } = err;
    if (env === "production" && !err.isOperational) {
        statusCode = 500; // INTERNAL_SERVER_ERROR
        message = "Internal Server Error";
    }
    res.locals["errorMessage"] = err.message;
    const response = Object.assign({ success: false, code: statusCode, message }, (env === "development" && { stack: err.stack }));
    if (env === "development") {
        logger_1.loger.error(err.message);
    }
    res.status(statusCode).send(response);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map