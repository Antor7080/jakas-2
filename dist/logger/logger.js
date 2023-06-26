"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
const config_1 = __importDefault(require("config"));
const logConfiguration = config_1.default.get("log4js");
log4js_1.default.configure(logConfiguration);
exports.default = log4js_1.default;
//# sourceMappingURL=logger.js.map