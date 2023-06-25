import { Router } from "express";
import { upload } from "../../helpers/fileUpload";
import { isLoggedin } from "../auth";
import * as batchInfoController from "./batch.controller";
import { farmerInfoValidator } from "./batch.validation";

const router: Router = Router();

/**
 * @objective get all batch info
 * @route GET /batch/info
 * @access private
 * @description get all batch info
 * @returns {object} 200 - An array of batch info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/batch/info", isLoggedin(["agent", "admin", "farmer"]), batchInfoController.getBatchsInfo);


/**
 * @objective add new batch info or update existing batch info
 * @route POST /batch/info/create
 * @access private
 * @description add new batch info or update existing batch info
 * @returns {object} 200 - An array of batch info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post(
  "/batch/info/create",
  isLoggedin([ "farmer", "agent"]),
  upload.none(),
  farmerInfoValidator,
  batchInfoController.createBatchInfo
);

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
router.get("/batch/info/auth/:_id", isLoggedin(["agent", "farmer", "admin", "buyer"]), batchInfoController.getBatchInfoById);

/**
 * @objective status change to ready for sale
 * @route PUT /batch/readyForSale/:_id
 * @access private
 * @description status change to ready for sale
 * @returns {object} 200 - An array of batch info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.put("/batch/readyForSale/:_id", isLoggedin(["agent", "farmer", "farmer"]), batchInfoController.readyForSale);


/**
 * @objective status change to saleable
 * @route PUT /batch/sold/:_id
 * @access private
 * @description status change to sold
 * @returns {object} 200 - An array of batch info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.put("/batch/stock/:_id", isLoggedin(["admin"]), batchInfoController.inStockToSold);

/**
 * @objective get all batch that are ready for sale
 * @route GET /batch/stock
 * @access private
 * @description get all batch that are ready for sale
 * @returns {object} 200 - An array of batch info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
 
router.get("/batch/stock", isLoggedin(["buyer", "admin"]), batchInfoController.getllForBuyer);
// router.get("/farmer/qr-code", batchInfoController.qrCodeGenerator);

// customer profile photo upload
// router.post(
//     "/farmer/prescription-upload",
//     upload.fields([{ name: "prescription", maxCount: 10 }]),
//     farmerInfoController.profilePhotoUpload
//   );

export { router as batchRouter };
