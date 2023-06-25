import express, { Router } from "express";
import * as authController from "./auth.controller";
import { isLoggedin } from "./auth.middleware";

const router: Router = express.Router();

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

router.post(
  "/user/change-password",
  isLoggedin(["admin", "buyer", "feedSaler", "doctor", "farmer"]),
  authController.changePassword
);
export { router as authRouter };
