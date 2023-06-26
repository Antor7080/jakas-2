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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../../errors");
const users_1 = require("../users");
const responseHandler_1 = require("../../helpers/responseHandler");
const JWT_SECRET = config_1.default.get("jwt.secret");
const JWT_EXPIRES_IN = config_1.default.get("jwt.accessTokenExpiresIn");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, password } = req.body;
    try {
        if (!phone || !password) {
            throw new errors_1.ApiError((0, responseHandler_1.unProcessable)(), "Phone No or Password is Missing");
        }
        let user = yield users_1.userService.getOne({ phone: phone });
        if (!user) {
            throw new errors_1.ApiError(404, "User Not Found");
        }
        if (!bcryptjs_1.default.compareSync(password, user.password)) {
            throw new errors_1.ApiError((0, responseHandler_1.unAuthorized)(), "invalid phone or password");
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, phone: user.phone }, JWT_SECRET, { expiresIn: `${JWT_EXPIRES_IN}d` });
        // const userRes = resTransformer(user);
        return res.status(200).send({
            success: true,
            data: {
                token: token,
                user: {
                    _id: user._id,
                    name: user.name,
                    phone: user.phone,
                    role: user.role,
                    zilla: user.zilla,
                    upazilla: user.upazilla,
                    union: user.union,
                    village: user.village,
                },
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = login;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const authUser = (_a = res.locals) === null || _a === void 0 ? void 0 : _a.user;
        const { password } = authUser;
        if (!req.body.new_password || !req.body.old_password) {
            throw new errors_1.ApiError((0, responseHandler_1.unProcessable)(), "Password or Phone Missing");
        }
        if (!bcryptjs_1.default.compareSync(req.body.old_password, password)) {
            throw new errors_1.ApiError((0, responseHandler_1.unAuthorized)(), "Unautorized Customer");
        }
        if (bcryptjs_1.default.compareSync(req.body.new_password, password)) {
            throw new errors_1.ApiError((0, responseHandler_1.unProcessable)(), "New Password cannot be the same as Old Password");
        }
        authUser.password = req.body.new_password;
        const result = authUser.save();
        return res.ok({ phone: result === null || result === void 0 ? void 0 : result.phone });
    }
    catch (error) {
        next(error);
    }
});
exports.changePassword = changePassword;
//# sourceMappingURL=auth.controller.js.map