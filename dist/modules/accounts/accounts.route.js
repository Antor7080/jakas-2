"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountsRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../auth");
const accounts_controller_1 = require("./accounts.controller");
const router = (0, express_1.Router)();
exports.accountsRouter = router;
/**
 * @objective Create or update accounts for a batch
 * @route POST /accounts
 * @access private
 * @description Create or update accounts for a batch
 * @returns {object} 200 - An array of accounts info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post("/accounts", (0, auth_1.isLoggedin)(["agent", "farmer"]), accounts_controller_1.addOrUpdateAccounts);
/**
 * @objective Get accounts by id
 * @route GET /accounts/:id
 * @access private
 * @description Get accounts by id
 * @returns {object} 200 - An array of accounts info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/accounts/:id", (0, auth_1.isLoggedin)(["agent", "admin", "farmer"]), accounts_controller_1.getOneById);
/**
 * @objective Get accounts by batch id
 * @route GET /accounts/batch/:id
 * @access private
 * @description Get accounts by batch id
 * @returns {object} 200 - An array of accounts info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/accounts/batch/:id", (0, auth_1.isLoggedin)(["agent", "admin", "farmer"]), accounts_controller_1.getOneByBatchId);
/**
 * @objective Get accounts by auth user
 * @route GET /accounts
 * @access private
 * @description Get accounts by auth user
 * @returns {object} 200 - An array of accounts info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/accounts", (0, auth_1.isLoggedin)(["agent", "admin", "farmer"]), accounts_controller_1.getAllAccountsBYAuthUser);
//# sourceMappingURL=accounts.route.js.map