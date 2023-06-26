"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGet = exports.httpPost = void 0;
const axios_1 = __importDefault(require("axios"));
const httpPost = (url, payload, config = null) => {
    if (!config) {
        return axios_1.default.post(url, payload);
    }
    return axios_1.default.post(url, payload, config);
};
exports.httpPost = httpPost;
const httpGet = (url) => {
    return axios_1.default.get(url);
};
exports.httpGet = httpGet;
//# sourceMappingURL=axios.js.map