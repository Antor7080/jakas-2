"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedRouter = void 0;
const express_1 = require("express");
const feed_controller_1 = require("./feed.controller");
const auth_1 = require("../auth");
const feed_validation_1 = require("./feed.validation");
const router = (0, express_1.Router)();
exports.feedRouter = router;
/**
 * @objective Create feed order
 * @route POST /feed/create
 * @access private
 * @description Create feed order
 * @returns {object} 200 - An array of feed info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 *
 */
router.post("/feed/create", (0, auth_1.isLoggedin)(["agent", "farmer"]), feed_validation_1.validator, feed_controller_1.createFeed);
/**
 * @objective Get all feed order
 * @route GET /feed/getAll
 * @access private
 * @description Get all feed order
 * @returns {object} 200 - An array of feed info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 *
 */
router.get("/feed/getAll", (0, auth_1.isLoggedin)(["admin"]), feed_controller_1.getAllFeedOrder);
/**
 * @objective Get all feed order by auth user
 * @route GET /feed/getByAuthUser
 * @access private
 * @description Get all feed order by auth user
 * @returns {object} 200 - An array of feed info
 * @returns {Error}  default - Unexpected error
 *
 */
router.get("/feed/getByAuthUser", (0, auth_1.isLoggedin)(["admin", "farmer", "agent", "feedSeller"]), feed_controller_1.getByByAuthUser);
/**
 * @objective Get feed order by id
 * @route GET /feed/:id
 * @access private
 * @description Get feed order by id
 * @returns {object} 200 - An array of feed info
 * @returns {Error}  default - Unexpected error
 *
 */
router.get("/feed/:id", (0, auth_1.isLoggedin)(["admin", "farmer", "agent", "feedSeller"]), feed_controller_1.getByFeedId);
router.put("/feed/:id", (0, auth_1.isLoggedin)(["feedSeller"]), feed_validation_1.validator, feed_controller_1.confirmFeedOrder);
//feedSeller
//# sourceMappingURL=feed.route.js.map