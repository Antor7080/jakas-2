"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtInfo = void 0;
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = config_1.default.get("jwt.secret");
const getJwtInfo = function (token) {
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return decoded.id;
    }
    catch (err) {
        return false;
    }
};
exports.getJwtInfo = getJwtInfo;
//# sourceMappingURL=jwt.js.map