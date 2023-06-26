"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prescriptionRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../auth");
const prescription_controller_1 = require("./prescription.controller");
const prescription_validation_1 = require("./prescription.validation");
const router = (0, express_1.Router)();
exports.prescriptionRouter = router;
/**
 * @objective Create prescription request
 * @route POST /prescription/request
 * @access private
 * @description Create prescription request
 * @returns {object} 200 - An array of prescription info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post("/prescription/request", (0, auth_1.isLoggedin)(["farmer", "agent"]), prescription_validation_1.validator, prescription_controller_1.prescriptionRequest);
/**
 * @objective Get prescription by id
 * @route GET /prescription/:id
 * @access private
 * @description Get prescription by id
 * @returns {object} 200 - An array of prescription info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/prescription/:id", prescription_controller_1.getById);
/**
 * @objective Get prescription by auth user
 * @route GET /prescription
 * @access private
 * @description Get prescription by auth user
 * @returns {object} 200 - An array of prescription info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/prescription", (0, auth_1.isLoggedin)(["admin", "farmer", "agent", "doctor"]), prescription_controller_1.getPrescriptionByAuthUser);
/**
 * @objective Give prescription
 * @route PUT /prescription/:id
 * @access private
 * @description Give prescription
 * @returns {object} 200 - An array of prescription info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.put("/prescription/:id", (0, auth_1.isLoggedin)(["doctor"]), prescription_validation_1.validator, prescription_controller_1.givePrescription);
//# sourceMappingURL=prescription.route.js.map