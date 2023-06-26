"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loger = void 0;
const logger_1 = __importDefault(require("./logger"));
const loger = logger_1.default.getLogger();
exports.loger = loger;
// import { loger } from '../../logger'
// loger.info('info :>> ', "I m logger info");
// loger.error('error :>> ', "I m logger error");
// loger.debug('debug :>> ', "I m logger debug");
//# sourceMappingURL=index.js.map