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
exports.farmerInfoRouter = void 0;
const express_1 = require("express");
const fileUpload_1 = require("../../helpers/fileUpload");
const farmerInfoController = __importStar(require("./farmerInfo.controller"));
const farmerInfo_validation_1 = require("./farmerInfo.validation");
const auth_1 = require("../auth");
const router = (0, express_1.Router)();
exports.farmerInfoRouter = router;
router.get("/farmer/info", farmerInfoController.getFarmersInfo);
router.post("/farmer/info/create", auth_1.isLoggedin, fileUpload_1.upload.none(), farmerInfo_validation_1.farmerInfoValidator, farmerInfoController.createFarmerInfo);
router.get("/farmer/info/:_id", farmerInfoController.getFarmerInfoById);
router.get("/farmer/qr-code", farmerInfoController.qrCodeGenerator);
// customer profile photo upload
router.post("/farmer/prescription-upload", fileUpload_1.upload.fields([{ name: "prescription", maxCount: 10 }]), farmerInfoController.profilePhotoUpload);
//# sourceMappingURL=farmerInfo.route.js.map