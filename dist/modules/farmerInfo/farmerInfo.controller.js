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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilePhotoUpload = exports.qrCodeGenerator = exports.getFarmersInfo = exports.getFarmerInfoById = exports.createFarmerInfo = void 0;
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const errors_1 = require("../../errors");
const filterOption_1 = require("../../helpers/filterOption");
const qr_code_1 = require("../../helpers/qr_code");
const reqbodytransformer_1 = require("../../helpers/reqbodytransformer");
const farmerInfoService = __importStar(require("./farmerInfo.service"));
const farmerInfo_transformer_1 = require("./farmerInfo.transformer");
/**
 *
 * @objective Get all farmerInfo
 * @endpoint v1/api/farmer/info/get-all
 * @mehtod GET
 * res
 *
 * */
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.query);
        const { filters, queries } = (0, filterOption_1.filterOption)(req);
        const { farmerInfo, page, total } = yield farmerInfoService.getAll(filters, queries);
        if (total < 1) {
            throw new errors_1.ApiError(404, "FarmerInfos Not Found");
        }
        const transormedList = (0, farmerInfo_transformer_1.resTransformer)(farmerInfo);
        return res.ok({
            farmerInfo: transormedList,
            page,
            total
        }, "FarmerInfos found successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.getFarmersInfo = getAll;
/**
 *
 * @objective Get farmerInfo by id
 * @endpoint v1/api/farmer/info/object_id
 * @mehtod GET
 * @res {
    "success": true,
    "code": 200,
    "data": {
        "_id": "6450ed176dccb77fe068e036",
        "phone": "01986297089",
        "name": "Abdul habib",
        "zilla": "",
        "upazilla": "Joypurhat",
        "union": "Joypurhat",
        "village": "Joypurhat",
        "batch": 50,
        "hensTypes": "সোনালী",
        "hensCount": 600,
        "batchStartDate": "2020-05-11",
        "sprayed_disinfectants": true,
        "bleaching_cleaned": true,
        "isFumigation": true,
        "isBufferZone": true,
        "isFootBaths": true,
        "entrySpary": true,
        "company_name": "অন্যান্য",
        "isGovt": false,
        "other": "test",
        "food_company_name": "সুষমা ফিড",
        "Probiotics_days": 12,
        "isWithdrwalFollow": true,
        "antibiotics_days": 11,
        "advicer_type": "doctor",
        "prescription": [
            "prescription-1683025175649-333048810_3500369170243254_955130762730547377_n.jpg"
        ],
        "DLS_regi_no": "1212",
        "vaccine": [
            {
                "name": "a",
                "age": "10"
            },
            {
                "name": "b",
                "age": "5"
            }
        ],
        "is40_42_days": true,
        "selling_age": 40,
        "isGrowth_chart_used": true,
        "growthWeek1": 0,
        "growthWeek2": 1,
        "growthWeek3": 1,
        "growthWeek4": 1,
        "growthWeek5": 6,
        "growthWeek6": 5,
        "growthWeek7": 4,
        "growthWeek8": 2,
        "growthWeek9": 1,
        "wasteRemoval": "সরাসরি কাঁচা লিটার কৃষকের কাছে বিক্রয়",
        "average_weight": 4.5,
        "vaccinationDate": 1,
        "diseasName": "test",
        "otherDiseasName": "",
        "qr_code": "6450ed176dccb77fe068e036.png"
    },
    "message": "FarmerInfo found successfully"
}
 *
 * */
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = new mongoose_1.default.Types.ObjectId(req.params._id);
        const farmerInfo = yield farmerInfoService.getById(_id);
        if (!farmerInfo) {
            throw new errors_1.ApiError(404, "FarmerInfo Not Found");
        }
        console.log(farmerInfo);
        const transormedUser = (0, farmerInfo_transformer_1.resTransformer)(farmerInfo);
        if (farmerInfo.status === 'সম্পন্ন') {
            const qrString = config_1.default.get("url.qrCode") + _id;
            const qr = (0, qr_code_1.generateQRCode)(qrString, _id);
            transormedUser.qr_code = qr;
            yield farmerInfoService.updateById(_id, transormedUser);
        }
        // const emptyField = Object.values(transormedUser).filter((value) => value === null || value === undefined || value === '');
        // if (emptyField.length < 15) {
        //     // generate qr code
        //     const qrString: string = config.get<string>("url.qrCode") + _id;
        //     const qr: string = generateQRCode(qrString, _id as unknown as ObjectId);
        //     transormedUser.qr_code = qr;
        //     // update farmerInfo in database
        //     await farmerInfoService.updateById(_id, transormedUser);
        // }
        res.ok(transormedUser, "FarmerInfo found successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.getFarmerInfoById = getOne;
/**
 *
 * @objective Create an farmerInfo
 * @endpoint v1/api/farmer/info/create
 * @mehtod POST
 * @reqbody = {
    "name" : "Abdul Karim",
    "phone": "01986297081",
    "zilla": "Joypurhat",
    "upazilla": "Joypurhat Sador",
    "union": "Banbu",
    "village": "Mohammadabad"

}
 * @res {
    "success": true,
    "code": 201,
    "data": {
        "_id": "643ce8238762fab2caebbcd6",
        "phone": "01986297081",
        "name": "Abdul Karim",
        "zilla": "Joypurhat",
        "upazilla": "Joypurhat Sador",
        "union": "Banbu",
        "village": "Mohammadabad"
    },
    "message": "FarmerInfo created successfully"
} */
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const agent = res.locals.user;
        const prescription = req.body.prescription;
        let farmerFarmInfo = [];
        const other = req.body.company_name !== 'অন্যান্য' ? null : req.body.other;
        let info = Object.assign({}, req.body);
        let data = (0, reqbodytransformer_1.reqBodyTransformer)(req.body);
        const agentInfo = {
            phone: agent.phone,
            id: agent._id,
        };
        const isExist = yield farmerInfoService.getOne({ phone: data.phone, batch: data.batch });
        if (isExist) {
            farmerFarmInfo = yield farmerInfoService.updateById(isExist._id, Object.assign(Object.assign({}, data), { other }));
        }
        else {
            farmerFarmInfo = yield farmerInfoService.create(Object.assign(Object.assign({}, data), { other, agent: agentInfo }));
        }
        const transormedUser = (0, farmerInfo_transformer_1.resTransformer)(farmerFarmInfo);
        res.ok(transormedUser, "FarmerInfo updated successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.createFarmerInfo = create;
const qrCodeGenerator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { batch, phone } = req.query;
    try {
        if (!batch || !phone) {
            throw new errors_1.ApiError(400, "Batch and Phone number is required");
        }
        const farmerInfo = yield farmerInfoService.getOne({ batch, phone });
        if (!farmerInfo) {
            throw new errors_1.ApiError(404, "FarmerInfo Not Found");
        }
        const url = config_1.default.get("url.qrCode") + farmerInfo._id;
        const qr = (0, qr_code_1.generateQRCode)(url, farmerInfo._id);
        const updatedFarmerInfo = yield farmerInfoService.updateById(farmerInfo._id, { qr_code: qr });
        res.ok(updatedFarmerInfo, "QR Code generated successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.qrCodeGenerator = qrCodeGenerator;
const profilePhotoUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const prescription = [];
        if (req.files) {
            const fileObj = JSON.parse(JSON.stringify(req.files));
            (_a = fileObj.prescription) === null || _a === void 0 ? void 0 : _a.forEach((file) => {
                prescription.push(file.filename);
            });
        }
        res.ok(prescription, '');
    }
    catch (error) {
        next(error);
    }
});
exports.profilePhotoUpload = profilePhotoUpload;
//# sourceMappingURL=farmerInfo.controller.js.map