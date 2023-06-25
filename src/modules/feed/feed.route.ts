import { Router } from "express";
import { createFeed, getAllFeedOrder, getByFeedId, confirmFeedOrder, getByByAuthUser  } from "./feed.controller";
import { isLoggedin } from "../auth";
import { validator } from "./feed.validation";
const router = Router();


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
router.post("/feed/create", isLoggedin(["agent", "farmer"]), validator, createFeed);


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
router.get("/feed/getAll", isLoggedin(["admin"]), getAllFeedOrder);

/**
 * @objective Get all feed order by auth user
 * @route GET /feed/getByAuthUser
 * @access private
 * @description Get all feed order by auth user
 * @returns {object} 200 - An array of feed info
 * @returns {Error}  default - Unexpected error
 * 
 */
router.get("/feed/getByAuthUser", isLoggedin(["admin", "farmer", "agent", "feedSeller"]), getByByAuthUser);

/**
 * @objective Get feed order by id
 * @route GET /feed/:id
 * @access private
 * @description Get feed order by id
 * @returns {object} 200 - An array of feed info
 * @returns {Error}  default - Unexpected error
 * 
 */
router.get("/feed/:id", isLoggedin(["admin", "farmer", "agent", "feedSeller"]), getByFeedId);
router.put("/feed/:id", isLoggedin([ "feedSeller"]), validator, confirmFeedOrder);


export  {router as feedRouter};

//feedSeller