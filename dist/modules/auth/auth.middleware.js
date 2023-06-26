"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedin = void 0;
const errors_1 = require("../../errors");
const jwt_1 = require("../../helpers/jwt");
const responseHandler_1 = require("../../helpers/responseHandler");
const users_1 = require("../users");
const authorization = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bearerAuthString = req.header("Authorization");
            if (!bearerAuthString) {
                throw new errors_1.ApiError((0, responseHandler_1.notAccepted)(), "Authorization Header is Missing");
            }
            const token = bearerAuthString.replace("Bearer ", "");
            let userId = (0, jwt_1.getJwtInfo)(token);
            if (!userId) {
                throw new errors_1.ApiError((0, responseHandler_1.unAuthorized)(), "Unauthorized");
            }
            const user = yield users_1.userService.getById(userId);
            if (!user) {
                throw new errors_1.ApiError((0, responseHandler_1.unAuthorized)(), "Unauthorized User");
            }
            if (!roles.includes(user.role)) {
                throw new errors_1.ApiError((0, responseHandler_1.unAuthorized)(), "Unauthorized User");
            }
            // bind user information into res.locals object
            res.locals["user"] = user;
            return next();
        }
        catch (error) {
            return next(error);
        }
    });
};
exports.isLoggedin = authorization;
const isLoggedin1 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bearerAuthString = req.header("Authorization");
        if (!bearerAuthString) {
            throw new errors_1.ApiError((0, responseHandler_1.notAccepted)(), "Authorization Header is Missing");
        }
        const token = bearerAuthString.replace("Bearer ", "");
        let userId = (0, jwt_1.getJwtInfo)(token);
        if (!userId) {
            throw new errors_1.ApiError((0, responseHandler_1.unAuthorized)(), "Unauthorized");
        }
        const user = yield users_1.userService.getById(userId);
        if (!user) {
            throw new errors_1.ApiError((0, responseHandler_1.unAuthorized)(), "Unauthorized User");
        }
        // bind user information into res.locals object
        res.locals["user"] = user;
        return next();
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=auth.middleware.js.map