import { Router } from "express";
import { isLoggedin } from "../auth";
import {
  getById,
  getPrescriptionByAuthUser,
  givePrescription,
  prescriptionRequest,
} from "./prescription.controller";
import { validator } from "./prescription.validation";

const router = Router();


/**
 * @objective Create prescription request
 * @route POST /prescription/request
 * @access private
 * @description Create prescription request
 * @returns {object} 200 - An array of prescription info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

router.post(
  "/prescription/request",
  isLoggedin(["farmer", "agent"]),
  validator,
  prescriptionRequest
);

/**
 * @objective Get prescription by id
 * @route GET /prescription/:id
 * @access private
 * @description Get prescription by id
 * @returns {object} 200 - An array of prescription info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/prescription/:id", getById);

/**
 * @objective Get prescription by auth user
 * @route GET /prescription
 * @access private
 * @description Get prescription by auth user
 * @returns {object} 200 - An array of prescription info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/prescription", isLoggedin(["admin", "farmer", "agent", "doctor"]), getPrescriptionByAuthUser);

/**
 * @objective Give prescription
 * @route PUT /prescription/:id
 * @access private
 * @description Give prescription
 * @returns {object} 200 - An array of prescription info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.put("/prescription/:id", isLoggedin(["doctor"]), validator, givePrescription);

export { router as prescriptionRouter };
