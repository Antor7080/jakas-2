"use strict";
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
exports.BatchInfo = void 0;
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const connection_1 = require("../../db/connection");
const batchInfoCollectionName = config_1.default.get("db.connection.jakas_poultry.collections.batch");
const BatchInfoSchema = new mongoose_1.default.Schema({
    batch_no: {
        type: Number,
    },
    shed_no: {
        type: Number,
    },
    hensTypes: {
        type: String,
    },
    hensCount: {
        type: Number,
    },
    hensPrice: {
        type: Number,
    },
    batchStartDate: {
        type: String,
    },
    sprayed_disinfectants: {
        type: Boolean,
    },
    bleaching_cleaned: {
        type: Boolean,
    },
    isFumigation: {
        type: Boolean,
    },
    isBufferZone: {
        type: Boolean,
    },
    isFootBaths: {
        type: Boolean,
    },
    entrySpary: {
        type: Boolean,
    },
    isDeadAnimal: {
        type: Boolean,
    },
    //src
    company_name: {
        type: String,
    },
    isGovt: {
        type: Boolean,
    },
    other: {
        type: String,
    },
    //food
    safeWater: {
        type: Boolean,
    },
    isWaterTest: {
        type: Boolean,
    },
    food_company_name: {
        type: String,
    },
    other_food_company: {
        type: String,
    },
    water_test_method: {
        type: String,
    },
    other_water_test: {
        type: String,
    },
    isPreBiotic: {
        type: Boolean,
    },
    Probiotics_days: {
        type: Number,
    },
    isWithdrwalFollow: {
        type: Boolean,
    },
    antibiotics_days: {
        type: Number,
    },
    doctorAdvice: {
        type: Boolean,
    },
    advicer_type: {
        type: String,
    },
    prescription: [
        {
            type: String,
        },
    ],
    dlsRegistered: {
        type: Boolean,
    },
    DLS_regi_no: {
        type: String,
    },
    isCertified: {
        type: Boolean,
    },
    vaccine: [
        {
            name: {
                type: String,
            },
            age: {
                type: Number,
            },
            otherVaccineName: {
                type: String,
            },
        },
    ],
    is40_42_days: {
        type: Boolean,
    },
    selling_age: {
        type: Number,
    },
    isGrowth_chart_used: {
        type: Boolean,
    },
    growthWeek1: {
        type: Number,
    },
    growthWeek2: {
        type: Number,
    },
    growthWeek3: {
        type: Number,
    },
    growthWeek4: {
        type: Number,
    },
    growthWeek5: {
        type: Number,
    },
    growthWeek6: {
        type: Number,
    },
    growthWeek7: {
        type: Number,
    },
    growthWeek8: {
        type: Number,
    },
    growthWeek9: {
        type: Number,
    },
    wasteRemoval: {
        type: String,
    },
    average_weight: {
        type: Number,
    },
    weight_count_age: {
        type: Number,
    },
    qr_code: {
        type: String,
    },
    status: {
        type: String,
        default: "চলমান",
        enum: [
            "চলমান",
            "সম্পূর্ণ বিক্রি হয়েছে",
            "বিক্রি হয়নি",
            "অর্ডারকৃত",
            "বিক্রয়যোগ্য",
            "অপেক্ষমান",
        ],
    },
    agent: {
        phone: {
            type: String,
        },
        name: {
            type: String,
        },
        Id: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    farmer: {
        phone: {
            type: String,
        },
        name: {
            type: String,
        },
        zilla: {
            type: String,
        },
        upazilla: {
            type: String,
        },
        union: {
            type: String,
        },
        village: {
            type: String,
        },
        Id: {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    mortality: [
        {
            date: String,
            count: Number,
            age: Number,
        },
    ],
    audit_trails: {
        created_at: Date,
        updated_at: Date,
        deleted_at: Date,
        created_by: String,
        updated_by: String,
        deleted_by: String,
        created_detail: String,
        updated_detail: String,
        deleted_detail: String,
        admin_note: String, // Customer was deleted on request through phone
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
    addedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    totalSale: Number,
    expectedPrice: Number,
    pricePerKg: Number,
    available_for_sale_count: Number,
    id: {
        type: Number,
        auto: true,
        // required: true,
    },
}, {
    timestamps: true,
});
BatchInfoSchema.query.notDeleted = function notDeleted() {
    return this.where({ is_deleted: false });
};
BatchInfoSchema.index({ shed_no: 1, batch_no: 1, "farmer.phone": 1 }, { unique: true });
BatchInfoSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew) {
            try {
                const lastOrder = yield BatchInfo.findOne({}, {}, { sort: { id: -1 } });
                if (lastOrder) {
                    this.id = lastOrder.id + 1;
                }
                else {
                    this.id = 1;
                }
            }
            catch (error) {
                return next(error);
            }
        }
        return next();
    });
});
const BatchInfo = connection_1.connection.jakas_poultryConnection.model("Batch", BatchInfoSchema, batchInfoCollectionName);
exports.BatchInfo = BatchInfo;
//# sourceMappingURL=batch.model.js.map