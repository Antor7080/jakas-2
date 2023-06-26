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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController = __importStar(require("./user.controller"));
const user_validation_1 = require("./user.validation");
const auth_1 = require("../auth");
const router = express_1.default.Router();
exports.userRouter = router;
/**
 * @objective get all user for auth user
 * @route GET /user/auth
 * @access private
 * @description get all user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/user/auth", (0, auth_1.isLoggedin)(["admin", "agent"]), userController.getAllByAuthUser);
/**
 * @objective get all user for auth user
 * @route GET /user
 * @access private
 * @description get all user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/user/", (0, auth_1.isLoggedin)(["admin", "agent", "farmer"]), userController.getAllUsers);
/**
 * @objective get user by id
 * @route GET /user/:id
 * @access private
 * @description get user by id
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 *
 */
router.get("/user/:_id", (0, auth_1.isLoggedin)(["admin", "agent"]), userController.getUser);
/**
 * @objective Create user
 * @route POST /user/add
 * @access private
 * @description Create user
 * @returns {object} 200 - An array of user info
 */
router.post("/user/add", (0, auth_1.isLoggedin)(["agent", "admin"]), user_validation_1.userValidator, userController.createUser);
/**
 * @objective Update user
 * @route PUT /user/:id
 * @access private
 * @description Update user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 *
 */
router.put("/user/:_id", (0, auth_1.isLoggedin)(["admin", "agent"]), userController.updateUser);
//# sourceMappingURL=user.route.js.map