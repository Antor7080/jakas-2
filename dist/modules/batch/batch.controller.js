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
exports.readyForSale = exports.inStockToSold = exports.getllForBuyer = exports.getBatchsInfo = exports.getBatchInfoById = exports.createBatchInfo = void 0;
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const errors_1 = require("../../errors");
const filterOption_1 = require("../../helpers/filterOption");
const qr_code_1 = require("../../helpers/qr_code");
const user_service_1 = require("../users/user.service");
const batchInfoService = __importStar(require("./batch.service"));
const batch_transformer_1 = require("./batch.transformer");
/**
 *
 * @objective Get all batchInfo
 * @endpoint v1/api/batch/info
 * @mehtod GET
 * @res {
    "success": true,
    "code": 200,
    "data": [{
        "_id": "648ef120bf897464b564f420",
        "batch_no": 10,
        "shed_no": 0,
        "hensTypes": "সোনালী",
        "hensCount": 600,
        "batchStartDate": "1023-06-13",
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
        "prescription": [],
        "DLS_regi_no": "1212",
        "vaccine": [
            {
                "name": "a",
                "age": 10,
                "_id": "648ef120bf897464b564f421"
            },
            {
                "name": "b",
                "age": 5,
                "_id": "648ef120bf897464b564f422"
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
        "agent": {
            "phone": "01986297080",
            "name": "Antor",
            "Id": "6475bef77b9d56801cfb7d98"
        },
        "status": "চলমান",
        "farmer": {
            "phone": "01900000000",
            "name": "user1",
            "zilla": "Dhaka",
            "upazilla": "Mirpur",
            "union": "Shewrapara",
            "village": "N/A",
            "Id": "6475c66194ae2a98c557ed1c"
        },
        "addedBy": "6475c66194ae2a98c557ed1c",
        "audit_trails": {
            "created_at": "2023-06-18T11:57:20.341Z",
            "created_by": "6475c66194ae2a98c557ed1c",
            "created_detail": "Created By user1 (01900000000)"
        },
        "mortality": [
            {
                "date": "2020-05-11",
                "count": 5,
                "age": 364116,
                "_id": "647d75e1d53fd816d113bc0c"
            },
            {
                "date": "2020-05-13",
                "count": 6,
                "age": 364118,
                "_id": "647d75e1d53fd816d113bc0d"
            },
            {
                "date": "2020-05-14",
                "count": 7,
                "age": 364119,
                "_id": "647d75e1d53fd816d113bc0e"
            },
            {
                "date": "2020-05-16",
                "count": 7,
                "age": 364121,
                "_id": "648ef120bf897464b564f426"
            }
        ],
        "totalDeath": 25,
        "totalavailable": 575,
        "age": 365249,
        "createdAt": "2023-06-18T11:57:20.363Z",
        "updatedAt": "2023-06-18T11:57:20.363Z"
    },]
    "message": "BatchInfo created successfully"
}
 * */
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    try {
        const { filters, queries } = (0, filterOption_1.filterOption)(req);
        // filter with auth user
        let filtersWithAuthUser = Object.assign({}, filters);
        if (user.role === "agent") {
            filtersWithAuthUser = Object.assign(Object.assign({}, filtersWithAuthUser), { "agent.Id": user._id });
        }
        if (user.role === "farmer") {
            filtersWithAuthUser = Object.assign(Object.assign({}, filtersWithAuthUser), { "farmer.Id": user._id });
        }
        console.log(filtersWithAuthUser);
        const { batch, page, total } = yield batchInfoService.getAll(filtersWithAuthUser, queries);
        if (total < 1) {
            throw new errors_1.ApiError(404, "BatchInfo Not Found");
        }
        // populate  and farmer
        const transormedList = (0, batch_transformer_1.resTransformer)(batch, user.role);
        return res.ok({
            batchInfo: transormedList,
            page,
            total,
        }, "BatchInfo found successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.getBatchsInfo = getAll;
/**
 *
 * @objective Create an batch
 * @endpoint v1/api/farmer/info/create
 * @mehtod POST
 * @reqbody = {
    shed_no: '2',
  batch_no: '50',
  hensTypes: 'সোনালী',
  hensCount: '600',
  batchStartDate: '2020-05-11',
  sprayed_disinfectants: 'true',
  bleaching_cleaned: 'true',
  isFumigation: 'true',
  isBufferZone: 'true',
  isFootBaths: 'true',
  entrySpary: 'true',
  company_name: 'অন্যান্য',
  isGovt: 'false',
  other: 'test',
  food_company_name: 'সুষমা ফিড',
  Probiotics_days: '12',
  isWithdrwalFollow: 'true',
  antibiotics_days: '11',
  advicer_type: 'doctor',
  DLS_regi_no: '1212',
  is40_42_days: 'true',
  selling_age: '40',
  isGrowth_chart_used: 'true',
  growthWeek1: '0',
  growthWeek2: '1',
  growthWeek3: '1',
  growthWeek4: '1',
  growthWeek5: '6',
  growthWeek6: '5',
  growthWeek7: '4',
  growthWeek8: '2',
  growthWeek9: '1',
  wasteRemoval: 'সরাসরি কাঁচা লিটার কৃষকের কাছে বিক্রয়',
  average_weight: '4.5',
  vaccine: [
    [Object: null prototype] { name: 'a', age: '10' },
    [Object: null prototype] { name: 'b', age: '5' }
  ],
  farmerId: '6476e842a63f682838c9fc17'

}
 * @res {
     "success": true,
    "code": 200,
    "data": {
        "_id": "64787b8db564c9c4309d2cea",
        "shed_no": 3,
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
        "prescription": [],
        "DLS_regi_no": "1212",
        "vaccine": [
            {
                "name": "a",
                "age": 10,
                "_id": "64787b9ab564c9c4309d2cf3"
            },
            {
                "name": "b",
                "age": 5,
                "_id": "64787b9ab564c9c4309d2cf4"
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
        "agent": {
            "name": "user1",
            "phone": "01900000000",
            "Id": "6475c66194ae2a98c557ed1c"
        },
        "status": "চলমান",
        "farmer": {
            "name": "abc",
            "phone": "01900000005",
            "Id": "6476e842a63f682838c9fc17"
        },
        "addedBy": "6475c66194ae2a98c557ed1c",
        "audit_trails": {
            "created_at": "2023-06-01T11:05:49.282Z",
            "created_by": "6475c66194ae2a98c557ed1c",
            "created_detail": "Created By user1 (01900000000)",
            "updated_at": "2023-06-01T11:06:02.025Z",
            "updated_by": "6475c66194ae2a98c557ed1c",
            "updated_detail": "Updated By user1 (01900000000)"
        }
    },
    "message": "BatchInfo updated successfully"
} */
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.user;
        const farmerId = new mongoose_1.default.Types.ObjectId(req.body.farmerId);
        const farmer = yield (0, user_service_1.getById)(farmerId);
        if (!farmer)
            throw new errors_1.ApiError(404, "Farmer Not Found");
        //calculate mortality age from batch start date to mortality date
        const mortality = req.body.mortality;
        const mortalityAge = mortality === null || mortality === void 0 ? void 0 : mortality.map((mortality) => {
            const date1 = new Date(mortality.date);
            const date2 = new Date(req.body.batchStartDate);
            if (date1.getTime() < date2.getTime())
                throw new errors_1.ApiError(400, "Mortality date can't be less than batch start date");
            const diffTime = Math.abs(date2.getTime() - date1.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return Object.assign(Object.assign({}, mortality), { age: diffDays + 1 });
        });
        // create batch info object to save
        const info = Object.assign(Object.assign({}, req.body), { agent: farmer.addedBy, farmer: {
                name: farmer.name,
                phone: farmer.phone,
                Id: farmer._id,
                zilla: farmer.zilla,
                upazilla: farmer.upazilla,
                village: farmer.village,
                union: farmer.union,
            }, mortality: mortalityAge, addedBy: user._id });
        //check if batch is already exist
        const isExist = yield batchInfoService.getOne({
            batch_no: req.body.batch_no,
            shed_no: req.body.shed_no,
            "farmer.phone": farmer.phone,
        });
        //if exist update else create
        if (isExist) {
            const updatedInfo = yield batchInfoService.updateById(isExist._id, info, {
                updated_by: user._id,
                updated_detail: `Updated By ${user.name} (${user.phone})`,
            });
            const transormedBatch = (0, batch_transformer_1.resTransformer)(updatedInfo);
            return res.ok(transormedBatch, "Batchinfo updated successfully");
        }
        //create new batch
        info.audit_trails = {
            created_by: user._id,
            created_at: new Date(),
            created_detail: `Created By ${user.name} (${user.phone})`,
        };
        const batchInfo = yield batchInfoService.create(info);
        const transormedBatch = (0, batch_transformer_1.resTransformer)(batchInfo);
        res.ok(transormedBatch, "BatchInfo created successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.createBatchInfo = create;
/**
 *
 * @objective Get batchInfo by id
 * @endpoint v1/api/batch/info/:id
 * @mehtod GET
 * @res {
    "success": true,
    "code": 200,
    "data": {
        "_id": "648ef120bf897464b564f420",
        "batch_no": 10,
        "shed_no": 0,
        "hensTypes": "সোনালী",
        "hensCount": 600,
        "batchStartDate": "1023-06-13",
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
        "prescription": [],
        "DLS_regi_no": "1212",
        "vaccine": [
            {
                "name": "a",
                "age": 10,
                "_id": "648ef120bf897464b564f421"
            },
            {
                "name": "b",
                "age": 5,
                "_id": "648ef120bf897464b564f422"
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
        "agent": {
            "phone": "01986297080",
            "name": "Antor",
            "Id": "6475bef77b9d56801cfb7d98"
        },
        "status": "চলমান",
        "farmer": {
            "phone": "01900000000",
            "name": "user1",
            "zilla": "Dhaka",
            "upazilla": "Mirpur",
            "union": "Shewrapara",
            "village": "N/A",
            "Id": "6475c66194ae2a98c557ed1c"
        },
        "addedBy": "6475c66194ae2a98c557ed1c",
        "audit_trails": {
            "created_at": "2023-06-18T11:57:20.341Z",
            "created_by": "6475c66194ae2a98c557ed1c",
            "created_detail": "Created By user1 (01900000000)"
        },
        "mortality": [
            {
                "date": "2020-05-11",
                "count": 5,
                "age": 364116,
                "_id": "647d75e1d53fd816d113bc0c"
            },
            {
                "date": "2020-05-13",
                "count": 6,
                "age": 364118,
                "_id": "647d75e1d53fd816d113bc0d"
            },
            {
                "date": "2020-05-14",
                "count": 7,
                "age": 364119,
                "_id": "647d75e1d53fd816d113bc0e"
            },
            {
                "date": "2020-05-16",
                "count": 7,
                "age": 364121,
                "_id": "648ef120bf897464b564f426"
            }
        ],
        "totalDeath": 25,
        "totalavailable": 575,
        "age": 365249,
        "createdAt": "2023-06-18T11:57:20.363Z",
        "updatedAt": "2023-06-18T11:57:20.363Z"
    },
    "message": "batch found successfully"
}
 *
 * */
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    try {
        const _id = new mongoose_1.default.Types.ObjectId(req.params._id);
        console.log(_id);
        const batchInfo = yield batchInfoService.getById(_id);
        if (!batchInfo) {
            throw new errors_1.ApiError(404, "BatchInfo Not Found");
        }
        if (batchInfo.status !== "চলমান") {
            const url = config_1.default.get("url.qrCode") + (batchInfo === null || batchInfo === void 0 ? void 0 : batchInfo._id);
            batchInfo.qr_code = (0, qr_code_1.generateQRCode)(url, batchInfo === null || batchInfo === void 0 ? void 0 : batchInfo._id);
            yield batchInfoService.updateById(batchInfo === null || batchInfo === void 0 ? void 0 : batchInfo._id, {
                qr_code: batchInfo.qr_code,
            });
        }
        const transormedBatch = (0, batch_transformer_1.resTransformer)(batchInfo, user === null || user === void 0 ? void 0 : user.role);
        res.ok(transormedBatch, "BatchInfo found successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.getBatchInfoById = getOne;
/**
 *
 * @objective Update batchInfo by id
 * @endpoint v1/api/batch/readyForSale/:id
 * @mehtod PUT
 * @reqbody = {
    "average_weight": 3.4,
    "weight_count_age": 36,
    "expectedPrice": 160, //KG
    "available_for_sale_count": 575
}
  * @res {
    "success": true,
    "code": 200,
    "data": {
        "_id": "647d7308b4be402d335a0467",
        "batch_no": 50,
        "shed_no": 3,
        "hensTypes": "সোনালী",
        "hensCount": 600,
        "hensPrice": 25,
        "batchStartDate": "2020-05-11",
        "sprayed_disinfectants": true,
        "bleaching_cleaned": true,
        "isFumigation": true,
        "isBufferZone": true,
        "isFootBaths": true,
        "entrySpary": true,
        "isDeadAnimal": false,
        "company_name": "অন্যান্য",
        "isGovt": false,
        "other": "test",
        "food_company_name": "সুষমা ফিড",
        "other_food_company": null,
        "water_test_method": "আর্সেনিক",
        "Probiotics_days": 12,
        "isWithdrwalFollow": true,
        "antibiotics_days": 11,
        "advicer_type": "doctor",
        "prescription": [],
        "DLS_regi_no": "1212",
        "isCertified": null,
        "vaccine": [
            {
                "name": "a",
                "age": 10,
                "_id": "6488139e2877b9b63cda56cc"
            },
            {
                "name": "b",
                "age": 5,
                "_id": "6488139e2877b9b63cda56cd"
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
        "average_weight": 3.4,
        "weight_count_age": 36,
        "qr_code": "647d7308b4be402d335a0467.png",
        "agent": {
            "name": "Antor",
            "phone": "01986297080",
            "Id": "6475bef77b9d56801cfb7d98"
        },
        "status": "অপেক্ষমান",
        "isWaterTest": true,
        "isPreBiotic": true,
        "doctorAdvice": true,
        "dlsRegistered": null,
        "safeWater": true,
        "other_water_test": "",
        "farmer": {
            "name": "user1",
            "phone": "01900000000",
            "Id": "6475c66194ae2a98c557ed1c",
            "zilla": "Dhaka",
            "upazilla": "Mirpur",
            "village": "N/A",
            "union": "Shewrapara"
        },
        "addedBy": "6475c66194ae2a98c557ed1c",
        "audit_trails": {
            "created_at": "2023-06-05T05:30:48.374Z",
            "created_by": "6475c66194ae2a98c557ed1c",
            "created_detail": "Created By user1 (01900000000)",
            "updated_at": "2023-06-18T12:03:05.071Z",
            "updated_by": "6475c66194ae2a98c557ed1c",
            "updated_detail": "Updated to অপেক্ষমান by  user1 (01900000000)"
        },
        "mortality": [
            {
                "date": "2020-05-11",
                "count": 5,
                "age": 1,
                "_id": "647d75e1d53fd816d113bc0c"
            },
            {
                "date": "2020-05-13",
                "count": 6,
                "age": 3,
                "_id": "647d75e1d53fd816d113bc0d"
            },
            {
                "date": "2020-05-14",
                "count": 7,
                "age": 4,
                "_id": "647d75e1d53fd816d113bc0e"
            },
            {
                "date": "2020-05-16",
                "count": 7,
                "age": 6,
                "_id": "6488139e2877b9b63cda56cb"
            }
        ],
        "totalDeath": 25,
        "totalavailable": 575,
        "expectedPrice": 160,
        "pricePerKg": 200,
        "available_for_sale_count": 575,
        "age": 1134,
        "createdAt": "2023-06-05T05:30:48.411Z",
        "updatedAt": "2023-06-18T12:03:05.074Z"
    },
    "message": "BatchInfo found successfully"
}
 */
const readyForSale = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    try {
        const _id = new mongoose_1.default.Types.ObjectId(req.params._id);
        const batchInfo = yield batchInfoService.getById(_id);
        if (!batchInfo) {
            throw new errors_1.ApiError(404, "BatchInfo Not Found");
        }
        // if()
        //check available for sale count is less than total hens count after mortality
        const totalDeath = batchInfo.mortality.reduce((acc, mortality) => {
            return acc + mortality.count;
        }, 0);
        const totalavailable = batchInfo.hensCount -
            totalDeath -
            (batchInfo.totalSale ? batchInfo.totalSale : 0);
        // console.log(totalavailable, available_for_sale_count);
        if (totalavailable < req.body.available_for_sale_count)
            throw new errors_1.ApiError(400, "Available for sale count can't be greater than total hens count after mortality");
        const info = {
            average_weight: req.body.average_weight,
            weight_count_age: req.body.weight_count_age,
            expectedPrice: req.body.expectedPrice,
            available_for_sale_count: req.body.available_for_sale_count,
            status: "অপেক্ষমান", // বিক্রির জন্য  অপেক্ষমান
        };
        const updatedBatchInfo = yield batchInfoService.updateById(_id, info, {
            updated_by: batchInfo.farmer.Id.toString(),
            updated_detail: `Updated to অপেক্ষমান by  ${user.name} (${user.phone})`,
        });
        const transormedBatch = (0, batch_transformer_1.resTransformer)(updatedBatchInfo);
        res.ok(transormedBatch, "BatchInfo found successfully");
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.readyForSale = readyForSale;
// make in stock to sold
/**
 * @objective Update batchInfo by id to available for sale to sold
 * @endpoint /v1/api/batch/stock/:id
 * @mehtod PUT
 * @reqbody = {
   "pricePerKg": 200
}
  * @res ={
    "success": true,
    "code": 200,
    "data": {
        "_id": "647b2c8fa20b09a2dfa807cd",
        "batch_no": 1,
        "shed_no": 0,
        "hensTypes": "সোনালী",
        "hensCount": 600,
        "hensPrice": 20,
        "batchStartDate": "1023-06-13",
        "sprayed_disinfectants": true,
        "bleaching_cleaned": true,
        "isFumigation": true,
        "isBufferZone": true,
        "isFootBaths": true,
        "entrySpary": true,
        "isDeadAnimal": null,
        "company_name": "অন্যান্য",
        "isGovt": false,
        "other": "test",
        "food_company_name": "সুষমা ফিড",
        "other_food_company": null,
        "water_test_method": null,
        "Probiotics_days": 12,
        "isWithdrwalFollow": true,
        "antibiotics_days": 11,
        "advicer_type": "doctor",
        "prescription": [],
        "DLS_regi_no": "1212",
        "isCertified": null,
        "vaccine": [
            {
                "name": "a",
                "age": 10,
                "_id": "648ef0ecbf897464b564f414"
            },
            {
                "name": "b",
                "age": 5,
                "_id": "648ef0ecbf897464b564f415"
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
        "weight_count_age": 36,
        "agent": {
            "name": "Antor",
            "phone": "01986297080",
            "Id": "6475bef77b9d56801cfb7d98"
        },
        "status": "বিক্রয়যোগ্য",
        "isWaterTest": null,
        "isPreBiotic": null,
        "doctorAdvice": null,
        "dlsRegistered": null,
        "safeWater": true,
        "other_water_test": null,
        "farmer": {
            "name": "user1",
            "phone": "01900000000",
            "Id": "6475c66194ae2a98c557ed1c",
            "zilla": "Dhaka",
            "upazilla": "Mirpur",
            "village": "N/A",
            "union": "Shewrapara"
        },
        "addedBy": "6475c66194ae2a98c557ed1c",
        "audit_trails": {
            "created_at": "2023-06-03T12:05:35.275Z",
            "created_by": "6475c66194ae2a98c557ed1c",
            "created_detail": "Created By user1 (01900000000)",
            "updated_at": "2023-06-18T12:10:20.644Z",
            "updated_by": "6475bef77b9d56801cfb7d98",
            "updated_detail": "Updated to বিক্রয়যোগ্য by  Antor (01986297080)"
        },
        "mortality": [
            {
                "date": "2020-05-11",
                "count": 5,
                "age": 364116,
                "_id": "647d75e1d53fd816d113bc0c"
            },
            {
                "date": "2020-05-13",
                "count": 6,
                "age": 364118,
                "_id": "647d75e1d53fd816d113bc0d"
            },
            {
                "date": "2020-05-14",
                "count": 7,
                "age": 364119,
                "_id": "647d75e1d53fd816d113bc0e"
            },
            {
                "date": "2020-05-16",
                "count": 7,
                "age": 364121,
                "_id": "648ef0ecbf897464b564f413"
            }
        ],
        "totalDeath": 25,
        "totalavailable": 575,
        "expectedPrice": 160,
        "pricePerKg": 200,
        "available_for_sale_count": 575,
        "age": 365249,
        "createdAt": "2023-06-03T12:05:35.293Z",
        "updatedAt": "2023-06-18T12:10:20.647Z"
    },
    "message": "BatchInfo found successfully"
}
  */
const inStockToSold = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    try {
        const _id = new mongoose_1.default.Types.ObjectId(req.params._id);
        const batchInfo = yield batchInfoService.getById(_id);
        if (!batchInfo) {
            throw new errors_1.ApiError(404, "BatchInfo Not Found");
        }
        const { pricePerKg } = req.body;
        if (!pricePerKg)
            throw new errors_1.ApiError(400, "Price is required");
        const info = {
            status: "বিক্রয়যোগ্য",
            pricePerKg: pricePerKg,
        };
        const updatedBatchInfo = yield batchInfoService.updateById(_id, info, {
            updated_by: user._id.toString(),
            updated_detail: `Updated to বিক্রয়যোগ্য by  ${user.name} (${user.phone})`,
        });
        const transormedBatch = (0, batch_transformer_1.resTransformer)(updatedBatchInfo, user === null || user === void 0 ? void 0 : user.role);
        res.ok(transormedBatch, "BatchInfo found successfully");
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.inStockToSold = inStockToSold;
/**
 * @objective Get all batchInfo
 * @endpoint /v1/api/batch/info
 * @mehtod GET
 * @res ={
    "success": true,
    "code": 200,
    "data": {
        "batchInfo": [
            {
                "_id": "647b2c8fa20b09a2dfa807cd",
                "batch_no": 1,
                "shed_no": 0,
                "hensTypes": "সোনালী",
                "hensCount": 600,
                "hensPrice": 20,
                "batchStartDate": "1023-06-13",
                "sprayed_disinfectants": true,
                "bleaching_cleaned": true,
                "isFumigation": true,
                "isBufferZone": true,
                "isFootBaths": true,
                "entrySpary": true,
                "isDeadAnimal": null,
                "company_name": "অন্যান্য",
                "isGovt": false,
                "other": "test",
                "food_company_name": "সুষমা ফিড",
                "other_food_company": null,
                "water_test_method": null,
                "Probiotics_days": 12,
                "isWithdrwalFollow": true,
                "antibiotics_days": 11,
                "advicer_type": "doctor",
                "prescription": [],
                "DLS_regi_no": "1212",
                "isCertified": null,
                "vaccine": [
                    {
                        "name": "a",
                        "age": 10,
                        "_id": "648ef0ecbf897464b564f414"
                    },
                    {
                        "name": "b",
                        "age": 5,
                        "_id": "648ef0ecbf897464b564f415"
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
                "weight_count_age": 36,
                "agent": {
                    "name": "Antor",
                    "phone": "01986297080",
                    "Id": "6475bef77b9d56801cfb7d98"
                },
                "status": "বিক্রয়যোগ্য",
                "isWaterTest": null,
                "isPreBiotic": null,
                "doctorAdvice": null,
                "dlsRegistered": null,
                "safeWater": true,
                "other_water_test": null,
                "farmer": {
                    "name": "user1",
                    "phone": "01900000000",
                    "Id": "6475c66194ae2a98c557ed1c",
                    "zilla": "Dhaka",
                    "upazilla": "Mirpur",
                    "village": "N/A",
                    "union": "Shewrapara"
                },
                "addedBy": "6475c66194ae2a98c557ed1c",
                "audit_trails": {
                    "created_at": "2023-06-03T12:05:35.275Z",
                    "created_by": "6475c66194ae2a98c557ed1c",
                    "created_detail": "Created By user1 (01900000000)",
                    "updated_at": "2023-06-18T12:10:20.644Z",
                    "updated_by": "6475bef77b9d56801cfb7d98",
                    "updated_detail": "Updated to বিক্রয়যোগ্য by  Antor (01986297080)"
                },
                "mortality": [
                    {
                        "date": "2020-05-11",
                        "count": 5,
                        "age": 364116,
                        "_id": "647d75e1d53fd816d113bc0c"
                    },
                    {
                        "date": "2020-05-13",
                        "count": 6,
                        "age": 364118,
                        "_id": "647d75e1d53fd816d113bc0d"
                    },
                    {
                        "date": "2020-05-14",
                        "count": 7,
                        "age": 364119,
                        "_id": "647d75e1d53fd816d113bc0e"
                    },
                    {
                        "date": "2020-05-16",
                        "count": 7,
                        "age": 364121,
                        "_id": "648ef0ecbf897464b564f413"
                    }
                ],
                "totalDeath": 25,
                "totalavailable": 575,
                "expectedPrice": 160,
                "pricePerKg": 200,
                "available_for_sale_count": 575,
                "age": 365249,
                "createdAt": "2023-06-03T12:05:35.293Z",
                "updatedAt": "2023-06-18T12:10:20.647Z"
            }
        ],
        "page": null,
        "total": 1
    },
    "message": "BatchInfo found successfully"
}
 */
const getllForBuyer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    try {
        const { filters, queries } = (0, filterOption_1.filterOption)(req);
        filters.status = "বিক্রয়যোগ্য";
        const { batch, page, total } = yield batchInfoService.getAll(filters, queries);
        if (total < 1) {
            throw new errors_1.ApiError(404, "BatchInfo Not Found");
        }
        // populate  and farmer
        const transormedList = (0, batch_transformer_1.resTransformer)(batch, user.role);
        return res.ok({
            batchInfo: transormedList,
            page,
            total,
        }, "BatchInfo found successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.getllForBuyer = getllForBuyer;
//# sourceMappingURL=batch.controller.js.map