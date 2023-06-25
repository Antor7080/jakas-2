import express, { Router } from "express";
import * as userController from "./user.controller";
import { userValidator } from "./user.validation";
import { isLoggedin } from "../auth";

const router: Router = express.Router();


/**
 * @objective get all user for auth user
 * @route GET /user/auth
 * @access private
 * @description get all user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/user/auth", isLoggedin(["admin", "agent"]), userController.getAllByAuthUser);
/**
 * @objective get all user for auth user
 * @route GET /user
 * @access private
 * @description get all user
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/user/", isLoggedin(["admin", "agent", "farmer"]), userController.getAllUsers);


/**
 * @objective get user by id
 * @route GET /user/:id
 * @access private
 * @description get user by id
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * 
 */

router.get("/user/:_id", isLoggedin(["admin", "agent"]), userController.getUser);


/**
 * @objective Create user
 * @route POST /user/add
 * @access private
 * @description Create user
 * @returns {object} 200 - An array of user info
 */
router.post("/user/add", isLoggedin(["agent", "admin"]), userValidator, userController.createUser);

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
router.put("/user/:_id",  isLoggedin(["admin", "agent"]), userController.updateUser);


export { router as userRouter };
