"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const config_1 = __importDefault(require("config"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const errors_1 = require("./errors");
const responseHandler_1 = require("./helpers/responseHandler");
const logger_1 = require("./logger");
const auth_route_1 = require("./modules/auth/auth.route");
const batch_route_1 = require("./modules/batch/batch.route");
const users_1 = require("./modules/users");
const feed_route_1 = require("./modules/feed/feed.route");
const prescription_route_1 = require("./modules/prescription/prescription.route");
const order_route_1 = require("./modules/order/order.route");
const accounts_route_1 = require("./modules/accounts/accounts.route");
const app = (0, express_1.default)();
const port = config_1.default.get("server.port");
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use(responseHandler_1.responseHandler);
app.use("/v1/api", auth_route_1.authRouter);
app.use("/v1/api", batch_route_1.batchRouter);
app.use("/v1/api", users_1.userRouter);
app.use("/v1/api", feed_route_1.feedRouter);
app.use("/v1/api", prescription_route_1.prescriptionRouter);
app.use("/v1/api", order_route_1.orderRouter);
app.use("/v1/api", accounts_route_1.accountsRouter);
// static files
app.use("/public/files", express_1.default.static("./public/uploads"));
// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
    next(new errors_1.ApiError(404, "Not found"));
});
app.use(errors_1.errorConverter);
app.use(errors_1.errorHandler);
const server = app.listen(port, () => {
    logger_1.loger.info(`server is listening on port ${port}`);
});
const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger_1.loger.info("Server closed");
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    logger_1.loger.error(error);
    exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
    logger_1.loger.info("SIGTERM received");
    if (server) {
        server.close();
    }
});
//# sourceMappingURL=index.js.map