import { Router } from "express";
import { create, getAllOrderForAuthUser, getOneOrder, updateOrder } from "./order.controller";
import { isLoggedin } from "../auth";
const router = Router();

/**
 * @objective Create order
 * @route POST /order
 * @access private
 * @description Create order
 * @returns {object} 200 - An array of order info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post("/order", isLoggedin(["buyer"]), create);

/**
 * @objective Get all order
 * @route GET /order
 * @access private
 * @description Get all order
 * @returns {object} 200 - An array of order info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/order", isLoggedin(["buyer", "admin", "agent", "farmer"]), getAllOrderForAuthUser);

/**
 * @objective Get order by id
 * @route GET /order/:id
 * @access private
 * @description Get order by id
 * @returns {object} 200 - An array of order info
 * @returns {Error}  default - Unexpected error
 */
router.get("/order/:id", isLoggedin(["buyer", "admin", "agent", "farmer"]), getOneOrder);

/**
 * @objective Update order
 * @route PUT /order/:id
 * @access private
 * @description Update order
 * @returns {object} 200 - An array of order info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.put("/order/:id", isLoggedin(["buyer", "admim"]), updateOrder);


export { router as orderRouter };