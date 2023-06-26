"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const auth_1 = require("../auth");
const router = (0, express_1.Router)();
exports.orderRouter = router;
/**
 * @objective Create order
 * @route POST /order
 * @access private
 * @description Create order
 * @returns {object} 200 - An array of order info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post("/order", (0, auth_1.isLoggedin)(["buyer"]), order_controller_1.create);
/**
 * @objective Get all order
 * @route GET /order
 * @access private
 * @description Get all order
 * @returns {object} 200 - An array of order info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/order", (0, auth_1.isLoggedin)(["buyer", "admin", "agent", "farmer"]), order_controller_1.getAllOrderForAuthUser);
/**
 * @objective Get order by id
 * @route GET /order/:id
 * @access private
 * @description Get order by id
 * @returns {object} 200 - An array of order info
 * @returns {Error}  default - Unexpected error
 */
router.get("/order/:id", (0, auth_1.isLoggedin)(["buyer", "admin", "agent", "farmer"]), order_controller_1.getOneOrder);
/**
 * @objective Update order
 * @route PUT /order/:id
 * @access private
 * @description Update order
 * @returns {object} 200 - An array of order info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.put("/order/:id", (0, auth_1.isLoggedin)(["buyer", "admim"]), order_controller_1.updateOrder);
//# sourceMappingURL=order.route.js.map