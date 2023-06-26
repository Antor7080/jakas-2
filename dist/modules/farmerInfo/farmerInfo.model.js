"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmerInfo = void 0;
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const connection_1 = require("../../db/connection");
const farmerInfoCollectionName = config_1.default.get("db.connection.jakas_poultry.collections.farmerInfo");
const farmerInfoSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    zilla: {
        type: String,
        trim: true,
    },
    upazilla: {
        type: String,
        trim: true,
    },
    union: {
        type: String,
        trim: true,
    },
    village: {
        type: String,
        trim: true,
    },
    batch: {
        type: Number,
    },
    hensTypes: {
        type: String
    },
    hensCount: {
        type: Number
    },
    hensPrice: {
        type: Number
    },
    batchStartDate: {
        type: String
    },
    sprayed_disinfectants: {
        type: Boolean
    },
    bleaching_cleaned: {
        type: Boolean
    },
    isFumigation: {
        type: Boolean
    },
    isBufferZone: {
        type: Boolean
    },
    isFootBaths: {
        type: Boolean
    },
    entrySpary: {
        type: Boolean
    },
    isDeadAnimal: {
        type: Boolean
    },
    //src
    company_name: {
        type: String
    },
    isGovt: {
        type: Boolean
    },
    other: {
        type: String
    },
    //food
    safeWater: {
        type: Boolean
    },
    isWaterTest: {
        type: Boolean
    },
    food_company_name: {
        type: String
    },
    other_food_company: {
        type: String
    },
    water_test_method: {
        type: String
    },
    other_water_test: {
        type: String
    },
    isPreBiotic: {
        type: Boolean
    },
    Probiotics_days: {
        type: Number
    },
    isWithdrwalFollow: {
        type: Boolean
    },
    antibiotics_days: {
        type: Number
    },
    doctorAdvice: {
        type: Boolean
    },
    advicer_type: {
        type: String
    },
    prescription: [{
            type: String
        }],
    dlsRegistered: {
        type: Boolean
    },
    DLS_regi_no: {
        type: String
    },
    isCertified: {
        type: Boolean
    },
    vaccine: {
        type: Array
    },
    is40_42_days: {
        type: Boolean
    },
    selling_age: {
        type: Number
    },
    isGrowth_chart_used: {
        type: Boolean
    },
    growthWeek1: {
        type: Number
    },
    growthWeek2: {
        type: Number
    },
    growthWeek3: {
        type: Number
    },
    growthWeek4: {
        type: Number
    },
    growthWeek5: {
        type: Number
    },
    growthWeek6: {
        type: Number
    },
    growthWeek7: {
        type: Number
    },
    growthWeek8: {
        type: Number
    },
    growthWeek9: {
        type: Number
    },
    wasteRemoval: {
        type: String
    },
    average_weight: {
        type: Number
    },
    weight_count_age: {
        type: Number
    },
    qr_code: {
        type: String
    },
    status: {
        type: String,
        default: "চলমান"
    },
    agent: {
        phone: {
            type: String
        },
        id: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User"
        }
    }
});
farmerInfoSchema.statics.build = (attr) => {
    return new FarmerInfo(attr);
};
const FarmerInfo = connection_1.connection.jakas_poultryConnection.model("FarmerInfo", farmerInfoSchema, farmerInfoCollectionName);
exports.FarmerInfo = FarmerInfo;
FarmerInfo.build({
    name: "mostak_ahmad",
    phone: "01792448092",
    zilla: "Dhaka",
    upazilla: "Dhaka",
    union: "Dhaka",
    village: "Dhaka",
    batch: 1,
    hensTypes: "layer",
    hensCount: 100,
    hensPrice: 100,
    batchStartDate: "2021-09-09",
    sprayed_disinfectants: true,
    bleaching_cleaned: true,
    isFumigation: true,
    isBufferZone: true,
    isFootBaths: true,
    entrySpary: true,
    isDeadAnimal: true,
    //src
    company_name: "mostak_ahmad",
    isGovt: true,
    other: "mostak_ahmad",
    food_company_name: "mostak_ahmad",
    water_test_method: "mostak_ahmad",
    other_water_test: "mostak_ahmad",
    Probiotics_days: 1,
    antibiotics_days: 1,
    advicer_type: "mostak_ahmad",
    prescription: ["mostak_ahmad"],
    DLS_regi_no: "mostak_ahmad",
    isCertified: true,
    vaccine: [{ name: "mostak_ahmad", age: 5 }],
    is40_42_days: true,
    selling_age: 1,
    isGrowth_chart_used: true,
    growthWeek1: 1,
    growthWeek2: 1,
    growthWeek3: 1,
    growthWeek4: 1,
    growthWeek5: 1,
    growthWeek6: 1,
    growthWeek7: 1,
    growthWeek8: 1,
    growthWeek9: 1,
    wasteRemoval: "mostak_ahmad",
    average_weight: 1,
    weight_count_age: 1,
    status: "string",
    qr_code: "string",
    isPreBiotic: true,
    safeWater: true,
    isWaterTest: true,
    doctorAdvice: true,
    dlsRegistered: true,
});
//# sourceMappingURL=farmerInfo.model.js.map