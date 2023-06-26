"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController = __importStar(require("./auth.controller"));
const auth_middleware_1 = require("./auth.middleware");
const router = express_1.default.Router();
exports.authRouter = router;
/**
 * @objective login user
 * @route POST /user/login
 * @access public
 * @description login user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post("/user/login", authController.loginUser);
/**
 * @objective change password
 * @route POST /user/change-password
 * @access private
 * @description change password
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post("/user/change-password", (0, auth_middleware_1.isLoggedin)(["admin", "buyer", "feedSaler", "doctor", "farmer"]), authController.changePassword);
//# sourceMappingURL=auth.route.js.map