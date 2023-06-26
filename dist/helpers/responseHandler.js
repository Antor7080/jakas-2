"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notAccepted = exports.internalServerError = exports.noContent = exports.forbidden = exports.unAuthorized = exports.unProcessable = exports.notFound = exports.responseHandler = void 0;
const CONTINUE = 100;
const OK = 200;
const CREATED = 201;
const ACCEPTED = 202;
const NO_CONTENT = 204;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const NOT_ACCEPTED = 406;
const REQUEST_TIMEOUT = 408;
const UNPROCESSABLE = 422;
const INTERNAL_SERVER_ERROR = 500;
const NOT_IMPLEMENTED = 501;
const BAD_GATEWAY = 502;
const SERVICE_UNAVAILABLE = 503;
const GATEWAY_TIME_OUT = 504;
const notFound = () => {
    return NOT_FOUND;
};
exports.notFound = notFound;
const notAccepted = () => {
    return NOT_ACCEPTED;
};
exports.notAccepted = notAccepted;
const noContent = () => {
    return NO_CONTENT;
};
exports.noContent = noContent;
const unProcessable = () => {
    return UNPROCESSABLE;
};
exports.unProcessable = unProcessable;
const internalServerError = () => {
    return INTERNAL_SERVER_ERROR;
};
exports.internalServerError = internalServerError;
const unAuthorized = () => {
    return UNAUTHORIZED;
};
exports.unAuthorized = unAuthorized;
const forbidden = () => {
    return FORBIDDEN;
};
exports.forbidden = forbidden;
// response handler middleware
const responseHandler = (req, res, next) => {
    // return success response
    const success = (statusCode, data, message) => {
        const code = statusCode < 400 ? statusCode : OK;
        return res.status(statusCode).send({
            success: true,
            code: code,
            data: data,
            message: message || "Successfully Done",
        });
    };
    const falsy = (statusCode, data, message) => {
        const code = statusCode < 400 ? statusCode : OK;
        return res.status(statusCode).send({
            success: false,
            code: code,
            data: data,
            message: message || "False",
        });
    };
    // return fail response
    const error = (statusCode, message) => {
        const code = statusCode >= 400 && statusCode < 500 ? statusCode : BAD_REQUEST;
        return res.status(statusCode).send({
            success: false,
            code: code,
            message: message || "Failed",
        });
    };
    // return no content response
    const noContent = (statusCode) => {
        return res.status(statusCode).send({
            success: true,
            code: statusCode,
        });
    };
    // for sending ok operation
    res.ok = (data, message) => {
        return success(OK, data, message || "OK");
    };
    res.okFalse = (data, message) => {
        return falsy(OK, data, message || "OK but False");
    };
    // for sending created operation
    res.created = (data, message) => {
        return success(CREATED, data, message || "Successfully Created.");
    };
    // for sending updated operation
    res.updated = (data, message) => {
        return success(CREATED, data, message || "Successfully Updated.");
    };
    // for sending deleted operation
    res.noContent = () => {
        return noContent(ACCEPTED);
    };
    // for sending failed operation
    res.unauthorized = (message) => {
        return error(UNAUTHORIZED, message || "Unauthorized!");
    };
    res.unprocessable = (message) => {
        return error(NOT_FOUND, message || "Unprocessable!");
    };
    res.notFound = (message) => {
        return error(NOT_FOUND, message || "Not Found!");
    };
    res.internalServerError = (message) => {
        return error(INTERNAL_SERVER_ERROR, message || "Internal Server Error");
    };
    next();
};
exports.responseHandler = responseHandler;
//# sourceMappingURL=responseHandler.js.map