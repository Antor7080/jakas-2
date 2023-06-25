import { Router } from "express";
import { isLoggedin } from "../auth";
import {
  addOrUpdateAccounts,
  getAllAccountsBYAuthUser,
  getOneByBatchId,
  getOneById,
} from "./accounts.controller";

const router = Router();

/**
 * @objective Create or update accounts for a batch
 * @route POST /accounts
 * @access private
 * @description Create or update accounts for a batch
 * @returns {object} 200 - An array of accounts info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post("/accounts", isLoggedin(["agent", "farmer"]), addOrUpdateAccounts);

/**
 * @objective Get accounts by id
 * @route GET /accounts/:id
 * @access private
 * @description Get accounts by id
 * @returns {object} 200 - An array of accounts info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get(
  "/accounts/:id",
  isLoggedin(["agent", "admin", "farmer"]),
  getOneById
);

/**
 * @objective Get accounts by batch id
 * @route GET /accounts/batch/:id
 * @access private
 * @description Get accounts by batch id
 * @returns {object} 200 - An array of accounts info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get(
  "/accounts/batch/:id",
  isLoggedin(["agent", "admin", "farmer"]),
  getOneByBatchId
);

/**
 * @objective Get accounts by auth user
 * @route GET /accounts
 * @access private
 * @description Get accounts by auth user
 * @returns {object} 200 - An array of accounts info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get(
  "/accounts",
  isLoggedin(["agent", "admin", "farmer"]),
  getAllAccountsBYAuthUser
);

export { router as accountsRouter };
