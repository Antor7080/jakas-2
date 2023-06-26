"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchRouter = void 0;
const express_1 = require("express");
const fileUpload_1 = require("../../helpers/fileUpload");
const auth_1 = require("../auth");
const batchInfoController = __importStar(require("./batch.controller"));
const batch_validation_1 = require("./batch.validation");
const router = (0, express_1.Router)();
exports.batchRouter = router;
/**
 * @objective get all batch info
 * @route GET /batch/info
 * @access private
 * @description get all batch info
 * @returns {object} 200 - An array of batch info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/batch/info", (0, auth_1.isLoggedin)(["agent", "admin", "farmer"]), batchInfoController.getBatchsInfo);
/**
 * @objective add new batch info or update existing batch info
 * @route POST /batch/info/create
 * @access private
 * @description add new batch info or update existing batch info
 * @returns {object} 200 - An array of batch info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post("/batch/info/create", (0, auth_1.isLoggedin)(["farmer", "agent"]), fileUpload_1.upload.none(), batch_validation_1.farmerInfoValidator, batchInfoController.createBatchInfo);
/**
 * @objective get batch info by id
 * @route GET /batch/info/:_id
 * @access private
 * @description get batch info by id
 * @returns {object} 200 - An array of batch info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/batch/info/:_id", batchInfoController.getBatchInfoById);
/**
 * @objective get batch info by id
 * @route GET /batch/info/auth/:_id
 * @access private
 * @description get batch info by id
 * @returns {object} 200 - An array of batch info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/batch/info/auth/:_id", (0, auth_1.isLoggedin)(["agent", "farmer", "admin", "buyer"]), batchInfoController.getBatchInfoById);
/**
 * @objective status change to ready for sale
 * @route PUT /batch/readyForSale/:_id
 * @access private
 * @description status change to ready for sale
 * @returns {object} 200 - An array of batch info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.put("/batch/readyForSale/:_id", (0, auth_1.isLoggedin)(["agent", "farmer", "farmer"]), batchInfoController.readyForSale);
/**
 * @objective status change to saleable
 * @route PUT /batch/sold/:_id
 * @access private
 * @description status change to sold
 * @returns {object} 200 - An array of batch info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.put("/batch/stock/:_id", (0, auth_1.isLoggedin)(["admin"]), batchInfoController.inStockToSold);
/**
 * @objective get all batch that are ready for sale
 * @route GET /batch/stock
 * @access private
 * @description get all batch that are ready for sale
 * @returns {object} 200 - An array of batch info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/batch/stock", (0, auth_1.isLoggedin)(["buyer", "admin"]), batchInfoController.getllForBuyer);
//# sourceMappingURL=batch.route.js.map