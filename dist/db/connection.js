"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
let connection = {
    jakas_poultryConnection: mongoose_1.default.createConnection(config_1.default.get("db.connection.jakas_poultry.url"))
};
exports.connection = connection;
//# sourceMappingURL=connection.js.map